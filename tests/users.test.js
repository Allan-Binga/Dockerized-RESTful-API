import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser
} from "../controllers/users";


jest.mock("../dynamoDB.js", () => ({
  getUsers: jest
    .fn()
    .mockResolvedValue([
      { id: "1", firstName: "John", lastName: "Doe", age: 30 },
    ]),
  addUser: jest
    .fn()
    .mockResolvedValueOnce({
      id: "2",
      firstName: "John",
      lastName: "Odongo",
      age: 22,
    })
    .mockResolvedValueOnce({
      id: "3",
      firstName: "Jane",
      lastName: "Doe",
      age: 28,
    }),

  getUser: jest
    .fn()
    .mockImplementation((id) =>
      Promise.resolve(
        id === "1"
          ? { id: "1", firstName: "John", lastName: "Doe", age: 30 }
          : null
      )
    ),
  deleteUser: jest
    .fn()
    .mockImplementation((id) =>
      Promise.resolve(
        id === "3"
          ? { id: "", firstName: "Jane", lastName: "Doe", age: 28 }
          : null
      )
    ),
    updateUser: jest
    .fn()
    .mockImplementation((id, updates) =>
      Promise.resolve(
        id === "1"
          ? { id: "1", ...updates }
          : null
      )
    ),
    
}));

describe("Users Controller", () => {
  it("Should fetch users successfully.", async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: "1", firstName: "John", lastName: "Doe", age: 30 },
    ]);
  });

  it("Should add a new user successfully.", async () => {
    const req = {
      body: { firstName: "John", lastName: "Odongo", age: 22 },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User John added to database.",
    });
  });

  it("Should add another new user successfully.", async () => {
    const req = {
      body: { firstName: "Jane", lastName: "Doe", age: 28 },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User Jane added to database.",
    });
  });

  it("Should fetch a single user successfully", async () => {
    const req = { params: { id: "1" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: "1",
      firstName: "John",
      lastName: "Doe",
      age: 30,
    });
  });

  it("Should delete a user successfully", async () => {
    const req = { params: { id: "3" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "User with id 3 deleted." });
  });

  it("Should update a user successfully.", async () => {
    const req = {
      params: { id: "1" },
      body: { firstName: "Johntez", lastName: "Alandez", age: 35 },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
    await updateUser(req, res);
  
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "User with id 1 updated." });
  });
  
  
});
