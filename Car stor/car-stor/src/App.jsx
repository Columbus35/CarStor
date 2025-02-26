import React from "react";
import {BrowserRouter} from "react-router-dom";
import CarInformation from "./data/carInformation";
import Navbar from "./components/navbar";
import {Carousel} from "./components/carousel";
import { Route, Routes } from "react-router-dom";
import AddMasina from "./components/addMasina";
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
        <Route path="/magazin" element= {<CarInformation/>}/>
        <Route path="/add-masini/*" element= {<AddMasina/>}/>
      </Routes>
    </div>
    </BrowserRouter>
   </React.Fragment>
  );
}

export default App;