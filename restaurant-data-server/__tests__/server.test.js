const request = require("supertest");
const app = require("../server");
const { describe, test, expect, beforeEach} = require("@jest/globals");

const mockData = {
    restaurants: [
        {
            id: "102182",
            name: "itsu - City Road",
            address: {
                city: "London",
                postalCode: "EC1V 1NR"
            },
            rating: {
                starRating: 3.1
            },
            cuisines: [
                { name: "Sushi" },
                { name: "Asian" }
            ]
        }
    ]
}

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

describe("Implementing the API logic", () => {

    beforeEach(() => {
        global.fetch = jest.fn();
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    test("Calls the API and returns the data", async () => {
        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData),
        })

        const res = await request(app).get("/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF")

        expect(fetch).toHaveBeenCalledWith(
            "https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF"
        )

        expect(res.status).toBe(200)
        expect(res.body).toEqual(mockData)
    })
})

