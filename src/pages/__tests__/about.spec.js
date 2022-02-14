import { render } from "../../modules/testing";
import About from "../about";

describe("About", () => {
  it("does something great", () => {
    const { container } = render(<About />);

    expect(container).toMatchSnapshot();
  });
});
