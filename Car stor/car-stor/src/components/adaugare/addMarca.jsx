import { Form, Container, Button, Alert } from "react-bootstrap";
import { FaRegPaperPlane } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addMarca.css";

const AdaugMarca = () => {
  const [marke, setMarke] = useState("");
  const [logo, setLogo] = useState("");
  const [meldung, setMeldung] = useState(null);

    const fetchData = async () => {
        const response = await fetch("http://localhost:5050/Marca");
        const jsonData = await response.json();

        const formattedSlides = jsonData.map((item) => ({
          marca: item.marca || "Marca",
        }));

        console.log(jsonData);
        const checkSlides = formattedSlides.some((item) => item.marca === marke);
      return checkSlides;

    };
    

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await fetchData()) {
      setMeldung("Marca deja exista in baza de date!");
      return;
    }

    try {
     const response = await axios.post("http://localhost:5050/adaugMarca", {
  marca: marke,
  logo: logo,
});
      setMeldung("Adaugarea s-a realizat cu succes!");
      setMarke("");
      setLogo("");
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
  return (
    <Container>
      <div className="marcaGeneral">{meldung && <Alert variant="info">{meldung}</Alert>}</div>

      <Form onSubmit={handleSubmit} className="marcaFormHead">
        <h1 className="marcaTitlu">Adauga o marca noua</h1>
        <Form.Group className="marcaMb-3">
          <Form.Control className="marcaInput"
            type="text"
            value={marke}
            onChange={(e) => setMarke(e.target.value)}
            required ="required"
          />
          <Form.Label className="marcaLabel">Marca</Form.Label>
        </Form.Group>

        <Form.Group className="marcaMb-3">
          <Form.Control className="marcaInput" required ="required"
            type="text"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}

          />
          <Form.Label className="marcaLabel">Logo</Form.Label>
        </Form.Group>

        <Button variant="primary" type="submit" className="marcaButon">
          <span className="marcaSpan">Adaugare <FaRegPaperPlane/></span><i></i>
        </Button>
      </Form>
    </Container>
  );
};

export default AdaugMarca;
