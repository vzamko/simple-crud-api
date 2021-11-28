const request = require("supertest");
const server = require("../index");

afterEach(() => server.close());

describe("Check validators:", () => {
  test("POST method must return 400.", async () => {
    const response = await request(server)
      .post("/person")
      .send({ hobbies: ["games"] });

    id = response.body.id;

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Some of required fields do not exist or not valid.",
    });
  });

  test("DELETE method must return 404.", async () => {
    const response = await request(server).delete(
      "/person/d3351b64-cc92-41a1-a46b-3f8e50301ff7"
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "User ID d3351b64-cc92-41a1-a46b-3f8e50301ff7 does not exist.",
    });
  });

  test("PUT method must return 404.", async () => {
    const response = await request(server).put(
      "/person/d3351b64-cc92-41a1-a46b-3f8e50301ff7"
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "User ID d3351b64-cc92-41a1-a46b-3f8e50301ff7 does not exist.",
    });
  });
});
