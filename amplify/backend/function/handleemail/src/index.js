/* Amplify Params - DO NOT EDIT
	API_AARONKRINGSMUSIC_GRAPHQLAPIENDPOINTOUTPUT
	API_AARONKRINGSMUSIC_GRAPHQLAPIIDOUTPUT
	API_AARONKRINGSMUSIC_GRAPHQLAPIKEYOUTPUT
	AUTH_AARONKRINGSMUSIC_USERPOOLID
	ENV
	FUNCTION_EMAILHANDLER_NAME
	REGION
	STORAGE_S3AARONKRINGSMUSICSTORAGE5A99E8B2_BUCKETNAME
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  for (const record of event.Records) {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  }
  return Promise.resolve('Successfully processed DynamoDB record');
};
