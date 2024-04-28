import  { useEffect, useState,useRef } from 'react'
import axios from "axios"
import './regitserdetails.css'
import {useReactToPrint} from "react-to-print";

function StudentDetails(){
    const componentPDF=useRef();
    const [showdiscounts,setshowdiscounts]=useState([]);
    const [searchkey,setsearchkey]=useState('');

//read
const getfetchdata=async()=>{
    try{
    const data=await axios.get("http://localhost:8020/_user")
    console.log(data.data.success)
    if(data.data.success){
        setshowdiscounts(data.data.data)
    }
}catch(err){
    alert(err)
}
}
useEffect(()=>{
    getfetchdata()   
},[])

//delete
const handledelete= async(id)=>{
    const data=await axios.delete("http://localhost:8020/delete_user/"+id)
    if(data.data.success){
        getfetchdata()
        console.log(data.data.message)
        alert("deleted Successfully!")
    }
}
//generatePDF
const generatePDF=useReactToPrint({
    content:()=>componentPDF.current,
    documentTitle:"show services ",
    onAfterPrint:()=>alert("data save in pdf")
})
//search
const handlesearch = (e) => {

    filterdata(searchkey);
}
const filterdata = (searchKey) => {
    const filteredData = showdiscounts.filter(customer =>
        customer && customer.fname &&customer.fname.toLowerCase().includes(searchKey.toLowerCase())
    );
    setshowdiscounts(filteredData);
}

    return(
        <div className="showorders">
             <div className='searchbtn'>
        <input  type="search" onChange={(e)=>setsearchkey(e.target.value)} placeholder='search' className='in'/> <t></t> 
       
        <button  id='search-btn'  onClick={(e)=>handlesearch(e)}> search </button>
        </div>   
                <div ref={componentPDF} style={{width:'100%'}}>
 <table>
              
              
 <tr>
              <th>Full Name</th>
              <th>Student Email </th>
              <th>Registration Number</th>
              <th>Message</th>
              <th>Action</th>
              </tr>
     
       

              <tbody>
                  { 
                     showdiscounts.map((e1)=>{
                      return(
                          <tr> 
                            <td> {e1.fname}</td> 
                            <td> {e1.s_email}</td> 
                            <td> {e1.regno}</td> 
                            <td> {e1.message}</td> 
                            
                         
                           
                            <td>
                              <a href={`/updateuser/${e1._id}`}>Edit Details</a>
                              <button onClick={()=>handledelete(e1._id)}>Delete Details</button>
                            </td>
                          </tr>
                      )

              })
                  }
              </tbody>
  </table>
  </div>
  <button onClick={generatePDF}>Download Report</button>
        </div>
    )
}
export default StudentDetails;