const request = require("supertest");
const app = require("../server");
const { describe, test, expect} = require("@jest/globals");

describe("Initialising the server", () => {
    test("The server should start and respond with a health check", async () => {
        const response = await request(app)
            .get("/health");
        expect(response.status).toBe(200);
        expect(response.text).toBe("This server is running.");
    });
});

describe("Checking CORS configuration", () => {
    test("Server should only allow requests from http://localhost:5173", async () => {
        const response = await request(app)
            .options("/health")
            .set("Origin", "http://localhost:5173")

        expect(response.headers["access-control-allow-origin"]).toBe("http://localhost:5173")
    })
})

