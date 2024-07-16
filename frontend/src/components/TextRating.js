import React from "react";

function TextRating({ rating }) {
  const validRating = Math.min(100, Math.max(0, rating));

  const red = 255 - validRating * 2.55;
  const green = validRating * 2.55;
  const backgroundColor = `rgb(${red}, ${green}, 0)`;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "75px",
        height: "50px",
        backgroundColor,
        color: "#fff",
        fontWeight: "bold",
        borderRadius: "10px",
        fontSize: "2rem",
        fontFamily: "'Orbitron', sans-serif",
      }}
    >
      {validRating}
    </div>
  );
}

export default TextRating;
