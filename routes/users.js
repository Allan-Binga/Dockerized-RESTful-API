import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

let users = [];

router.get("/", (req, res) => {
  //   console.log(users);
  res.send(users);
});

router.post("/", (req, res) => {
  // console.log("Post route reached")
  const user = req.body;

  users.push({ ...user, id: uuidv4() });

  res.send(`User with username ${user.firstName} added to database.`);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id == id);
  res.send(foundUser);
});

router.delete('/:id', (req, res)=>{
    const {id} = req.params

    users = users.filter((user) => user.id !== id)

    res.send(`User with the ${id} was deleted from database.`)
})

export default router;
