import React from "react";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feeds from "../../components/feeds/Feeds";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="homeContainer">
        <Leftbar />
        <Feeds />
        <Rightbar />
      </div>
    </div>
  );
};

export default Home;
