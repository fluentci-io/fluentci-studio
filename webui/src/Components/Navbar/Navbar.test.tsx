import { render } from "@testing-library/react";
import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";

describe("Navbar", () => {
  it("should render the component", () => {
    const { container } = render(<Navbar onSignOut={vi.fn()} />, {
      wrapper: BrowserRouter,
    });
    expect(container).toMatchSnapshot();
  });
});
