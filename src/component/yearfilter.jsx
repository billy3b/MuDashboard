import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function yearFilter() {
  return (
    <DropdownButton className="year-tog" id="dropdown-basic-button" title="Year">
      <Dropdown.Item href="#/action-1">2015</Dropdown.Item>
      <Dropdown.Item href="#/action-2">2016</Dropdown.Item>
      <Dropdown.Item href="#/action-3">2017</Dropdown.Item>
      <Dropdown.Item href="#/action-3">2018</Dropdown.Item>
    </DropdownButton>
  );
}