import { v4 as uuidv4 } from "uuid";
import { addUser, getUsers as fetchUsers, getUser as fetchUser, deleteUser as removeUser, updateUser as modifyUser } from "../dynamoDB.js";

export const getUsers = async (event) => {
  try {
    const users = await fetchUsers();
    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not fetch users" }),
    };
  }
};

export const createUser = async (event) => {
  try {
    const user = { id: uuidv4(), ...JSON.parse(event.body) };
    await addUser(user);
    return {
      statusCode: 201,
      body: JSON.stringify({ message: `User ${user.firstName} added to database.` }),
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not create user" }),
    };
  }
};

export const getUser = async (event) => {
  try {
    const { id } = event.pathParameters;
    const user = await fetchUser(id);

    if (user) {
      return {
        statusCode: 200,
        body: JSON.stringify(user),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "User not found" }),
      };
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not fetch user" }),
    };
  }
};

export const deleteUser = async (event) => {
  try {
    const { id } = event.pathParameters;
    await removeUser(id);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `User with id ${id} deleted.` }),
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not delete user" }),
    };
  }
};

export const updateUser = async (event) => {
  try {
    const { id } = event.pathParameters;
    const updates = JSON.parse(event.body);
    await modifyUser(id, updates);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `User with id ${id} updated.` }),
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not update user" }),
    };
  }
};

