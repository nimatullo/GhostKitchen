import React from "react";

const Dialog = ({ open }) => {
  const overlay = () => {
    if (open) {
      return (
        <div className="overlay">
          <h1>hello world</h1>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return overlay();
};

export default Dialog;
