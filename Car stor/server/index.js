import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import fire from "./init.js";
import { getFirestore, collection, getDocs, doc, addDoc} from "firebase/firestore";

const port = 5050;
const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.static("files"));
const __filename = fileURLToPath(import.meta.url);  
const __dirname = path.dirname(__filename);
const imaginiPath = path.join(__dirname, 'imagini');
app.use('/imagini', express.static(imaginiPath));
app.use(express.json());

const db = getFirestore(fire);

app.get("/Cover", async (req, res) => {
  const listaCover = await getDocs(collection(db, "Cover"));
  let newCover = await listaCover.docs.map((item) => {
    let cover = item.data();
    cover.id = item.id; 
    return cover;
  });
  res.status(200).send(JSON.stringify(newCover));
});

app.get("/Color", async (req, res) => {
  const listaCuloare = await getDocs(collection(db, "Culoare"));
  let newCuloare = await listaCuloare.docs.map((item) => {
    let culoare = item.data();
    culoare.id = item.id; 
    return culoare;
  });
  res.status(200).send(JSON.stringify(newCuloare));
});

app.get("/Marca", async (req, res) => {
  const listaMarca = await getDocs(collection(db, "Marca"));
  let newMarca = await listaMarca.docs.map((item) => {
    let marca = item.data();
    marca.id = item.id; 
    return marca;
  });
  res.status(200).send(JSON.stringify(newMarca));
})

app.get("/General", async (req, res) => {
  const listaGenerala = await getDocs(collection(db, "General"));
  let newGeneral = await listaGenerala.docs.map((item) => {
    let general = item.data();
    general.id = item.id; 
    return general;
  });
  res.status(200).send(JSON.stringify(newGeneral));
})

app.get("/Model", async (req, res) => {
    const listaAuto = await getDocs(collection(db, "ModelAuto"));
    const listaMarca = await getDocs(collection(db, "Marca"));

    let newMarca = listaMarca.docs.map((item) => {
      let marca = item.data();
      marca.id = item.id;
      return marca;
    });

    let newAuto = listaAuto.docs.map((item) => {
      let auto = item.data();
      auto.id = item.id;

      let matchedMarca = newMarca.find((marca) => {
        return String(marca.id).trim() === String(auto.marca).trim();
      });

      if (matchedMarca) {
        auto.marca = matchedMarca.marca;
        auto.logo = matchedMarca.logo;
      }

      return auto;
    });
    res.status(200).send(JSON.stringify(newAuto));

  });;

app.post("/adaugMarca", async (req, res) => {
  const { marca, logo } = req.body;

  try {
    const newMarca = {
      marca: marca,
      logo: logo,
    };

    const docRef = await addDoc(collection(db, "Marca"), newMarca);

    res.status(201).send({ message: "Datele au fost adaugate cu succes!", id: docRef.id });
  } catch (error) {
    console.error("A aparut o eroare la adaugare:", error);
    res.status(500).send({ message: "A aparut o eroare la adaugare." });
  }
});

app.post("/adaugModel", async (req, res) => {
  const { marca, usi, transmisie, tractiune, putere, pret, fabricatie, consum, conbustibil,
    model
   } = req.body;

  try {
    const newModel = {
      marca: marca,
      logo:"",
      model: model,
      conbustibil: conbustibil,
      consum: consum,
      fabricatie: fabricatie,
      pret: pret,
      putere: putere,
      tractiune: tractiune,
      transmisie: transmisie,
      usi: usi,
    };

    const docRef = await addDoc(collection(db, "ModelAuto"), newModel);

    res.status(201).send({ message: "Datele au fost adaugate cu succes!", id: docRef.id });
  } catch (error) {
    console.error("A aparut o eroare la adaugare:", error);
    res.status(500).send({ message: "A aparut o eroare la adaugare." });
  }
});

app.post("/adaugCuloare", async (req, res) => {
  const { model, culoare, fata, lateral, spate } = req.body;

  try {
    const newCollor = {
      model: model,
      culoare: culoare,
      fata: fata,
      lateral: lateral,
      spate: spate,
    };

    const docRef = await addDoc(collection(db, "Culoare"), newCollor);

    res.status(201).send({ message: "Datele au fost adaugate cu succes!", id: docRef.id });
  } catch (error) {
    console.error("A aparut o eroare la adaugare:", error);
    res.status(500).send({ message: "A aparut o eroare la adaugare." });
  }
});

app.listen(port, () => {
  console.log(`Serverul așteaptă comenzi pe portul ${port}`);
});