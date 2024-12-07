import { v4 as uuidv4 } from "uuid";
import { addUser, getUsers as fetchUsers, getUser as fetchUser, deleteUser as removeUser, updateUser as modifyUser } from "../dynamoDB.js";

export const getUsers = async (req, res) => {
  try {
    const users = await fetchUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch users" });
  }
};

export const createUser = async (req, res) => {
  const user = { id: uuidv4(), ...req.body };

  try {
    await addUser(user);
    res.status(201).json({ message: `User ${user.firstName} added to database.` });
  } catch (error) {
    res.status(500).json({ error: "Could not create user" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await fetchUser(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Could not fetch user" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await removeUser(id);
    res.status(200).json({ message: `User with id ${id} deleted.` });
  } catch (error) {
    res.status(500).json({ error: "Could not delete user" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    await modifyUser(id, updates);
    res.status(200).json({ message: `User with id ${id} updated.` });
  } catch (error) {
    res.status(500).json({ error: "Could not update user" });
  }
};

