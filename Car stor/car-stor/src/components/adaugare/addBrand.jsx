import { Form, Container, Button, Alert } from "react-bootstrap";
import { FaRegPaperPlane } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addBrand.css";

const AddBrand = () => {
  const [brand, setBrand] = useState("");
  const [logo, setLogo] = useState("");
  const [message, setMessage] = useState(null);

  const fetchData = async () => {
    const response = await fetch("http://localhost:5050/Brand");
    const jsonData = await response.json();

    const formattedBrands = jsonData.map((item) => ({
      brand: item.brand || "Brand",
    }));

    console.log(jsonData);
    const brandExists = formattedBrands.some((item) => item.brand === brand);
    return brandExists;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await fetchData()) {
      setMessage("The brand already exists in the database!");
      return;
    }

    try {
      await axios.post("http://localhost:5050/addBrand", {
        brand: brand,
        logo: logo,
      });
      setMessage("Brand added successfully!");
      setBrand("");
      setLogo("");
    } catch (error) {
      console.error(error);
      setMessage("Error adding brand.");
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

  return (
    <Container>
      <div className="brandGeneral">{message && <Alert variant="info">{message}</Alert>}</div>

      <Form onSubmit={handleSubmit} className="brandFormHead">
        <h1 className="brandTitle">Add a new brand</h1>
        <Form.Group className="brandMb-3">
          <Form.Control
            className="brandInput"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
          <Form.Label className="brandLabel">Brand</Form.Label>
        </Form.Group>

        <Form.Group className="brandMb-3">
          <Form.Control
            className="brandInput"
            type="text"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            required
          />
          <Form.Label className="brandLabel">Logo</Form.Label>
        </Form.Group>

        <Button variant="primary" type="submit" className="brandButton">
          <span className="brandSpan">
            Add <FaRegPaperPlane />
          </span>
          <i></i>
        </Button>
      </Form>
    </Container>
  );
};

export default AddBrand;
