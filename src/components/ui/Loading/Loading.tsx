import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const animationCircle = keyframes`
  0% {
    stroke-dasharray: 1px,200px;
    stroke-dashoffset: 0;
  }
  50% {
      stroke-dasharray: 100px,200px;
      stroke-dashoffset: -15px;
  }

  100% {
      stroke-dasharray: 100px,200px;
      stroke-dashoffset: -125px;
  }
`;

const Circle = styled.circle`
  stroke: currentColor;
  stroke-dasharray: 80px, 200px;
  stroke-dashoffset: 0;
  animation: ${animationCircle} 1.4s ease-in-out infinite;
`;

const Container = styled.span`
  width: 40px;
  height: 40px;

  display: inline-block;
  color: rgb(25, 118, 210);
  animation: 1.4s linear 0s infinite normal none running ${rotate};
`;

const Loading = () => {
  return (
    <Container>
      <svg viewBox="22 22 44 44">
        <Circle cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6" />
      </svg>
    </Container>
  );
};

export default Loading;
