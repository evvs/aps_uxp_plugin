import React from "react";

function MaskWhite() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path fill="none" d="M15 0H0v16h16V0zm0 15H1V1h14z"></path>
      <path style={{ isolation: "isolate" }} fill="none" d="M1 12H15V15H1z" opacity="0.4"></path>
    </svg>
  );
}

export default MaskWhite;
