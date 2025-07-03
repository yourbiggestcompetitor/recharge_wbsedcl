import React from "react";

export default function BackgroundTest() {
  return (
    <div
      style={{
        backgroundImage: "url('/over.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}
    ></div>
  );
}
