import React, { useEffect, useState, useRef } from "react";
import "./overview.css";
import CardTemp from "../cardtemp";
import YearFilter from "../yearfilter";
import dataJson from "../../assets/jsonformatter.json";
import axios from "axios";
import MonthlySalesChart from "../monthlysales";
import SegmentWiseSales from "../segmentsales";
import CategorySales from "../categorysales";
import TopSellingProd from "../topproducts";
import FootfallChart from "../footfall";

export default function Overview(){
    //console.log(dataJson)
    const [year, setYear] = useState(2015);
    const[sales, setSales] = useState();
    const[profit, setProfit] = useState();
    const[aov, setAov] = useState();
    const [filteredData, setFilteredDate] = useState();
    const hasMounted = useRef(false); // Ref to track first render
    const hadMounted = useRef(false);
    const handleDropdownChange = (value) => {
        setYear(value);
      };

    useEffect(() => {
        const data = async () => {
            try{
                const res = await axios.get(`/api/overs/2015`);
                // console.log("response",res);
                const fd= res.data[0];
                console.log("first res", fd)
                setSales(fd.Sales)
                setProfit(fd.Profit)
                setAov(fd.AOV)
            }catch(err){
                console.log(err);
            }
        }
        data()
        //console.log("dat", data)
    },[])
//    useEffect(() => {
//      const fd = dataJson.filter((item) => {
//          return item.Year ==="2015";
//        });
//        let plz = fd[0]
//        console.log("please",plz.Sales)
//        setSales(plz.Sales)
//        setProfit(plz.Profit)
//        setAov(plz.AOV)
//    },[])
      useEffect(() => {

        if (hasMounted.current) {
            const data = async () => {
                try{
                    const res = await axios.get(`/api/overs/${year}`);
                    // console.log("response",res);
                    const fd= res.data[0];
                    console.log("backend", fd)
                    setSales(fd.Sales)
                    setProfit(fd.Profit)
                    setAov(fd.AOV)
                }catch(err){
                    console.log(err);
                }
            }
            data()
            // const filtered = dataJson.filter(item => item.Year === year.toString());
            //console.log("filll",data)
            // setFilteredDate(filtered)
            // setSales(filtered[0].Sales)
            // setProfit(filtered[0].Profit)
            // setAov(filtered[0].AOV)

          } else {
            hasMounted.current = true;
        }

          
      },[year])
//     //   useEffect(() => {
    //     if(hadMounted.current){
    //         console.log("dwdwd",filteredData)
    //         setSales(filteredData[0].Sales)
    //         setProfit(filteredData[0].Profit)
    //         setAov(filteredData[0].AOV)
    //     }else{
    //         hadMounted.current=true;
    //     }
        
    //   },[filteredData])
    return(
        <>
        <YearFilter handleDropdownChange={handleDropdownChange} className="year-top"/>
        <div className="over">
                {/* Header Cards */}
                <div className="cards-row">
                    <CardTemp classs="tot-sales" className="card-tt" title="Total Sales" body="$480k" isGraph="False" />
                    <CardTemp classs="tot-profit" className="card-tt" title="Total Profit" body="$48.8k" isGraph="False" />
                    <CardTemp classs="aov" className="card-tt" title="AOV" body="$64.6" isGraph="False" />
                </div>

                {/* Month-on-month Sales Chart */}
                <CardTemp classs="month-sales-chart" title="Month-on-month Sales" isGraph="True">
                    <MonthlySalesChart year={year} />
                </CardTemp>

                {/* Top Selling Products */}
                <CardTemp title="Top Selling Products" isGraph="True">
                    <TopSellingProd year={year} />
                </CardTemp>

                {/* New vs Repeat Customers and Profit vs Loss */}
                <div className="big-crds">
                    <CardTemp classs="new-rep" title="New vs Repeat Customers" isGraph="True" />
                    <CardTemp classs="pro-loss" title="Profit vs Loss" isGraph="True" />
                </div>

                {/* Footfall per Month */}
                <CardTemp title="Footfall per month" isGraph="True">
                    <FootfallChart year={year} />
                </CardTemp>

                {/* Segment-wise Sales and Category-wise Sales */}
                <div className="right-crds">
                    <CardTemp classs="seg-sal" title="Segment-wise Sales" isGraph="True">
                        <SegmentWiseSales year={year} />
                    </CardTemp>
                    <CardTemp classs="cat-sal" title="Category-wise Sales" isGraph="True">
                        <CategorySales year={year} />
                    </CardTemp>
                </div>
            </div>
        </>
    )
}