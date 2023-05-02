import React from "react";
import styled from "styled-components";
import NOimagejpg from "../../data/images/NOimage.jpg";

const StyledRightImage = styled.div`
  grid-area: image;
`;

const NOimage = () => {
  return (
    <StyledRightImage>
      <img
        src={NOimagejpg}
        alt={"NOImage"}
        width={"100px"}
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%",
        }}
      />
    </StyledRightImage>
  );
};

export default NOimage;
