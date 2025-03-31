import { render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'
import { setupServer } from "msw/node"
import App from '../App'
import {http, HttpResponse} from "msw";

// Set up a mock server to intercept API requests
const server = setupServer(
    http.get("http://localhost:8080/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF", () => {
        return HttpResponse.json({ restaurants: mockRestaurants})
    })
);

const mockRestaurants = [
    {
        name: "Al-Baik Pizza",
    }
];

// Start and reset the mock server for each test
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("App Component", () => {

    test("renders the web page without crashing", () => {
        render(<App/>)
        expect(screen.getByText("Top 10 Restaurants")).toBeInTheDocument()

    })

    test("displays restaurant data", async () => {
        render(<App />);

        // Wait for the restaurant data to be displayed
        await waitFor(() => {
            expect(screen.getByText("Al-Baik Pizza")).toBeInTheDocument();
        });
    });

})