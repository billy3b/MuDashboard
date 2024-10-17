import React, {useState, useEffect,useRef } from "react";
import CardTemp from "../cardtemp";
import YearFilter from "../yearfilter";
import "./customers.css";
import csjson from "../../assets/customer.json"
import ReturningCustomer from "../returncustomer";
import CustomerRetention from "../retention";

export default function Customer(){
    const [year, setYear] = useState(2015);
    const[profitCons, setprofitCons] = useState();
    const[profitHome, setprofitHome] = useState();
    const[profitCorp, setprofitCorp] = useState();
    const[profitMCons, setprofitMCons] = useState();
    const[profitMHome, setprofitMHome] = useState();
    const[profitMCorp, setprofitMCorp] = useState();
    const [filteredData, setFilteredDate] = useState();
    const hasMounted = useRef(false); // Ref to track first render
    const hadMounted = useRef(false);

    const handleDropdownChange = (value) => {
        setYear(value);
      };
   useEffect(() => {
     const fd = csjson.filter((item) => {
         return item.Year ==="2015";
       });
       let plz = fd[0]
       console.log("please",plz.ProfitConsumer)
       setprofitCons(plz.ProfitConsumer)
       setprofitHome(plz.ProfitHome)
       setprofitCorp(plz.ProfitCorporate)
       setprofitMCons(plz.ProfitMarginConsumer)
       setprofitMHome(plz.ProfitMarginHome)
       setprofitMCorp(plz.ProfitMarginCorp)
   },[])
      useEffect(() => {

        if (hasMounted.current) {
            const filtered = csjson.filter(item => item.Year === year.toString());
            console.log("filll",filtered)
            setFilteredDate(filtered)
            setprofitCons(filtered[0].ProfitConsumer)
            setprofitHome(filtered[0].ProfitHome)
            setprofitCorp(filtered[0].ProfitCorporate)
            setprofitMCons(filtered[0].ProfitMarginConsumer)
            setprofitMHome(filtered[0].ProfitMarginHome)
            setprofitMCorp(filtered[0].ProfitMarginCorp)

          } else {
            hasMounted.current = true; // Set to true after the first render
        }

        // const fd = dataJson.filter((item) => {
     
        //     return item.Year === year.toString();
        //   });
        //   setFilteredDate(fd);
          
      },[year])
    //   useEffect(() => {
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
        
        <div className="customer">
        <YearFilter handleDropdownChange={handleDropdownChange} className="year-cust"/>
            <div className="cards-row">
                <CardTemp classs="pro-con" className="card-t" body="Profit Consumer" title={profitCons} isGraph ="False"/>
                <CardTemp classs="pro-corp" className="card-t" body="Profit Corporate" title={profitCorp} isGraph ="False"/>
                <CardTemp classs="pro-hom" className="card-t" body="Profit Home Office" title={profitHome} isGraph ="False"/>
                <CardTemp classs="mar-con" className="card-t" body="Profit Margin Consumer" title={profitMCons} isGraph ="False"/>
                <CardTemp classs="mar-corp" className="card-t" body="Profit Margin Corporate" title={profitMCorp} isGraph ="False"/>
                <CardTemp classs="mar-hom" className="card-t" body="Profit Margin Home Office" title={profitMHome} isGraph ="False"/>
            </div>
            <div className="charts-container">
                <CardTemp classs="ret-cust" className="card-t" title="No. of Returning Customers" isGraph ="True">
                  <ReturningCustomer year={year}/>  
                </CardTemp >
                <CardTemp classs = "ret-rate" className="card-t" title="Customer Retention Rate" isGraph ="True">
                    <CustomerRetention year={year}/>
                </CardTemp>  
            </div>

            
        </div>
        </>
    )
}