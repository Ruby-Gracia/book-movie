const Reservation = require("../../models/reservation");
const Movie = require("../../models/movie");
const Cinema = require("../../models/cinema");

module.exports = ({ emailFrom }) => {
  return `
        <!doctype html>
          <html>
                  <head>
                      <meta name="viewport" content="width=device-width">
                      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                      <title>Simple Transactional Email</title>
                      <style>
                      
                      </style>
                  </head>
                  <body 
                  <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">
                  <b>${emailFrom}</b> sent you reservation details.</p>
                  
                  <h3>Reservation Details:</h3>
                 
                    <b>Date: </b> ${firstname} <br>
                    <b>Show time: </b> ${lastname} <br>
                    <b>Seats: </b> ${email} <br>
                    <b>ticketPrice : </b> ${phonenumber} <br>
                    <b>total amount: </b> ${message} <br>    
                    <b>Movie: </b> ${message} <br>    
                    <b>Cinema: </b> ${message} <br>   
                    <b>username: </b> ${message} <br> 
                    <b>phone: </b> ${message} <br> 
                  </body>
              </html>
          `;
};
