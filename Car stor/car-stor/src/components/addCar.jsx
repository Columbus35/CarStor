import React from "react";
import AddBrand from "./addition/addBrand";
import AddNavbar from "../data/addNavbar";
import AddModel from "./addition/addModel";
import AddColor from "./addition/addColor";
import { Route, Routes } from "react-router-dom";
import "./addCar.css";

function AddCar() {
  return (
    <React.Fragment>
      <div>
        <AddNavbar />
      </div>
      <div className="addition">
        <Routes>
          <Route path="brand" element={<AddBrand />} />
          <Route path="model" element={<AddModel />} />
          <Route path="color" element={<AddColor />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default AddCar;
