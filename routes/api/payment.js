const express = require("express");
const router = new express.Router();
const crypto = require("crypto");
const Razorpay = require("razorpay");
const Reservation = require("../../models/reservation");

const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

//Routes
router.get("/payments", (req, res) => {
  res.render("payment", { key: process.env.KEY_ID });
});

router.post("/order", (req, res) => {
  params = req.body;
  instance.orders
    .create(params)
    .then((data) => {
      res.send({ sub: data, status: "success" });
    })
    .catch((error) => {
      res.send({ sub: error, status: "failed" });
    });
});

router.post("/verify", (req, res) => {
  body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

  var expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  console.log("sig" + req.body.razorpay_signature);
  console.log("sig" + expectedSignature);
  var response = { status: "failure" };
  if (expectedSignature === req.body.razorpay_signature)
    response = { status: "success" };
  res.send(response);
});

router.post("/send", async (req, res) => {
  const { emailTo, emailFrom } = req.body;
  if (!emailTo || !emailFrom) {
    return res.status(422).send({ error: "All fields are required." });
  }
  // Get data from db
  try {
    const reservation = await Reservation.find({});
    const response = await Reservation.save();
    // send mail

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    var mailOptions = {
      from: emailFrom,
      to: emailTo,
      subject: "Book Your Show.",
      text: `${emailFrom} sent you the reservation details.`,
      html: require("../../services/emailTemplate")({
        emailFrom,
      }),
    };
    transporter
      .sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent:" + info.response);
        }
      })
      .then(() => {
        return res.json({ success: true });
      })
      .catch((err) => {
        return res.status(500).json({ error: "Error in email sending." });
      });
  } catch (err) {
    return res.status(200).send({ error: "email sent." });
  }
});

module.exports = router;
