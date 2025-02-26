import React, { useState } from 'react';
import { FaHome, FaCar, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "./navbar.css";

const NavBar = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleActiveLink = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className='bodyNav'>
        <nav className="navigation">
            <ul>
                {[
                    { name: 'Home', icon: <FaHome />, path: '/home' },
                    { name: 'Magazin', icon: <FaCar />, path: '/magazin' },
                    { name: 'Add-masini', icon: <FaPlus />, path: '/add-masini' },
                ].map((item, index) => (
                    <li
                        key={index}
                        className={`list ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => handleActiveLink(index)}
                    >
                        <Link to={item.path}>
                            <span className="navIcon">
                                {item.icon}
                            </span>
                            <span className="navText">{item.name}</span>
                        </Link>
                    </li>
                ))}
                <div className="navIndicator"></div>
            </ul>
        </nav>
        </div>
    );
};

export default NavBar;
