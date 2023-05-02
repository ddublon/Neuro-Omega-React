import React from "react";
import { Link, NavLink, useMatch, useResolvedPath } from "react-router-dom";
import PreperationPageIcon from "../../data/Icons/checklist.png";
import ConnectionsIcon from "../../data/Icons/Connection.png";
import GraphPageIcon from "../../data/Icons/HaGuide.png";
import styled from "styled-components";

const StyledNavBar = styled.nav`
  margin: 0;
  padding: 0;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: 0 2rem;
  background-color: #f5f5f5;
  height: inherit;
  max-height: 30px;
  width: 50%;
  ul {
    display: flex;
    list-style: none;
    width: 100%;
    justify-content: space-between;
    align-items: stretch;
    margin: 0;
    padding: 0;
  }

  ul > a > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Navbar = () => {
  return (
    <StyledNavBar>
      <ul>
        <NavLink to="/">
          <img src={ConnectionsIcon} alt="Connection" />
        </NavLink>
        <NavLink to="/preparationpage">
          <img src={PreperationPageIcon} alt="PreperationPageIcon" />
        </NavLink>
        <NavLink to="/graphpage">
          <img src={GraphPageIcon} alt="GraphPageIcon" />
        </NavLink>
      </ul>
    </StyledNavBar>
  );
};

export default Navbar;
