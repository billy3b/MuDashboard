import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import"./pages/overview.css";
import YearFilter from "./yearfilter";

export default function CardTemp(props){
    return(

    <Card className={props.classs} style={{backgroundColor: "rgb(235, 247, 250)", borderRadius: "13px" }}>
      <Card.Body>
        <div  style={{display:'flex', gap:'10px'}}>
          <Card.Title className="card-title">{props.title}</Card.Title>
          <YearFilter />
        </div>
        <Card.Text>
          {props.body}
        </Card.Text>
        {props.isGraph === "True"?
                <Card.Text>
                    Graph Placeholder
                </Card.Text>:
                <></>
            }
      </Card.Body>
    </Card>
  );
}