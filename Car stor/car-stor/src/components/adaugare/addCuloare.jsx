import { Form, Container, Button, Alert, } from "react-bootstrap";
import { FaRegPaperPlane } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addCuloare.css";

const AddCuloare = () => {
  const [modelListe, setModelListe] = useState([]);
  const [collorlListe, setCollorListe] = useState([]);
const [model, setModel] = useState("");
  const [culoare, setCuloare] = useState("");
  const [poza, setPoza] = useState(null);
  const [fata, setFata] = useState("");
  const [lateral, setLateral] = useState("");
  const [spate, setSpate] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [meldung, setMeldung] = useState(null);
  const [modelId, setModelId] = useState(null);
  
   useEffect(() => {
        const fetchMarca = async () => {
        const response = await fetch("http://localhost:5050/Model");
        const jsonData = await response.json();
        const filteredData = jsonData.map(({ id, model }) => ({
        id,
        model,
      }));

      setModelListe(filteredData);
    };

    fetchMarca();
  }, []);

  useEffect(() => {
        const fetchGeneral = async () => {
        const response = await fetch("http://localhost:5050/General");
        const jsonData = await response.json();
        const filteredData = jsonData.map(({ poza, culoare }) => ({
        poza,
        culoare,
      }));

      setCollorListe(filteredData);
    };

    fetchGeneral();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const response = await axios.post("http://localhost:5050/adaugCuloare", {
  model: modelId,
  culoare: poza,
  fata: fata,
  lateral: lateral,
  spate: spate,
});
      setMeldung("Adaugarea s-a realizat cu succes!");
      setModel("");
      setSpate("");
      setLateral("");
      setFata("");
      setCuloare("");
    } catch (error) {
      console.error(error);
      setMeldung("Eroare la adaugare.");
    }
  };

    useEffect(() => {
    if (meldung) {
      const timer = setTimeout(() => {
        setMeldung(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [meldung]);

   const handleModelChange = (e) => {
    const selectedModel = e.target.value;
    setModel(selectedModel);

    const selectedItem = modelListe.find((item) => item.model === selectedModel);
    setModelId(selectedItem ? selectedItem.id : null);
  };

   const handleCollorChange = (e) => {
    const selectedColor = e.target.value;
    setCuloare(selectedColor);

    const selectedPoza = collorlListe.find((item) => item.culoare === selectedColor);
    setPoza(selectedPoza ? selectedPoza.poza : null);
  };

  return (
    <Container>
      <div className="culoareGeneral">{meldung && <Alert variant="info">{meldung}</Alert>}</div>

      <Form onSubmit={handleSubmit} className="modelFormHead">
        <h1 className="culoareTitlu">Adauga o culoare noua</h1>
<div className="formular">
        <div className="celule">
          <div className="spacing">

       <Form.Group className="culoareMb-3">
          <Form.Select
  className="culoareInputMarka"
  value={model}
  onChange={handleModelChange}
  required
><option className = "culoareOption">Model</option>
  {modelListe.map((item) => (
    <option key={item.id} value={item.model} className={`culoareOption ${!isActive ? "inactive" : ""}`}>
      {item.model}
    </option>
  ))}
</Form.Select>
          <Form.Label className="culoareLabel"></Form.Label>
          </Form.Group>
         </div>


          <Form.Group className="culoareMb-3">
          <Form.Select
  className="culoareInputMarka"
  value={culoare}
  onChange={handleCollorChange}
  required
><option className = "culoareOption">Culoare</option>
  {collorlListe.map((item) => (
    <option key={item.id} value={item.culoare} className={`culoareOption ${!isActive ? "inactive" : ""}`}>
      {item.culoare}
    </option>
  ))}

</Form.Select>
          
          <Form.Label className="culoareLabel"></Form.Label>
        </Form.Group>


        <Form.Group className="culoareMb-3">
          <Form.Control className="culoareInput"
            type="text"
            value={fata}
            onChange={(e) => setFata(e.target.value)}
            required ="required"
          />
          <Form.Label className="culoareLabel">Fata</Form.Label>
        </Form.Group>

         <Form.Group className="culoareMb-3">
          <Form.Control className="culoareInput"
            type="text"
            value={spate}
            onChange={(e) => setSpate(e.target.value)}
            required ="required"
          />
          <Form.Label className="culoareLabel">Spate</Form.Label>
        </Form.Group>

        <Form.Group className="culoareMb-3">
          <Form.Control className="culoareInput"
            type="text"
            value={lateral}
            onChange={(e) => setLateral(e.target.value)}
            required ="required"
          />
          <Form.Label className="culoareLabel">Lateral</Form.Label>
        </Form.Group>
        </div>
        
</div>
        <Button variant="primary" type="submit" className="culoareButon">
          <span className="culoareSpan">Adaugare <FaRegPaperPlane/></span><i></i>
        </Button>
      </Form>
    </Container>
  );
};

export default AddCuloare;
