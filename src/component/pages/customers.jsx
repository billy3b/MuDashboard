import React, {useState, useEffect,useRef } from "react";
import CardTemp from "../cardtemp";
import YearFilter from "../yearfilter";
import "./customers.css";
import csjson from "../../assets/customer.json"
import ReturningCustomer from "../returncustomer";
import CustomerRetention from "../retention";
import axios from "axios";
 import customers from "../../assets/customers.json";
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
    const [proConArrow, setProConArrow] = useState();
    const [proCorpArrow, setProCorpArrow] = useState();
    const[proHomeArrow, setProHomeArrow] = useState();
    const [promarConArrow, setPromarConArrow] = useState();
    const [promarCorpArrow, setPromarCorpArrow] = useState();
    const [promarHomeArrow, setPromarHomeArrow] = useState();
    const handleDropdownChange = (value) => {
        setYear(value);
      };
   useEffect(() => {
    const data = async () => {
      try{
          const res = await axios.get(`/api/cust/2015`);
          // console.log("response",res);
          const fd= res.data[0];
          console.log("first res", fd)
          setprofitCons(fd.ProfitConsumer)
        setprofitHome(fd.ProfitHome)
        setprofitCorp(fd.ProfitCorporate)
        setprofitMCons(fd.ProfitMarginConsumer)
        setprofitMHome(fd.ProfitMarginHome)
        setprofitMCorp(fd.ProfitMarginCorp)
        
        const fdd = customers.filter((item) => {
          return item.Year ==="2015";
        });
        let plzz = fdd[0]
        console.log("please",fdd)
        
            setProConArrow(plzz.ProfitConsumer);
          setProCorpArrow(plzz.ProfitCorporate);
          setProHomeArrow(plzz.ProfitHome);
          setPromarConArrow(plzz.ProfitMarginConsumer);
          setPromarCorpArrow(plzz.ProfitMarginCorp);
          setPromarHomeArrow(plzz.ProfitMarginHome);


          // setSales(fd.Sales)
          // setProfit(fd.Profit)
          // setAov(fd.AOV)
      }catch(err){
          console.log(err);
      }
  }
  data()
  console.log("arroooo",proConArrow)
    //  const fd = csjson.filter((item) => {
    //      return item.Year ==="2015";
    //    });
    //    let plz = fd[0]
    //    console.log("please",plz.ProfitConsumer)
    //    setprofitCons(plz.ProfitConsumer)
    //    setprofitHome(plz.ProfitHome)
    //    setprofitCorp(plz.ProfitCorporate)
    //    setprofitMCons(plz.ProfitMarginConsumer)
    //    setprofitMHome(plz.ProfitMarginHome)
    //    setprofitMCorp(plz.ProfitMarginCorp)
   },[])
      useEffect(() => {

        if (hasMounted.current) {
          const data = async () => {
              try{
                  const res = await axios.get(`/api/cust/${year}`);
                  // console.log("response",res);
                  const fd= res.data[0];
                  setprofitCons(fd.ProConsumer);
                  setprofitCorp(fd.ProCorp);
                  setprofitHome(fd.ProHome);
                  setprofitMCons(fd.ProMargConsumer);
                  setprofitMCorp(fd.ProMargCorp);
                  setprofitMHome(fd.ProMargHome);
                 
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
          const fdd = customers.filter(item => item.Year === year.toString());
          let plzz = fdd[0]
          console.log("please",fdd)
          
          setProConArrow(plzz.ProfitConsumer);
            setProCorpArrow(plzz.ProfitCorporate);
            setProHomeArrow(plzz.ProfitHome);
            setPromarConArrow(plzz.ProfitMarginConsumer);
            setPromarCorpArrow(plzz.ProfitMarginCorp);
            setPromarHomeArrow(plzz.ProfitMarginHome);

        } else {
          hasMounted.current = true;
      }
          
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
    useEffect(()=>{
      console.log(profitHome)
    },[filteredData])
    return(
        <>
        
        <div className="customer">
        <YearFilter handleDropdownChange={handleDropdownChange} className="year-cust"/>
            <div className="cards-row">
                <CardTemp isArrow="True" arrow = {proConArrow}  classs="pro-con" className="card-t" body="Profit Consumer" title={profitCons} isGraph ="False"/>
                <CardTemp isArrow="True" arrow = {proCorpArrow}  classs="pro-corp" className="card-t" body="Profit Corporate" title={profitCorp} isGraph ="False"/>
                <CardTemp isArrow="True" arrow = {proHomeArrow}  classs="pro-hom" className="card-t" body="Profit Home Office" title={profitHome} isGraph ="False"/>
                <CardTemp isArrow="True" arrow = {promarConArrow}  classs="mar-con" className="card-t" body="Profit Margin Consumer" title={profitMCons} isGraph ="False"/>
                <CardTemp isArrow="True" arrow = {promarCorpArrow}  classs="mar-corp" className="card-t" body="Profit Margin Corporate" title={profitMCorp} isGraph ="False"/>
                <CardTemp isArrow="True" arrow = {promarHomeArrow}  classs="mar-hom" className="card-t" body="Profit Margin Home Office" title={profitMHome} isGraph ="False"/>
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