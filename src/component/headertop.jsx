import React from "react";
import logo from "../assets/mu-sigma-logo-1.png";
import "./headtop.css";
import Dropdown from 'react-bootstrap/Dropdown';
// import { Link } from "reactstrap";
export default function HeaderTop(){
    return(
        <div className="htop">
            <img className="logo" src={logo} alt="logo-img"/>
            <h1 className="htop-h1">Superstore Sales Analysis</h1>
            <div className="left-filter">
                <Dropdown>
                    <Dropdown.Toggle className="tog"  id="dropdown-basic">
                        Views
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item tag="a" href="/">Overview</Dropdown.Item>
                        <Dropdown.Item tag="a" href="/customer">Customer</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}