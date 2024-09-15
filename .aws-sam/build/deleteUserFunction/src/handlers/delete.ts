import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";

// Initialize the DynamoDB client
const dynamoDBClient = new DynamoDBClient({ region: 'ap-south-1' }); // Replace with your region

module.exports.handler = async (event: any) => {
  const tableName = process.env.TABLE_NAME; // Replace with your DynamoDB table name

  const userid = event.pathParameters?.userid

  try {
    const params = {
      TableName: tableName,
      Key: {
        'userid': { S: userid } // Primary key value
      }
    };

    const command = new DeleteItemCommand(params);
    await dynamoDBClient.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Item deleted successfully!' }),
    };
  } catch (error) {
    console.error('Error deleting item from DynamoDB:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to delete item.' }),
    };
  }
};