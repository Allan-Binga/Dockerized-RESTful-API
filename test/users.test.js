import { getUsers } from "../controllers/users";

jest.mock("../dynamoDB.js", () => ({
  getUsers: jest.fn().mockResolvedValue([{ id: "1", firstName: "John", lastName: "Doe", age: 30 }]),
}));

describe("Users Controller", () => {
  it("should fetch users successfully", async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: "1", firstName: "John", lastName: "Doe", age: 30 }]);
  });
});
