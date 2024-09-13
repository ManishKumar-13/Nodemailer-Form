const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

// Configure Nodemailer with SMTP4DEV settings (localhost:25)
const transporter = nodemailer.createTransport({
    host: "localhost",  
    port: 25,           
    secure: false,      
    auth: null          
});

app.use(express.json());

app.post("/send/mail", async (req, res) => {
  try {
    const receiverEmail = req.body.email;
    
    console.log(receiverEmail);

    const emailData = {
      to: receiverEmail,
      from: "do-not-reply@unknown.com",
      subject: "Your Friend is sharing an email with you!",
      html: `
            <p>Your friend has shared a file with you via filesharing app, please click the link to download the file.</p>
            `,
    };

    // Send mail using the configured transporter
    transporter.sendMail(emailData, (error, info) => {
      if (error) {
        console.log(error);
        return res.json({
          success: false,
          message: "Unable to send email",
          error: error,
        });
      }

      console.log(info);

      res.json({
        status: true,
        message: "Email sent successfully.",
      });
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Something went wrong. Please try again!",
      errorMessage: error
    });
  }
});

app.listen(4123, () => {
  console.log(`Server is running on port 4123.`);
});
