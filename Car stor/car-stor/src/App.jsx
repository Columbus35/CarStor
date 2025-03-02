import React from "react";
import {BrowserRouter} from "react-router-dom";
import CarInformation from "./data/carInformation";
import Navbar from "./components/navbar";
import {Carousel} from "./components/carousel";
import { Route, Routes } from "react-router-dom";
import AddCar from "./components/addCar";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
    <div className="navbar">
      <Navbar/>
    </div>  
    <div className="allComponent">
      <Routes>
        <Route path="/home" element= {<Carousel/>}/>
        <Route path="/shop" element= {<CarInformation/>}/>
        <Route path="/add-car/*" element= {<AddCar/>}/>
      </Routes>
    </div>
    </BrowserRouter>
   </React.Fragment>
  );
}

export default App;