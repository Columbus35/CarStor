import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import fire from "./init.js";
import { getFirestore, collection, getDocs, doc, addDoc } from "firebase/firestore";

const port = 5050;
const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.static("files"));
const __filename = fileURLToPath(import.meta.url);  
const __dirname = path.dirname(__filename);
const imagesPath = path.join(__dirname, 'images');
app.use('/images', express.static(imagesPath));
app.use(express.json());

const db = getFirestore(fire);

app.get("/Cover", async (req, res) => {
  const coverList = await getDocs(collection(db, "Cover"));
  let newCover = await coverList.docs.map((item) => {
    let cover = item.data();
    cover.id = item.id; 
    return cover;
  });
  res.status(200).send(JSON.stringify(newCover));
});

app.get("/Color", async (req, res) => {
  const colorList = await getDocs(collection(db, "Color"));
  let newColor = await colorList.docs.map((item) => {
    let color = item.data();
    color.id = item.id; 
    return color;
  });
  res.status(200).send(JSON.stringify(newColor));
});

app.get("/Brand", async (req, res) => {
  const brandList = await getDocs(collection(db, "Brand"));
  let newBrand = await brandList.docs.map((item) => {
    let brand = item.data();
    brand.id = item.id; 
    return brand;
  });
  res.status(200).send(JSON.stringify(newBrand));
});

app.get("/General", async (req, res) => {
  const generalList = await getDocs(collection(db, "General"));
  let newGeneral = await generalList.docs.map((item) => {
    let general = item.data();
    general.id = item.id; 
    return general;
  });
  res.status(200).send(JSON.stringify(newGeneral));
});

app.get("/Model", async (req, res) => {
  const carList = await getDocs(collection(db, "ModelAuto"));
  const brandList = await getDocs(collection(db, "Brand"));

  let newBrand = brandList.docs.map((item) => {
    let brand = item.data();
    brand.id = item.id;
    return brand;
  });

  let newCar = carList.docs.map((item) => {
    let car = item.data();
    car.id = item.id;

    let matchedBrand = newBrand.find((brand) => {
      return String(brand.id).trim() === String(car.brand).trim();
    });

    if (matchedBrand) {
      car.brand = matchedBrand.brand;
      car.logo = matchedBrand.logo;
    }

    return car;
  });
  res.status(200).send(JSON.stringify(newCar));
});

app.post("/addBrand", async (req, res) => {
  const { brand, logo } = req.body;

  try {
    const newBrand = {
      brand: brand,
      logo: logo,
    };

    const docRef = await addDoc(collection(db, "Marca"), newBrand);

    res.status(201).send({ message: "Data has been successfully added!", id: docRef.id });
  } catch (error) {
    console.error("An error occurred while adding:", error);
    res.status(500).send({ message: "An error occurred while adding." });
  }
});

app.post("/addModel", async (req, res) => {
  const { brand, doors, transmission, traction, power, price, manufacture, consumption, fuel,
    model
  } = req.body;

  try {
    const newModel = {
      brand: brand,
      logo: "",
      model: model,
      fuel: fuel,
      consumption: consumption,
      manufacture: manufacture,
      price: price,
      power: power,
      traction: traction,
      transmission: transmission,
      doors: doors,
    };

    const docRef = await addDoc(collection(db, "ModelAuto"), newModel);

    res.status(201).send({ message: "Data has been successfully added!", id: docRef.id });
  } catch (error) {
    console.error("An error occurred while adding:", error);
    res.status(500).send({ message: "An error occurred while adding." });
  }
});

app.post("/addColor", async (req, res) => {
  const { model, color, front, side, back } = req.body;

  try {
    const newColor = {
      model: model,
      color: color,
      front: front,
      side: side,
      back: back,
    };

    const docRef = await addDoc(collection(db, "Color"), newColor);

    res.status(201).send({ message: "Data has been successfully added!", id: docRef.id });
  } catch (error) {
    console.error("An error occurred while adding:", error);
    res.status(500).send({ message: "An error occurred while adding." });
  }
});

app.listen(port, () => {
  console.log(`The server is waiting for requests on port ${port}`);
});
