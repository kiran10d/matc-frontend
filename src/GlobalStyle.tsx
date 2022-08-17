import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
  }
  .btn-primary{
    background-color: #80bc00;
    padding: 5px 15px;
    color: white;
    font-size: 14px;
    border: none;
    border-radius: 0;
    text-transform: uppercase;
    &:hover {
      background-color: #fcb800;
    }
  }
  .btn-secondary{
    background-color: #e5e5e5;
    padding: 5px 15px;
    color: #000000;
    font-size: 14px;
    border: none;
    border-radius: 0;
    text-transform: uppercase;
    &:hover {
      background-color: #fcb800;
      color: white;
    }
  }
  .btn-light{
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    padding: 5px 15px;
    color: #707070;
    font-size: 14px;
  }

`;
