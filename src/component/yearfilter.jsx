import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./headtop.css";
export default function YearFilter({handleDropdownChange}) {
  const[year, setYear] = useState();
  function handleClick(yr){
    setYear(yr)
    handleDropdownChange(yr);
  }
  return (
    <Dropdown>
    <Dropdown.Toggle className="year-tog" id="dropdown-basic-button" >
      Year
      
      </Dropdown.Toggle>
      <Dropdown.Menu>
      <Dropdown.Item onClick={()=>(handleClick(2015))}>2015</Dropdown.Item>
      <Dropdown.Item onClick={()=>(handleClick(2016))} >2016</Dropdown.Item>
      <Dropdown.Item onClick={()=>(handleClick(2017))} >2017</Dropdown.Item>
      <Dropdown.Item onClick={()=>(handleClick(2018))} >2018</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}