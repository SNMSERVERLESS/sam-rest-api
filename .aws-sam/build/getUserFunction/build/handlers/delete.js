"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
// Initialize the DynamoDB client
const dynamoDBClient = new client_dynamodb_1.DynamoDBClient({ region: 'ap-south-1' }); // Replace with your region
module.exports.handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const tableName = process.env.TABLE_NAME; // Replace with your DynamoDB table name
    const userid = (_a = event.pathParameters) === null || _a === void 0 ? void 0 : _a.userid;
    try {
        const params = {
            TableName: tableName,
            Key: {
                'userid': { S: userid } // Primary key value
            }
        };
        const command = new client_dynamodb_1.DeleteItemCommand(params);
        yield dynamoDBClient.send(command);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Item deleted successfully!' }),
        };
    }
    catch (error) {
        console.error('Error deleting item from DynamoDB:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to delete item.' }),
        };
    }
});
