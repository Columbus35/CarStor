import React, { useState } from 'react';
import { IoLogoModelS } from "react-icons/io";
import { PiDribbbleLogoFill } from "react-icons/pi";
import { GiPaintRoller } from "react-icons/gi";
import { Link } from 'react-router-dom';
import "./addNavbar.css";

const NavBar = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleActiveLink = (index) => {
        setActiveIndex(index);
    };

    const handleMouseMove = (e) => {
        const x = e.pageX - e.target.offsetLeft;
        const y = e.pageY - e.target.offsetTop;
        e.target.style.setProperty('--x', x + 'px');
        e.target.style.setProperty('--y', y + 'px');
    };

    return (
        <div className='addBodyNav'>
            <nav className="addNavigation">
                <ul>
                    {[
                        { name: 'Add Brand', icon: <PiDribbbleLogoFill size="20"/>, path: '/add-cars/brand', color: "rgb(54, 134, 227)" },
                        { name: 'Add Model', icon: <IoLogoModelS size="20"/>, path: '/add-cars/model', color: "rgb(58, 223, 168)" },
                        { name: 'Add Color', icon: <GiPaintRoller size="20"/>, path: '/add-cars/color', color: "rgb(240, 252, 16)" },
                    ].map((item, index) => (
                        <li
                            key={index}
                            className={`list ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => handleActiveLink(index)}
                        >   
                            <Link 
                                to={item.path} 
                                onMouseMove={handleMouseMove}
                                style={{ '--clr': item.color }}
                            >
                                <span className="addNavText">
                                    {item.name}
                                </span>
                                <span className="addNavText">{item.icon}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
