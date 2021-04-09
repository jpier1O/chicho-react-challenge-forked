import styled from "styled-components";

export const HeaderPrimary = styled.h1`
  color: teal;
`;
export const Container = styled.div`
  text-align: center;
`;
export const Video = styled.div`
  ${({ grayScale }) =>
    grayScale &&
    `
    filter: grayscale();
  `}
  ${({ blur }) =>
    blur &&
    `
    filter: blur(4px);
  `}
  align-content: center;
`;
