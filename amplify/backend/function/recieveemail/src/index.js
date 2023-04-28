const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' }); // Set the appropriate AWS region

/**
 * @type {import('http').Server}
 */
const server = awsServerlessExpress.createServer(app);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  // Parse the message from the event body
  const { name, email, message } = JSON.parse(event.body);

  // Construct the email message
  const sesParams = {
    Destination: {
      ToAddresses: ['w.tyler.krings@gmail.com'] // Replace with your email address
    },
    Message: {
      Body: {
        Text: {
          Data: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        }
      },
      Subject: {
        Data: 'Contact Form Submission'
      }
    },
    Source: 'sender@example.com' // Replace with the verified email address from AWS SES
  };

  try {
    // Send the email using AWS SES
    const ses = new AWS.SES();
    await ses.sendEmail(sesParams).promise();

    // Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    // Return an error response
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email' })
    };
  }
};
