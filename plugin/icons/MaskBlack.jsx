import React from "react";

function MaskBlack() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path fill="none" d="M15 0H0v16h16V0zm0 15H1V1h14z"></path>
      <path style={{ isolation: "isolate" }} fill="none" d="M1 1H15V12H1z" opacity="0.4"></path>
    </svg>
  );
}

export default MaskBlack;
