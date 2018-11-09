import styled from "styled-components";
import { Link } from "react-router-dom";

export const ProjectContainer = styled.div`
    margin: 0 auto;
    width: 500px;
    height: auto;
    padding: 20px;
    border: 2px solid black;
    margin-top: 25px;
    background-color: red;
`;

export const StyledLink = styled(Link)`
  /* background-color: #24b8bd; */
  line-height: 2;
  font-size: 18px;
  font-weight: bold;
  text-decoration-line: none;
  color: white;
  text-align: center;

  &:hover {
    background: #d3d2d3;
    color: crimson;
    border: 1.5px solid crimson;
  }

  color: black;
`;

export const Title = styled.h1`
    margin: 0 auto;
    width: 500px;
    height: auto;
    padding: 10px;
    border: 2px solid black;
    margin-top: 25px;
    background-color: red;
`;

export const ActionList = styled.p`
    margin: 0 auto;
    width: 500px;
    height: auto;
    padding: 10px;
    border: 2px solid black;
    margin-top: 25px;
`;