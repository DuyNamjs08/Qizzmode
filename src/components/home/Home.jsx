import React from "react";
import "./home.scss";
import Logo from "../../assets/img/logo.png";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
function Home(props) {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="home-container pt-5 vw-100 vh-100  d-flex justify-content-center ">
        <div className="home-container-main d-flex align-items-center flex-column p-4 rounded">
          <img src={Logo} alt="" />
          <h2 className="mt-4 text-center">PLay Quizz Game</h2>
          <button className="btn-istruction mt-4 px-4 py-2 bg-success  rounded ">
          <Link className="text-decoration-none text-white" to="/instructions">Instructions</Link>
          </button>
          <div className="home-btn gap-4 d-flex justify-content-center mt-4  ">
            <button className="px-4 py-2 rounded bg-danger text-white">
              <Link className="text-decoration-none text-white" to="/login">Login</Link>
            </button>
            <button className="px-4 py-2 rounded bg-primary text-white">
              <Link className="text-decoration-none text-white" to="/register">Register</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
