const request = require("supertest");
const app = require("../server");
const { describe, test, expect, beforeEach, afterEach} = require("@jest/globals");

// mock restaurant data to simulate API responses
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

// test block for checking if the server starts correctly
describe("Initialising the server", () => {
    test("The server should start and respond with a health check", async () => {
        const response = await request(app)
            .get("/health"); // send GET request to the /health endpoint

        expect(response.status).toBe(200);
        expect(response.text).toBe("This server is running.");
    });
});

// test block for verifying CORS configuration
describe("Checking CORS configuration", () => {
    test("Server should only allow requests from http://localhost:5173", async () => {
        const response = await request(app)
            .options("/health") // send OPTIONS request to check allowed origins
            .set("Origin", "http://localhost:5173") // simulate request from the allowed origin

        expect(response.headers["access-control-allow-origin"]).toBe("http://localhost:5173")
    })
})

// test block for API request logic
describe("Implementing the API logic", () => {

    // mock global fetch function to prevent real API calls
    beforeEach(() => {
        global.fetch = jest.fn();
    })

    // restore original fetch function after each test to avoid interference between tests
    afterEach( () => {
        jest.restoreAllMocks()
    })

    // ensure API request is called and returns expected data
    test("Calls the API and returns the data", async () => {
        // mock fetch response to return mockData defined above
        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockData),
        })

        // ensure fetch function was called with correct URL
        const res = await request(app).get("/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF")

        expect(fetch).toHaveBeenCalledWith(
            "https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF"
        )

        expect(res.status).toBe(200)
        expect(res.body).toEqual(mockData) // response body should match mocked data
    })

    // test if server correctly handles API failures
    test("Should return 500 if the fetch fails", async () => {
        // simulate failed API request
        fetch.mockRejectedValueOnce(new Error("Fetch error"))

        const response = await request(app).get("/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF")

        expect(response.status).toBe(500)
        expect(response.body).toEqual({ error: "Failed to fetch data"})
    })
})

