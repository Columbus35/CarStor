import { Form, Container, Button, Alert } from "react-bootstrap";
import { FaRegPaperPlane } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addColor.css";

const AddColor = () => {
  const [modelList, setModelList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState(null);
  const [front, setFront] = useState("");
  const [side, setSide] = useState("");
  const [rear, setRear] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState(null);
  const [modelId, setModelId] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      const response = await fetch("http://localhost:5050/Model");
      const jsonData = await response.json();
      const filteredData = jsonData.map(({ id, model }) => ({ id, model }));

      setModelList(filteredData);
    };

    fetchModels();
  }, []);

  useEffect(() => {
    const fetchGeneral = async () => {
      const response = await fetch("http://localhost:5050/General");
      const jsonData = await response.json();
      const filteredData = jsonData.map(({ image, color }) => ({ image, color }));

      setColorList(filteredData);
    };

    fetchGeneral();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5050/addColor", {
        model: modelId,
        color: image,
        front: front,
        side: side,
        rear: rear,
      });
      setMessage("Color added successfully!");
      setModel("");
      setRear("");
      setSide("");
      setFront("");
      setColor("");
    } catch (error) {
      console.error(error);
      setMessage("Error adding color.");
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

  const handleModelChange = (e) => {
    const selectedModel = e.target.value;
    setModel(selectedModel);

    const selectedItem = modelList.find((item) => item.model === selectedModel);
    setModelId(selectedItem ? selectedItem.id : null);
  };

  const handleColorChange = (e) => {
    const selectedColor = e.target.value;
    setColor(selectedColor);

    const selectedImage = colorList.find((item) => item.color === selectedColor);
    setImage(selectedImage ? selectedImage.image : null);
  };

  return (
    <Container>
      <div className="colorGeneral">{message && <Alert variant="info">{message}</Alert>}</div>

      <Form onSubmit={handleSubmit} className="modelFormHead">
        <h1 className="colorTitle">Add a New Color</h1>
        <div className="formContainer">
          <div className="formCells">
            <div className="spacing">
              <Form.Group className="colorMb-3">
                <Form.Select className="colorInputModel" value={model} onChange={handleModelChange} required>
                  <option className="colorOption">Model</option>
                  {modelList.map((item) => (
                    <option key={item.id} value={item.model} className={`colorOption ${!isActive ? "inactive" : ""}`}>
                      {item.model}
                    </option>
                  ))}
                </Form.Select>
                <Form.Label className="colorLabel"></Form.Label>
              </Form.Group>
            </div>

            <Form.Group className="colorMb-3">
              <Form.Select className="colorInputModel" value={color} onChange={handleColorChange} required>
                <option className="colorOption">Color</option>
                {colorList.map((item) => (
                  <option key={item.id} value={item.color} className={`colorOption ${!isActive ? "inactive" : ""}`}>
                    {item.color}
                  </option>
                ))}
              </Form.Select>
              <Form.Label className="colorLabel"></Form.Label>
            </Form.Group>

            <Form.Group className="colorMb-3">
              <Form.Control className="colorInput" type="text" value={front} onChange={(e) => setFront(e.target.value)} required />
              <Form.Label className="colorLabel">Front</Form.Label>
            </Form.Group>

            <Form.Group className="colorMb-3">
              <Form.Control className="colorInput" type="text" value={rear} onChange={(e) => setRear(e.target.value)} required />
              <Form.Label className="colorLabel">Rear</Form.Label>
            </Form.Group>

            <Form.Group className="colorMb-3">
              <Form.Control className="colorInput" type="text" value={side} onChange={(e) => setSide(e.target.value)} required />
              <Form.Label className="colorLabel">Side</Form.Label>
            </Form.Group>
          </div>
        </div>
        <Button variant="primary" type="submit" className="colorButton">
          <span className="colorSpan">Add <FaRegPaperPlane /></span>
        </Button>
      </Form>
    </Container>
  );
};

export default AddColor;
