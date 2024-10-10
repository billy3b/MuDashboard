import React, { useEffect, useState } from "react";
import "./overview.css";
import CardTemp from "../cardtemp";
import YearFilter from "../yearfilter";
import dataJson from "../../assets/jsonformatter.json";
export default function Overview(){
    console.log(dataJson)
    const [year, setYear] = useState(2015);
    const[sales, setSales] = useState();
    const[profit, setProfit] = useState();
    const[aov, setAov] = useState();
    const [filteredData, setFilteredDate] = useState();
    const handleDropdownChange = (value) => {
        setYear(value);
      };
      useEffect(() => {
        const fd = dataJson.filter((item) => {
            
            return item.Year === year.toString();
          });
          setFilteredDate(fd);
      },[year])
      useEffect(() => {
        
        setSales(filteredData[0].Sales)
        setProfit(filteredData[0].Profit)
        setAov(filteredData[0].AOV)
      },[filteredData])
    return(
        <>
        <YearFilter handleDropdownChange={handleDropdownChange} className="year-top"/>
        <div className="over">
            
            <div className="cards-row">
                <CardTemp classs="tot-sales" className="card-tt" title="Total Sales" body={sales} isGraph ="False"/>
                <CardTemp classs="tot-profit" className="card-tt" title="Total Profit" body={profit} isGraph ="False"/>
                <CardTemp classs="aov" className="card-tt" title="AOV" body={aov} isGraph ="False"/>
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
        </>
    )
}