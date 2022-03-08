const config = require('config');
let aws = require("aws-sdk");

const serverConfig = config.get('databaseConfig');

let htmlTemplate = (email_info) => {
  return `
                    <div style="width:80%; margin:auto;">
                        <h3 style="text-align:center">${email_info.subject}</h3>
                        <p>Hello ${email_info.first_name},</p>
                        <p>${email_info.message}</p>
                        <br />
                        <p>Thank you.</p>
                        <p>The Middlechase Team.</p>
                        <br />
                        <div style="background-color:#84d9b3; text-align:center; padding:1rem">
                            <p>If you have any questions please contact us via</p>
                            <br>tech@middlechase.com</br>
                        </div>
                    </div>           `
}

module.exports = {
  email: async (email_info) => {

    return new Promise((resolve, reject) => {

      const ses = new aws.SES({
        region: "us-east-1",
        accessKeyId: serverConfig.bucket_accessKeyId,
        secretAccessKey: serverConfig.bucket_secretAccessKey,
      });

      const mailOptions = {
        Destination: {
          ToAddresses: [`ooto@simulator.amazonses.com`]
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: htmlTemplate(email_info)
            },
            Text: {
              Charset: "UTF-8",
              Data: `${email_info.message +
                "\n\n\n\n\nMiddlechase Limited\n\nIf you have any questions please contact us via \ntech@middlechase.com"}`
            }
          },

          Subject: {
            Charset: "UTF-8",
            Data: `${email_info.subject}`
          }
        },
        Source: `${serverConfig.email}`
      };

      ses.sendEmail(mailOptions, function (error, data) {
        if (error) {
          console.log("error is " + error)
          resolve(false, error) // or use rejcet(false) but then you will have to handle errors
        } else {
          console.log("Email sent: " + JSON.stringify(data))
          resolve([
            true,
            JSON.stringify(data) +
            "---------------------------------------" +
            data.MessageId,
          ])
        }
      });
    })
  },
}
