const aws = require('aws-sdk')
const ses = new aws.SES()

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {
      //pull off items from stream
      const candidateName = streamedItem.dynamodb.NewImage.Name.S
      const candidateEmail = streamedItem.dynamodb.NewImage.Email.S
      const candidateMessage = streamedItem.dynamodb.NewImage.Message.S
      const candidateLessonType = streamedItem.dynamodb.NewImage.LessonType.S
      const candidatePhone = streamedItem.dynamodb.NewImage.Phone.S

      await ses
          .sendEmail({
            Destination: {
              ToAddresses: [process.env.SES_EMAIL],
            },
            Source: process.env.SES_EMAIL,
            Message: {
              Subject: { Data: 'Candidate Submission' },
              Body: {
                Text: { Data: `My name is ${candidateName}. You can reach me at ${candidateEmail} or ${candidatePhone}. I would prefer lessons to be ${candidateLessonType}. I sent the following message: ${candidateMessage}` },
              },
            },
          })
          .promise()
    }
  }
  return { status: 'done' }
}
