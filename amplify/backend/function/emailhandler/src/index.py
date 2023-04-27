import json
import boto3

def handler(event, context):
  print('received event:')
  print(event)
  form_data = json.loads(event['body'])
  sender_email = 'w.tyler.krings@gmail.com'  # Replace with your sender email address verified in SES
  recipient_email = 'w.tyler.krings@gmail.com'  # Replace with your recipient email address
  print(form_data)
    # Format the email subject and body
    # subject = f"New form submission from {form_data['Name']}"
    # message = f"Name: {form_data['Name']}\n"
    # message += f"Email: {form_data['Email']}\n"
    # message += f"Phone: {form_data['Phone']}\n"
    # message += f"Lesson Type: {form_data['LessonType']}\n"
    # message += f"Message: {form_data['Message']}"

    # Send the email using Amazon SES
  ses_client = boto3.client('ses')
  response = ses_client.send_email(
        Source=sender_email,
        Destination={
            'ToAddresses': [recipient_email]
        },
        Message={
            'Subject': {
                'Data': 'subject'
            },
            'Body': {
                'Text': {
                    'Data': 'this is an email message'
                }
            }
        }
    )
    
  return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps('Hello from your new Amplify Python lambda!')
    }