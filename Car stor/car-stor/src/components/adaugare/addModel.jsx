import { Form, Container, Button, Alert, } from "react-bootstrap";
import { FaRegPaperPlane } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addModel.css";

const AddModel = () => {
  const [markenListe, setMarkenListe] = useState([]);
  const [marke, setMarke] = useState("");
  const [usi, setUsi] = useState("");
  const [transmisie, setTransmisie] = useState("");
  const [tractiune, setTractiune] = useState("");
  const [putere, setPutere] = useState("");
  const [pret, setPret] = useState("");
  const [fabricatie, setFabricatie] = useState("");
  const [consum, setConsum] = useState("");
  const [conbustibil, setConbustibil] = useState("");
  const [model, setModel] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [markeId, setMarkeId] = useState(null);
  const [meldung, setMeldung] = useState(null);
  
   useEffect(() => {
        const fetchMarca = async () => {
        const response = await fetch("http://localhost:5050/Marca");
        const jsonData = await response.json();
        const filteredData = jsonData.map(({ id, marca }) => ({
        id,
        marca,
      }));

      setMarkenListe(filteredData);
    };

    fetchMarca();
  }, []);

    const fetchData = async () => {
        const response = await fetch("http://localhost:5050/Model");
        const jsonData = await response.json();

        const formattedSlides = jsonData.map((item) => ({
          model: item.model || "Model",
        }));

        console.log(jsonData);
        const checkSlides = formattedSlides.some((item) => item.model === model);
      return checkSlides;

    };
    

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await fetchData()) {
      setMeldung("Modelul deja exista in baza de date!");
      return;
    }

    try {
     const response = await axios.post("http://localhost:5050/adaugModel", {
  marca: markeId,
  usi: usi,
  transmisie: transmisie,
  tractiune: tractiune,
  putere: putere,
  pret: pret,
  fabricatie: fabricatie,
  consum: consum,
  conbustibil: conbustibil,
  model: model,
});
      setMeldung("Adaugarea s-a realizat cu succes!");
      setMarkeId("");
      setModel("");
      setConbustibil("");
      setConsum("");
      setFabricatie("");
      setPret("");
      setPutere("");
      setTractiune("");
      setTransmisie("");
      setUsi("");
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

    const handleMarkeChange = (e) => {
    const selectedMarke = e.target.value;
    setMarke(selectedMarke);

    const selectedItem = markenListe.find((item) => item.marca === selectedMarke);
    setMarkeId(selectedItem ? selectedItem.id : null);
  };

  return (
    <Container>
      <div className="modelGeneral">{meldung && <Alert variant="info">{meldung}</Alert>}</div>

      <Form onSubmit={handleSubmit} className="modelFormHead">
        <h1 className="modelTitlu">Adauga un model nou</h1>
<div className="formular">
        <div className="celule">
          <div className="spacing">
        <Form.Group className="modelMb-3">
          <Form.Select
  className="modelInputMarka"
  value={marke}
  onChange={handleMarkeChange}
  required
><option className = "modelOption">Marca</option>
  {markenListe.map((item) => (
    <option key={item.id} value={item.marca} className={`modelOption ${!isActive ? "inactive" : ""}`}>
      {item.marca}
    </option>
  ))}

</Form.Select>
          
          <Form.Label className="modelLabel"></Form.Label>
        </Form.Group>
         </div>
         <div className="spacing">
                <Form.Group className="modelMb-3">
          <Form.Control className="modelInput"
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required ="required"
          />
          <Form.Label className="modelLabel">Model</Form.Label>
        </Form.Group>
      </div>
      <div className="spacing">
        <Form.Group className="modelMb-3">
          <Form.Control className="modelInput"
            type="number"
            value={usi}
            onChange={(e) => setUsi(e.target.value)}
            required ="required"
          />
          <Form.Label className="modelLabel">Usi</Form.Label>
        </Form.Group>
       </div>
        <Form.Group className="modelMb-3">
          <Form.Control className="modelInput"
            type="text"
            value={transmisie}
            onChange={(e) => setTransmisie(e.target.value)}
            required ="required"
          />
          <Form.Label className="modelLabel">Transmisie</Form.Label>
        </Form.Group>

        <Form.Group className="modelMb-3">
          <Form.Control className="modelInput"
            type="text"
            value={tractiune}
            onChange={(e) => setTractiune(e.target.value)}
            required ="required"
          />
          <Form.Label className="modelLabel">Tractiune</Form.Label>
        </Form.Group>
        </div>
        <div className="celule">
        <Form.Group className="modelMb-3">
          <Form.Control className="modelInput"
            type="text"
            value={putere}
            onChange={(e) => setPutere(e.target.value)}
            required ="required"
          />
          <Form.Label className="modelLabel">Putere</Form.Label>
        </Form.Group>

        <Form.Group className="modelMb-3">
          <Form.Control className="modelInput"
            type="number"
            value={pret}
            onChange={(e) => setPret(e.target.value)}
            required ="required"
          />
          <Form.Label className="modelLabel">Pret</Form.Label>
        </Form.Group>

        <Form.Group className="modelMb-3">
          <Form.Control className="modelInput"
            type="number"
            value={fabricatie}
            onChange={(e) => setFabricatie(e.target.value)}
            required ="required"
          />
          <Form.Label className="modelLabel">Fabricatie</Form.Label>
        </Form.Group>

        <Form.Group className="modelMb-3">
          <Form.Control className="modelInput"
            type="text"
            value={consum}
            onChange={(e) => setConsum(e.target.value)}
            required ="required"
          />
          <Form.Label className="modelLabel">Consum</Form.Label>
        </Form.Group>

        <Form.Group className="modelMb-3">
          <Form.Control className="modelInput"
            type="text"
            value={conbustibil}
            onChange={(e) => setConbustibil(e.target.value)}
            required ="required"
          />
          <Form.Label className="modelLabel">Conbustibil</Form.Label>
        </Form.Group>
        </div>
</div>
        <Button variant="primary" type="submit" className="modelButon">
          <span className="modelSpan">Adaugare <FaRegPaperPlane/></span><i></i>
        </Button>
      </Form>
    </Container>
  );
};

export default AddModel;
