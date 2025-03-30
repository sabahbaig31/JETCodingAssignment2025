import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import App from '../App'

describe("App Component", () => {
    test("renders the web page without crashing", () => {
        render(<App/>)
        expect(screen.getByText("Top 10 Restaurants")).toBeInTheDocument()
    })
})