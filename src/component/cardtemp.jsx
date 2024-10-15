import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import"./pages/overview.css";


export default function CardTemp(props){
    return(

    <Card className={props.classs} style={{backgroundColor: "rgb(235, 247, 250)", borderRadius: "13px" }}>
      <Card.Body>
        <div  style={{display:'flex', gap:'10px'}}>
          <Card.Title className="card-title">{props.title}</Card.Title>
          
        </div>
        <Card.Text>
          {props.body}
        </Card.Text>
        {props.isGraph === "True" && props.children ? (
            <div>
                {props.children}
            </div>
            ) : null}
      </Card.Body>
    </Card>
  );
}