const request = require("supertest");
const server = require("../index");

afterAll(() => server.close());

describe("Check wrong codes:", () => {
  let id;

  test("GET method must return 400", async () => {
    const response = await request(server).get("/person/" + 123);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "uuid is not valid." });
  });

  test("GET method must return 404", async () => {
    const response = await request(server).get(
      "/person/d3351b64-cc92-41a1-a46b-3f8e50301ff7"
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "User ID d3351b64-cc92-41a1-a46b-3f8e50301ff7 does not exist.",
    });
  });

  test("POST method must create a new person.", async () => {
    const response = await request(server)
      .post("/person")
      .send({
        name: "Valera",
        age: 27,
        hobbies: ["games"],
      });

    id = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body.id).toBe(id);
  });

  test("GET method must return user", async () => {
    const response = await request(server).get("/person/" + id);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: id,
      name: "Valera",
      age: 27,
      hobbies: ["games"],
    });
  });

  test("DELETE method must remove user.", async () => {
    const response = await request(server).delete("/person/" + id);

    expect(response.status).toBe(204);
  });

  test("GET method must return 404", async () => {
    const response = await request(server).get("/person/" + id);

    expect(response.status).toBe(404);
  });
});
