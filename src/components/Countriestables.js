import React, { useEffect, useState }   from 'react'
import DataTable from 'react-data-table-component'
import axios from "axios";

function Countriestables() {
    const [search ,setSearch] = useState("");
    const [countries ,setCountries] = useState([]);
    const [filterCountries , setFilterCountries ] = useState([]);
const getCountries = async()=>{
  try {
    const response= await axios.get('https://api.postman.com/collections/24582109-37d97559-22b0-42e0-b592-7fd8b90b8e01?access_key=PMAT-01GXAEX88FNRZN45AWACQ2V20F');
    setCountries(response.data.collection.item);
    setFilterCountries(response.data.collection.item);
    
  } catch (error) {
    console.log(error);
  }
}

const columns =[
  {
    name:"country Name" ,
    selector:row=>row.name,
    sortable:true ,
  },
  {
    name:"country Native  Name" ,
    selector:row=>row.id,
  },
  
  {
    name:"edit",
    cell:(row)=> <button type="button" class="btn btn-outline-primary" onClick={()=>alert(row.alpha2code)}>Edit</button>
  },
  {
    name:"Action",
    cell:(row)=> <button type="button" class="btn btn-outline-danger" onClick={()=>alert(row.alpha2code)}>delete</button>
  },
];
useEffect(()=>{
    getCountries();
  },[]);
  
useEffect(()=>{
    const result=countries.filter((country) =>{
        return country.name.toLocaleLowerCase().match(search.toLocaleLowerCase());
    });
    setFilterCountries(result);

} ,[search]);


  return (
    <div>
      <DataTable title="Countet-list " 
      columns={columns} 
      data={filterCountries} 
      pagination 
      fixedHeader 
      fixedHeaderScrollHeight='450px'
      selectableRowsHighlight
      highlightOnHover
      subHeader
      subHeaderComponent={
        <input type="text " placeholder='Search here ' className="w-25 form.control"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        ></input>
      }
      subHeaderAlign="center"
      ></DataTable>
    
    </div>
  )
}

export default Countriestables
