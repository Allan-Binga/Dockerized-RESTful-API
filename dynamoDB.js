import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand, GetCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(dynamoDBClient);

export const addUser = async (user) => {
  const params = {
    TableName: "Users", 
    Item: user,
  };
  return await docClient.send(new PutCommand(params));
};

export const getUsers = async () => {
  const params = {
    TableName: "Users",
  };
  const data = await docClient.send(new ScanCommand(params));
  return data.Items;
};

export const getUser = async (id) => {
  const params = {
    TableName: "Users",
    Key: { id },
  };
  const data = await docClient.send(new GetCommand(params));
  return data.Item;
};

export const deleteUser = async (id) => {
  const params = {
    TableName: "Users",
    Key: { id },
  };
  return await docClient.send(new DeleteCommand(params));
};

export const updateUser = async (id, updates) => {
  const updateExpressions = [];
  const expressionAttributeValues = {};

  Object.keys(updates).forEach((key) => {
    updateExpressions.push(`${key} = :${key}`);
    expressionAttributeValues[`:${key}`] = updates[key];
  });

  const params = {
    TableName: "Users",
    Key: { id },
    UpdateExpression: `set ${updateExpressions.join(", ")}`,
    ExpressionAttributeValues: expressionAttributeValues,
  };

  return await docClient.send(new UpdateCommand(params));
};
