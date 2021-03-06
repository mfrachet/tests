import { fireEvent, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render } from "../../modules/testing";
import Index from "../Index";

const server = setupServer(
  rest.get("https://pokeapi.co/api/v2/pokemon/*", (req, res, ctx) =>
    res(ctx.json({ name: "bulbasaur" }))
  )
);

describe("Homepage", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<Index />);
  });

  it("shows a loading information and make sure to rely on aria-busy when pressing submit", async () => {
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(screen.getByText("Loading the pokemon...")).toBeVisible());
    expect(screen.getByRole("main")).toHaveAttribute("aria-busy", "true");
  });

  it("shows an error message and focus it when something is going wrong", async () => {
    server.use(
      rest.get("https://pokeapi.co/api/v2/pokemon/*", (req, res, ctx) => res(ctx.status(500)))
    );

    fireEvent.change(screen.getByLabelText("Pokemon id"), { target: { value: "abcd" } });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() =>
      expect(screen.getByText("Something went wrong during the request")).toBeVisible()
    );

    expect(screen.getByText("Something went wrong during the request")).toHaveFocus();
  });

  it("shows the pokemon name", async () => {
    fireEvent.change(screen.getByLabelText("Pokemon id"), { target: { value: "1" } });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(screen.getByText("Hello bulbasaur")).toBeVisible());

    expect(screen.getByText("Hello bulbasaur")).toHaveFocus();
  });
});
