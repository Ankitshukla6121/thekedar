const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    logger:true,
    secureConnection:false,
    auth: {
     user: 'thekedarhub@gmail.com',
     pass: 'dyge eoak ehdk kxxm',
    },
    tls:{
        rejectUnauthorized:true
    }
   });
   

const sendVerificationEmail = (contractorEmail , username) => {
  const mailOptions = {
    from: 'thekedarhub@gmail.com',
    to: contractorEmail,
    subject: 'Contractor Verification Status Updated',
    text: ` Welcome Dear ${username} , Your verification status has been updated successfully! You are now verified.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = { sendVerificationEmail };
