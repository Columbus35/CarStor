import React, { useState, useEffect } from "react";
import { IoCarSport } from "react-icons/io5";
import { BsCalendar2Date } from "react-icons/bs";
import { SiGoogleearthengine } from "react-icons/si";
import { GiGearStickPattern, GiAbstract021, GiMoneyStack, GiCarDoor } from "react-icons/gi";
import { FaGasPump } from "react-icons/fa";
import { MdWaterDrop } from "react-icons/md";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Color from "./colorCar";
import "./carInformation.css";

const MainPage = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5050/Model");
        const jsonData = await response.json();

        const formattedSlides = jsonData.map((item) => ({
          id: item.id || "id",
          logo: `http://localhost:5050/imagini/${item.logo}`,
          fuel: item.conbustibil || "Fuel",
          consumption: item.consum || "Consumption",
          manufactureYear: item.fabricatie || "Manufacture Year",
          brand: item.marca || "Brand",
          model: item.model || "Model",
          price: item.pret || "Price",
          power: item.putere || "Power",
          transmission: item.transmisie || "Transmission",
          drivetrain: item.tractiune || "Drivetrain",
          doors: item.usi || "Doors",
        }));

        formattedSlides.sort((a, b) => a.brand.localeCompare(b.brand));
        setSlides(formattedSlides);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <section>
        <div className="shop">
          <div className="autoColor">
            {slides.length > 0 && (
              <div className="color-section">
                <Color id={slides[currentSlide].id} />
              </div>
            )}
          </div>
        </div>
        <div className="layout">
          {slides.length > 0 && (
            <React.Fragment>
              <div className="content1 centered">
                <img src={slides[currentSlide].logo} alt="Car Logo" />
              </div>
              <div className="content2 centered">
                <div className="icon-title-container">
                  <p className="title">Fuel:</p>
                  <span className="icon">
                    <MdWaterDrop />
                  </span>
                  <p className="content">{slides[currentSlide].fuel}</p>
                </div>
              </div>
              <div className="content3 centered">
                <div className="icon-title-container">
                  <p className="title">Consumption:</p>
                  <span className="icon">
                    <FaGasPump />
                  </span>
                  <p className="content">{slides[currentSlide].consumption}</p>
                </div>
              </div>
              <div className="content4 centered">
                <div className="icon-title-container">
                  <p className="title">Manufacture Year:</p>
                  <span className="icon">
                    <BsCalendar2Date />
                  </span>
                  <p className="content">{slides[currentSlide].manufactureYear}</p>
                </div>
              </div>
              <div className="content5 centered">
                <div className="icon-title-container">
                  <p className="title">Brand:</p>
                  <span className="icon">
                    <IoCarSport />
                  </span>
                  <p className="content">{slides[currentSlide].brand}</p>
                </div>
              </div>
              <div className="content6 centered">
                <div className="icon-title-container">
                  <p className="title">Model:</p>
                  <span className="icon">
                    <IoCarSport />
                  </span>
                  <p className="content">{slides[currentSlide].model}</p>
                </div>
              </div>
              <div className="content7 centered">
                <div className="icon-title-container">
                  <p className="title">Price:</p>
                  <span className="icon">
                    <GiMoneyStack />
                  </span>
                  <p className="content">{slides[currentSlide].price}€</p>
                </div>
              </div>
              <div className="content8 centered">
                <div className="icon-title-container">
                  <p className="title">Power:</p>
                  <span className="icon">
                    <SiGoogleearthengine />
                  </span>
                  <p className="content">{slides[currentSlide].power}</p>
                </div>
              </div>
              <div className="content9 centered">
                <div className="icon-title-container">
                  <p className="title">Transmission:</p>
                  <span className="icon">
                    <GiGearStickPattern />
                  </span>
                  <p className="content">{slides[currentSlide].transmission}</p>
                </div>
              </div>
              <div className="content10 centered">
                <div className="icon-title-container">
                  <p className="title">Drivetrain:</p>
                  <span className="icon">
                    <GiAbstract021 />
                  </span>
                  <p className="content">{slides[currentSlide].drivetrain}</p>
                </div>
              </div>
              <div className="content11 centered">
                <div className="icon-title-container">
                  <p className="title">Doors:</p>
                  <span className="icon">
                    <GiCarDoor />
                  </span>
                  <p className="content">{slides[currentSlide].doors}</p>
                </div>
              </div>
              <div className="content12 centered">
                <button onClick={prevSlide}>
                  <span className="left">
                    <RiArrowLeftSLine size="20" />
                  </span>
                </button>
                <button onClick={nextSlide}>
                  <span className="right">
                    <RiArrowRightSLine size="20" />
                  </span>
                </button>
              </div>
            </React.Fragment>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

export default MainPage;
