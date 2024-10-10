import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function YearFilter({handleDropdownChange}) {
  const[year, setYear] = useState();
  function handleClick(yr){
    setYear(yr)
    handleDropdownChange(yr);
  }
  return (
    <DropdownButton className="year-tog" id="dropdown-basic-button" title="Year">
      <Dropdown.Item onClick={()=>(handleClick(2015))}>2015</Dropdown.Item>
      <Dropdown.Item onClick={()=>(handleClick(2016))} >2016</Dropdown.Item>
      <Dropdown.Item onClick={()=>(handleClick(2017))} >2017</Dropdown.Item>
      <Dropdown.Item onClick={()=>(handleClick(2018))} >2018</Dropdown.Item>
    </DropdownButton>
  );
}