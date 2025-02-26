import React from "react";
import AddMarca from "./adaugare/addMarca";
import AddNavbar from "../data/addNavbar";
import AddModel from "./adaugare/addModel";
import AddCuloare from "./adaugare/addCuloare";
import { Route, Routes } from "react-router-dom";
import "./addMasina.css";

function AddMasina() {
  return (
    <React.Fragment>
      <div>
        <AddNavbar />
      </div>
      <div className="adaugare">
        <Routes>
          <Route path="marca" element={<AddMarca />} />
          <Route path="model" element={<AddModel />} />
          <Route path="culoare" element={<AddCuloare />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default AddMasina;
