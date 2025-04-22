// emailTemplate.js
module.exports = ({
    senderName,
    senderEmail,
    phone,
    transactionId,
    recipientFirstName,
    recipientLastName
  }) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Payment Confirmation</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
    </head>
    <body style="margin: 0; font-family: 'Poppins', sans-serif; background: #ffffff; font-size: 14px;">
      <div style="max-width: 680px; margin: 0 auto; padding: 45px 30px 60px; background: #f4f7ff;
                  background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);
                  background-repeat: no-repeat; background-size: 800px 452px; background-position: top center;">
        <header>
          <table style="width: 100%;">
            <tr>
              <td><img src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1663574980688_114990/archisketch-logo" height="30px" /></td>
              <td style="text-align: right;"><span style="font-size: 16px; color: #ffffff;">${new Date().toLocaleDateString()}</span></td>
            </tr>
          </table>
        </header>
  
        <main>
          <div style="margin-top: 70px; padding: 92px 30px 115px; background: #ffffff; border-radius: 30px; text-align: center;">
            <h1 style="font-size: 24px; font-weight: 500;">const emailTemplate = require('./emailTemplate'); // make sure the path is correct</h1>
            <p style="margin-top: 17px; font-size: 16px;">Dear <strong>${recipientFirstName} ${recipientLastName}</strong>,</p>
            <p style="margin-top: 17px;">A payment has been don with the following details:</p>
            <div style="text-align: left; margin-top: 40px;">
              <p><strong>Name:</strong> ${senderName}</p>
              <p><strong>Email:</strong> ${senderEmail}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Transaction ID:</strong> ${transactionId}</p>
            </div>
            <p style="margin-top: 40px; font-weight: 500; color: green;">✅ Your payment has been successfully submitted.</p>
          </div>
        </main>
  
       
      </div>
    </body>
    </html>`;
  };
  