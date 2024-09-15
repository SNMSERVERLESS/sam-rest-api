import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

// Initialize the DynamoDB client
const dynamoDBClient = new DynamoDBClient({ region: 'ap-south-1' }); // Replace with your region

module.exports.handler = async (event: any) => {
  const tableName = process.env.TABLE_NAME; // Replace with your DynamoDB table name

  const userid = event.pathParameters?.userid
  const { firstName, lastName, email, website } = JSON.parse(event.body || '{}');

  console.log(`tableName: ${tableName} | userid: ${userid} | userid: ${userid} | firstName: ${firstName} | lastName: ${lastName} | website: ${website} | email: ${email}`);
  const params = {
    TableName: tableName,
    Item: {
      'userid': { S: userid },       // Partition key
      'firstName': { S: firstName },
      'lastName': { S: lastName },
      'email': { S: email },
      'website': { S: website }
    }
    // items.....
  };

  try {
    const command = new PutItemCommand(params);
    await dynamoDBClient.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Record inserted successfully!' }),
    };
  } catch (error) {
    console.error('Error inserting record into DynamoDB:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to insert record.' }),
    };
  }
};