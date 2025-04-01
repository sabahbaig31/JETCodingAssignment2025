import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { setupServer } from "msw/node";
import App from '../App';
import {http, HttpResponse} from "msw";

// Set up a mock server to intercept API requests
const server = setupServer(
    http.get("http://localhost:8080/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF", () => {
        return HttpResponse.json({ restaurants: mockRestaurants}) // Return the mock data
    })
);

// Mock data to test the application with. 10 restaurants to check that 10 entries are displayed
const mockRestaurants = [
    {
        name: "Al-Baik Pizza",
        // Only displaying first 2 cuisines from each restaurant
        cuisines: [{ name: "Pizza" }, { name: "American "}],
        address: {
            firstLine: "111 Kennington Road",
            postalCode: "SE11 6SF"
        },
        rating: {
            starRating: 4.3
        }
    },
    {
        name: "Restaurant 2",
        cuisines: [{ name: "Cuisine 1" }, { name: "Cuisine 2"}],
        address: {
            firstLine: "Road 2",
            postalCode: "RSTR NT2"
        },
        rating: {
            starRating: 5
        }
    },
    {
        name: "Restaurant 3",
        cuisines: [{ name: "Cuisine 1" }, { name: "Cuisine 2"}],
        address: {
            firstLine: "Road 3",
            postalCode: "RSTR NT3"
        },
        rating: {
            starRating: 5
        }
    },
    {
        name: "Restaurant 4",
        cuisines: [{ name: "Cuisine 1" }, { name: "Cuisine 2"}],
        address: {
            firstLine: "Road 4",
            postalCode: "RSTR NT4"
        },
        rating: {
            starRating: 5
        }
    },
    {
        name: "Restaurant 5",
        cuisines: [{ name: "Cuisine 1" }, { name: "Cuisine 2"}],
        address: {
            firstLine: "Road 5",
            postalCode: "RSTR NT5"
        },
        rating: {
            starRating: 5
        }
    },
    {
        name: "Restaurant 6",
        cuisines: [{ name: "Cuisine 1" }, { name: "Cuisine 2"}],
        address: {
            firstLine: "Road 6",
            postalCode: "RSTR NT6"
        },
        rating: {
            starRating: 5
        }
    },
    {
        name: "Restaurant 7",
        cuisines: [{ name: "Cuisine 1" }, { name: "Cuisine 2"}],
        address: {
            firstLine: "Road 7",
            postalCode: "RSTR NT7"
        },
        rating: {
            starRating: 5
        }
    },
    {
        name: "Restaurant 8",
        cuisines: [{ name: "Cuisine 1" }, { name: "Cuisine 2"}],
        address: {
            firstLine: "Road 8",
            postalCode: "RSTR NT8"
        },
        rating: {
            starRating: 5
        }
    },
    {
        name: "Restaurant 9",
        cuisines: [{ name: "Cuisine 1" }, { name: "Cuisine 2"}],
        address: {
            firstLine: "Road 9",
            postalCode: "RSTR NT9"
        },
        rating: {
            starRating: 5
        }
    },
    {
        name: "Restaurant 0",
        cuisines: [{ name: "Cuisine 1" }, { name: "Cuisine 2"}],
        address: {
            firstLine: "Road 0",
            postalCode: "RSTR NT0"
        },
        rating: {
            starRating: 5
        }
    }
];

// Start and reset the mock server for each test
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("App Component", () => {

    test("renders the web page without crashing", () => {
        render(<App/>);
        expect(screen.getByText("Fetching Data...")).toBeInTheDocument(); // First screen upon running app is the loading screen

    })

    test("displays restaurant name", async () => {
        render(<App />);

        // Wait for the restaurant data to be displayed
        await waitFor(() => {
            expect(screen.getByText("Al-Baik Pizza")).toBeInTheDocument();
        });
    });

    test("displays restaurant's cuisines", async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText("Cuisines: Pizza, American")).toBeInTheDocument();
        });
    });

    test("displays restaurant address", async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText("111 Kennington Road, SE11 6SF")).toBeInTheDocument();
        });
    });

    test("displays restaurant rating", async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText("Rating: 4.3")).toBeInTheDocument();
        });
    });

    test("limits results to 10 restaurants", async () => {
        render(<App />);

        await waitFor(() => {
            const restaurantDataItems = screen.getAllByTestId("restaurant-item")
            expect(restaurantDataItems.length).toBe(10); // counting how many restaurant items are displayed
        });
    });

});