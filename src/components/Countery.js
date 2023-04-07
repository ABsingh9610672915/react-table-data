import React , { useState ,useEffect } from 'react'
import DataTable from 'react-data-table-component'
import axios from "react-axios";

function Counter() {
    const [ countries ,Setcountries ]=useState([]);
    const getcounter = async ()=>{
      try {
        const res = await axios.get('https://restcountries.com/v2/all');
        Setcountries(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    const columns=[
      {
        name:"country name" ,
        selector:(row)=>row.name,
      },
      {
        name:"country Native name" ,
        selector:(row)=>row.name,
      },
      {
        name:"country capital" ,
        selector:(row)=>row.name,
      },
      {
        name:"country flag" ,
        selector:(row)=><img width={50} height={50} src={row.flag}></img>,
      },
    ]
    useEffect(()=>{
      getcounter();
    } ,[]) 
  return (
  
    <div>
      
      <DataTable columns={columns} data={countries}></DataTable>
    </div>
  )
}

export default Counter
