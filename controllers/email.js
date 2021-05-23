var nodemailer = require('nodemailer');

 const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pranaypuppala24@gmail.com',
    pass: 'Table2*2=4'
  }
});


module.exports = function  SendmailTransport(to1,suject,text){
    var mailOptions = {
        from: 'pranaypuppala24@gmail.com',
        to: to1,
        subject: suject,
        text: text
      };

      console.log(`${to1} ${suject} ${text}`);
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }