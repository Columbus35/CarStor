import React, { useState, useEffect } from "react";
import { MdOutline360 } from "react-icons/md";
import './colorCar.css';

const Color = ({ id }) => {
  const [slides, setSlides] = useState([]);
  const [currentObject, setCurrentObject] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchColorData = async () => {
      try {
        const response = await fetch("http://localhost:5050/Color");
        const jsonData = await response.json();
        const filteredData = jsonData.filter((color) => color.model === id);

        const formattedSlides = filteredData.map((item) => ({
          color: `http://localhost:5050/imagini/${item.culoare}`,
          images: [
            `http://localhost:5050/imagini/${item.fata}`,
            `http://localhost:5050/imagini/${item.lateral}`,
            `http://localhost:5050/imagini/${item.spate}`,
          ],
        }));

        setSlides(formattedSlides);
        setCurrentObject(0); 
        setCurrentImage(1); 
      } catch (error) {
        console.error("Fehler beim Laden der Farb-Daten:", error);
      }
    };

    fetchColorData();
  }, [id]);

  const nextImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === slides[currentObject].images.length - 1 ? 0 : prevImage + 1
    );
  };

  const selectObject = (index) => {
    setCurrentObject(index);
    setCurrentImage(1);
  };

  return (
    <div className="carPres">
      <div className="background">
        <img
          src={`http://localhost:5050/imagini/Garage.png`}
        />
        <div className="lumini">
        <img
          src={`http://localhost:5050/imagini/Lichter.png`}
        />
        </div>
      </div>

      {slides.length > 0 && (
        <div className="carImg">
          <img
            src={slides[currentObject].images[currentImage]}
          />
        </div>
      )}

      <div className="iconCar">
        {slides[currentObject] &&
          slides[currentObject].images &&
          slides[currentObject].images.map((image, index) => (
            <img
              key={index}
              src={image}
              className="miniCar"
            />
          ))}
      </div>

      <span onClick={nextImage} className="next">
        <MdOutline360 size="40" />
      </span>

      <span className="carIndicators">
        {slides.map((slide, idx) => (
          <button
            key={idx}
            className={
              currentObject === idx
                ? "carIndicator"
                : "carIndicator carIndicator-inactive"
            }
            onClick={() => selectObject(idx)}
          >
            <img src={slide.color}/>
          </button>
        ))}
      </span>
    </div>
  );
};

export default Color;
