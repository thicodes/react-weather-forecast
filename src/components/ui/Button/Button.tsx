import styled from "styled-components";

const Button = styled.button`
  position: absolute;
  right: 7px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  background: #0f172a;
  color: white;
  border: 0;
  font-size: 22px;
  border-radius: 35px;
  padding: 12px 25px;

  &:hover {
    background: #334155;
  }
`;

export default Button;
