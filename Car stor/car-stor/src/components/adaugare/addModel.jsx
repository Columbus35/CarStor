import { Form, Container, Button, Alert } from "react-bootstrap";
import { FaRegPaperPlane } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addModel.css";

const AddModel = () => {
  const [brandList, setBrandList] = useState([]);
  const [brand, setBrand] = useState("");
  const [doors, setDoors] = useState("");
  const [transmission, setTransmission] = useState("");
  const [drive, setDrive] = useState("");
  const [power, setPower] = useState("");
  const [price, setPrice] = useState("");
  const [manufactureYear, setManufactureYear] = useState("");
  const [consumption, setConsumption] = useState("");
  const [fuel, setFuel] = useState("");
  const [model, setModel] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [brandId, setBrandId] = useState(null);
  const [message, setMessage] = useState(null);
  
  useEffect(() => {
    const fetchBrands = async () => {
      const response = await fetch("http://localhost:5050/Marca");
      const jsonData = await response.json();
      const filteredData = jsonData.map(({ id, marca }) => ({
        id,
        marca,
      }));
      setBrandList(filteredData);
    };
    fetchBrands();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:5050/Model");
    const jsonData = await response.json();
    const formattedModels = jsonData.map((item) => ({
      model: item.model || "Model",
    }));
    console.log(jsonData);
    return formattedModels.some((item) => item.model === model);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await fetchData()) {
      setMessage("The model already exists in the database!");
      return;
    }
    try {
      await axios.post("http://localhost:5050/adaugModel", {
        brand: brandId,
        doors,
        transmission,
        drive,
        power,
        price,
        manufactureYear,
        consumption,
        fuel,
        model,
      });
      setMessage("Model successfully added!");
      setBrandId("");
      setModel("");
      setFuel("");
      setConsumption("");
      setManufactureYear("");
      setPrice("");
      setPower("");
      setDrive("");
      setTransmission("");
      setDoors("");
    } catch (error) {
      console.error(error);
      setMessage("Error adding model.");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    setBrand(selectedBrand);
    const selectedItem = brandList.find((item) => item.marca === selectedBrand);
    setBrandId(selectedItem ? selectedItem.id : null);
  };

  return (
    <Container>
      <div className="modelGeneral">{message && <Alert variant="info">{message}</Alert>}</div>
      <Form onSubmit={handleSubmit} className="modelFormHead">
        <h1 className="modelTitle">Add a new model</h1>
        <div className="formLayout">
          <Form.Group className="modelMb-3">
            <Form.Select className="modelInputBrand" value={brand} onChange={handleBrandChange} required>
              <option className="modelOption">Brand</option>
              {brandList.map((item) => (
                <option key={item.id} value={item.marca} className={`modelOption ${!isActive ? "inactive" : ""}`}>
                  {item.marca}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="modelMb-3">
            <Form.Control className="modelInput" type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
            <Form.Label className="modelLabel">Model</Form.Label>
          </Form.Group>

          <Form.Group className="modelMb-3">
            <Form.Control className="modelInput" type="number" value={doors} onChange={(e) => setDoors(e.target.value)} required />
            <Form.Label className="modelLabel">Doors</Form.Label>
          </Form.Group>

          <Form.Group className="modelMb-3">
            <Form.Control className="modelInput" type="text" value={transmission} onChange={(e) => setTransmission(e.target.value)} required />
            <Form.Label className="modelLabel">Transmission</Form.Label>
          </Form.Group>

          <Form.Group className="modelMb-3">
            <Form.Control className="modelInput" type="text" value={drive} onChange={(e) => setDrive(e.target.value)} required />
            <Form.Label className="modelLabel">Drive</Form.Label>
          </Form.Group>
        </div>

        <Button variant="primary" type="submit" className="modelButton">
          <span className="modelSpan">Add <FaRegPaperPlane /></span>
        </Button>
      </Form>
    </Container>
  );
};

export default AddModel;
