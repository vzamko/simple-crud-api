const request = require("supertest");
const server = require("../index");

afterAll(() => server.close());

describe("Check general functionality:", () => {
  let id;

  test("GET method must return empty body.", async () => {
    const response = await request(server).get("/person");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
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

  test("GET method must return correct user.", async () => {
    const response = await request(server).get("/person/" + id);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: id,
      name: "Valera",
      age: 27,
      hobbies: ["games"],
    });
  });

  test("PUT method must change user.", async () => {
    const response = await request(server)
      .put("/person/" + id)
      .send({ hobbies: ["eat"] });

    expect(response.status).toBe(200);
  });

  test("GET method must return correct user.", async () => {
    const response = await request(server).get("/person/" + id);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: id,
      name: "Valera",
      age: 27,
      hobbies: ["eat"],
    });
  });

  test("DELETE method must remove user.", async () => {
    const response = await request(server).delete("/person/" + id);

    expect(response.status).toBe(204);
  });

  test("GET method must return empty body.", async () => {
    const response = await request(server).get("/person");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });
});
