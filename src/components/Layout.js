import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Navbar } from "./Navbar";

const Wrapper = styled.div`
  width: 60ch;
  margin: 0 auto;
`;

export function Layout() {
  return (
    <Wrapper>
      <Navbar />

      <Outlet />
    </Wrapper>
  );
}
