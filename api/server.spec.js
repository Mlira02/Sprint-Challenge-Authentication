const request = require("supertest");
const server = require("./server.js");
const Users = require("../auth/auth-model");
const db = require("../database/dbConfig.js");

describe("auth model", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("register user", () => {
    it("should register a user", async () => {
      await Users.add({ username: "b", password: "ya" });
      const users = await db("users");
      let i = users.length;
      expect(users).toHaveLength(1);
      expect(users).not.toContain("something");
      expect(users).not.toBeUndefined();
    });
  });

  describe("login user", () => {
   
    it("resolves promises", () => {
      expect(Promise.resolve("cool name")).resolves.toBe("cool name");
      expect(Promise.resolve("there")).resolves.not.toBe("their");
    });
  });
});

describe("jokes router", () => {
  it("you get a 400 error when you try to get in without header", async () => {
    return await request(server)
      .get("/api/jokes")
      .expect(400);
  });

  it(" returns a json object", () => {
    const response = request(server).get("/api/jokes");
    expect(response.type);
  });
});

describe("whether it contains an item", () => {
  it("returns things that are there and you get errors where there aren't", () => {
    const random = [
      "lame",
      "lamb",
      "something",
      "else",
      "yep"
    ];
    expect(random).toContain("lamb");
    expect(random).not.toContain("bears");
    expect(random[1]).not.toBe(random[2]);
  });
});

describe("match objects", () => {
  const movies = {
    inception: "awesome",
    plot: "riveting"
  };

  const sameMovies = {
    inception: "awesome",
    plot: "riveting"
  };

  it("matches item to item", () => {
    expect(sameMovies).toMatchObject(movies);
    expect(movies).toEqual(sameMovies);
  });
});
