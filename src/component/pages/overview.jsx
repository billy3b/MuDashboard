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
import ProfitLossChart from "../profitloss";
import NewRepeatCustomer from "../NewRepeatCustomer";
import overview from "../../assets/overview.json";
export default function Overview(){
    //console.log(dataJson)
    const [year, setYear] = useState(2015);
    const[sales, setSales] = useState();
    const[profit, setProfit] = useState();
    const[aov, setAov] = useState();
    const [filteredData, setFilteredDate] = useState();
    const hasMounted = useRef(false); // Ref to track first render
    const hadMounted = useRef(false);
    const [salesArrow, setSalesArrow] = useState();
    const [profitArrow, setProfitArrow] = useState();
    const [aovArrow, setAovArrow] = useState();
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
        const fd = overview.filter((item) => {
          return item.Year ==="2015";
        });
        let plz = fd[0]
        console.log("please",plz.Sales)
        setSalesArrow(plz.Sales)
        setProfitArrow(plz.Profit)
        setAovArrow(plz.AOV)
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
            const filtered = overview.filter(item => item.Year === year.toString());
            console.log("arrow",filtered)
             
             setSalesArrow(filtered[0].Sales)
             setProfitArrow(filtered[0].Profit)
             setAovArrow(filtered[0].AOV)

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
        
        <div className="over">
            <div className="but">
        <YearFilter handleDropdownChange={handleDropdownChange} className="year-top"/>
               </div>
                {/* Header Cards */}
                <div className="cards-row">
                    <CardTemp isArrow="True" arrow = {salesArrow} classs="tot-sales" className="card-tt" body="Total Sales" title={sales} a isGraph="False" />
                    <CardTemp isArrow="True" arrow = {profitArrow} classs="tot-profit" className="card-tt" body="Total Profit" title={profit} isGraph="False" />
                    <CardTemp isArrow="True" arrow = {aovArrow}  classs="aov" className="card-tt" body="AOV" title={aov} isGraph="False" />
                    {/* Segment-wise Sales and Category-wise Sales */}
                
                </div>
                <div className="big-crds">
                    <CardTemp classs="new-rep" title="New vs Repeat Customers" isGraph="True">
                        <NewRepeatCustomer classs = "pie" year={year} />
                    </CardTemp>
                    <CardTemp classs="pro-loss" title="Profit vs Loss" isGraph="True" >
                        <ProfitLossChart year={year} />
                    </CardTemp>
                </div>
                {/* Month-on-month Sales Chart */}
                <CardTemp classs="month-sales-chart" title="Month-on-month Sales" isGraph="True">
                    <MonthlySalesChart year={year} />
                </CardTemp>
                
                {/* Footfall per Month */}
                <CardTemp classs="footfall-chart" title="Footfall per month" isGraph="True">
                    <FootfallChart year={year} />
                </CardTemp>


                
                
                
                    <CardTemp classs="seg-sal" title="Segment-wise Sales" isGraph="True">
                        <SegmentWiseSales year={year} />
                    </CardTemp>
                    <CardTemp classs="cat-sal" title="Category-wise Sales" isGraph="True">
                        <CategorySales year={year} />
                    </CardTemp>
                    <CardTemp classs="top-prod" title="Top Selling Products" isGraph="True">
                        <TopSellingProd year={year} />
                    </CardTemp>
                
            </div>
        </>
    )
}