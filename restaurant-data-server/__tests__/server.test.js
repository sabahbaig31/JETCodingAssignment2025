const request = require("supertest");
const app = require("../server");
const { describe, test, expect} = require("@jest/globals");

describe("Initialising the server", () => {
    test("The server should start and respond with a health check", async () => {
        const response = await request(app).get("/health");
        expect(response.status).toBe(200);
        expect(response.text).toBe("This server is running.");
    });
});



