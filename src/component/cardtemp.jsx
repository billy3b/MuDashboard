import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import"./pages/overview.css";
export default function CardTemp(props){
    return(

    <Card className={props.classs} style={{ width: '18rem', backgroundColor: "rgb(235, 247, 250)", borderRadius: "13px" }}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
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