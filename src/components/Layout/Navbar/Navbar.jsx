import React from "react";
import logo from "../../../logo_api.png";
// import './navbar.css'

export default function Navbar() {
  return (
    <div className="absolute w-full border-t-4 border-purple-700 bg-white ">
      <div className="border-b border-gray-300">
        <div className="flex max-w-6xl mx-auto">
          <img src={logo} alt="logo" className=" p-0" />
        </div>
      </div>
    </div>
  );
}
