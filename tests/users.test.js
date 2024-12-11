import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/users";

jest.mock("../dynamoDB.js", () => ({
  getUsers: jest.fn().mockResolvedValue([
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
  getUser: jest.fn().mockImplementation((id) =>
    Promise.resolve(
      id === "1"
        ? { id: "1", firstName: "John", lastName: "Doe", age: 30 }
        : null
    )
  ),
  deleteUser: jest.fn().mockImplementation((id) =>
    Promise.resolve(
      id === "3"
        ? { id: "", firstName: "Jane", lastName: "Doe", age: 28 }
        : null
    )
  ),
  updateUser: jest.fn().mockImplementation((id, updates) =>
    Promise.resolve(id === "1" ? { id: "1", ...updates } : null)
  ),
}));

describe("Users Controller (Lambda)", () => {
  const mockLambdaResponse = () => {
    const response = {
      statusCode: null,
      body: null,
    };
    return {
      get: () => response,
      set: (statusCode, body) => {
        response.statusCode = statusCode;
        response.body = JSON.stringify(body);
      },
    };
  };

  it("Should fetch users successfully", async () => {
    const event = {};
    const res = mockLambdaResponse();

    const result = await getUsers(event);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual([
      { id: "1", firstName: "John", lastName: "Doe", age: 30 },
    ]);
  });

  it("Should add a new user successfully", async () => {
    const event = {
      body: JSON.stringify({ firstName: "John", lastName: "Odongo", age: 22 }),
    };

    const result = await createUser(event);

    expect(result.statusCode).toBe(201);
    expect(JSON.parse(result.body)).toEqual({
      message: "User John added to database.",
    });
  });

  it("Should add another new user successfully", async () => {
    const event = {
      body: JSON.stringify({ firstName: "Jane", lastName: "Doe", age: 28 }),
    };

    const result = await createUser(event);

    expect(result.statusCode).toBe(201);
    expect(JSON.parse(result.body)).toEqual({
      message: "User Jane added to database.",
    });
  });

  it("Should fetch a single user successfully", async () => {
    const event = { pathParameters: { id: "1" } };

    const result = await getUser(event);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({
      id: "1",
      firstName: "John",
      lastName: "Doe",
      age: 30,
    });
  });

  it("Should delete a user successfully", async () => {
    const event = { pathParameters: { id: "3" } };

    const result = await deleteUser(event);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({
      message: "User with id 3 deleted.",
    });
  });

  it("Should update a user successfully", async () => {
    const event = {
      pathParameters: { id: "1" },
      body: JSON.stringify({
        firstName: "Johntez",
        lastName: "Alandez",
        age: 35,
      }),
    };

    const result = await updateUser(event);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({
      message: "User with id 1 updated.",
    });
  });
});
