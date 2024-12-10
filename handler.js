import { createUser, getUsers, getUser, deleteUser, updateUser } from './controllers/users.js';

export const createUser = async (event) => {
  const body = JSON.parse(event.body);
  await createUser(body);
  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'User added to database.' }),
  };
};

export const getUsers = async () => {
  const users = await getUsers();
  return {
    statusCode: 200,
    body: JSON.stringify(users),
  };
};

export const getUser = async (event) => {
  const { id } = event.pathParameters;
  const user = await getUser(id);
  if (user) {
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  }
  return {
    statusCode: 404,
    body: JSON.stringify({ error: 'User not found' }),
  };
};

export const deleteUser = async (event) => {
  const { id } = event.pathParameters;
  await deleteUser(id);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'User deleted' }),
  };
};

export const updateUser = async (event) => {
  const { id } = event.pathParameters;
  const body = JSON.parse(event.body);
  await updateUser(id, body);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'User updated' }),
  };
};
