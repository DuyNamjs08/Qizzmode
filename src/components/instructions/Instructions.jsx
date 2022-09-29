import React from "react";
import "./instructions.scss";
import { Link } from "react-router-dom";
function Instructions(props) {
  return (
    <div className="instructions-container">
      <h2>Instructions</h2>
      <div className="btn-container d-flex   ">
        <button className=" px-3 py-2 rounded bg-danger text-white">
          <Link className="text-decoration-none text-white" to="/">Go Back</Link>
        </button>
        <button className="px-3 py-2 rounded bg-primary text-white">
          <Link className="text-decoration-none text-white" to="/play">Play Game</Link>
        </button>
      </div>
    </div>
  );
}

export default Instructions;
