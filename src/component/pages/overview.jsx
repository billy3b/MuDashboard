import React from "react";
import "./overview.css";
import CardTemp from "../cardtemp";

export default function Overview(){
    return(
        <div className="over">
            <div className="dashboard">
            <div className="cards-row">
                <CardTemp classs="tot-sales" className="card-tt" title="Total Sales" body="$480K" isGraph ="False"/>
                <CardTemp classs="tot-profit" className="card-tt" title="Total Profit" body="$48.8K" isGraph ="False"/>
                <CardTemp classs="aov" className="card-tt" title="AOV" body="$64.6" isGraph ="False"/>
                <div className="big-crds">
                    <CardTemp classs="new-rep" className="card-tt" title="New vs Repeat Customers" body="New: 30%, Repeat: 70%" isGraph ="True"/>
                    <CardTemp classs="pro-loss" className="card-tt" title="Profit vs Loss" body="Profit: 72%, Loss: 28%" isGraph ="True"/>
                </div>
                <div className="right-crds">
                    <CardTemp classs="seg-sal" className="card-tt" title="Segment-wise Sales" body="Consumer: 55%, Corporate: 27%, Home Office: 18%" isGraph ="True"/>
                    <CardTemp classs="cat-sal" className="card-tt" title="Category-wise Sales" body="Technology: 36%, Furniture: 33%, Office Supplies: 31%" isGraph ="True"/>
                </div>
            </div>
            </div>
        </div>
    )
}