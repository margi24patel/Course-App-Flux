import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="jumbotron">
      <h1>Pluralsight Administraton</h1>
      <p>React, Flux And React Router for responsive webapages.</p>
      <Link to="about" className="btn btn-primary">
        About
      </Link>
    </div>
  );
};

export default HomePage;
