import React, { useEffect, useState } from 'react';
import "./main.css"
 
export default function MainPage(){
  return <div className='container'>
    <FetchDepartmentById/>
    <InsertDepartmentData/>
    <FetchDepartments/>
  </div>
};


function FetchDepartments(){
const [departments,setDepartments]=useState(null);

useEffect(()=>{
  fetch("http://localhost:8080/departments")
    .then(response=>response.json())
    .then(setDepartments)
},[])

return <div className='card'>
  <div>
    <h2>All Departments</h2>
    {departments!==null&&(
      <table className='DepartmentTable'>
        <thead>
          <tr>
            <th>Department Id</th>
            <th>Name</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((element)=>(
            <tr>
              <td>{element.id}</td>
              <td>{element.name}</td>
              <td>{element.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    {departments===null &&(
      <div className='placeholder'><div className='loader'></div></div>
    )}
  </div>
</div>
}

function FetchDepartmentById(){
  const [departmentId, setDepartmentId] = useState('');
  const [departmentDetails, setDepartmentDetails] = useState(null);
  const [departmentError, setDepartmentError] = useState(null);

  const handleInputChange = (event) => {
    setDepartmentId(event.target.value);
  };

  // Function to handle key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchDataFromServer();
    }
  };

  const fetchDataFromServer = () => {
    if(!departmentId){
      setDepartmentError("Provide an ID");
      setDepartmentDetails(null);
      return;
    }
    setDepartmentError(null);
    fetch(`http://localhost:8080/departments/${departmentId}`/*,{ mode: 'no-cors' }*/)
        .then(response=>response.json())
        .then(setDepartmentDetails);
  };

  const dummyData=()=>{
    setDepartmentDetails({id:"1",name:"Dummy",email:"Something@idk.com"})
  }

  return <div className='card'>
    <div>
      <h2 style={{textAlign:'center'}}>Fetch Department by Id </h2>
      <div>
        <label htmlFor="departmentId">Department ID:</label>
        <input className='text' type="text" id="departmentId" value={departmentId} onChange={handleInputChange} onKeyDown={handleKeyPress}/>
      </div>
      <button className='button-17' onClick={fetchDataFromServer}>Fetch Data</button>
      <button className='button-17' onClick={dummyData}>ShowDummyData</button>
      {departmentDetails!==null && (
        <div>
          <h3>Department Details</h3>
          <p>Id: {departmentDetails.id}</p>
          <p>Name: {departmentDetails.name}</p>
          <p>Email: {departmentDetails.email}</p>
        </div>
      )}
      {departmentDetails===null&&(
        <div style={{height:'155px'}}><p style={{color:"red"}}>{departmentError}</p></div>
      )}
    </div>
  </div>
}

function InsertDepartmentData(){
  // Define state variables for each input field
  const [departmentId, setDepartmentId] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [insertStatus, setInsertStatus] = useState(null);
  const [insertError, setInsertError] = useState(null);
  
  // Function to handle input changes for department ID
  const handleDepartmentIdChange = (event) => {
    setDepartmentId(event.target.value);
  };
  
  // Function to handle input changes for Name
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  
  // Function to handle input changes for Email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Function to clear all input fields
  const clearFields = () => {
    setDepartmentId('');
    setName('');
    setEmail('');
  };

  const addToDatabase = () => {
    if (!departmentId || !email || !name) {
      setInsertError("Fill all the fields");
      return; 
    }
    
    const data = {
      id: departmentId,
      email: email,
      name:name
    };

    // Send data to the backend server
    fetch('http://localhost:8080/departments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(()=>{
      setInsertStatus("Success")
      setInsertError(null)
      clearFields()
    })
    .catch(error => {
      setInsertStatus(null)
      setInsertError(error);
    });
  };

  return <div className='card'>
    <div>
      <h2 style={{textAlign:'center'}}>Insert Department into Database</h2>
      <div className='form'>
        <label htmlFor="departmentId">Department ID:</label>
        <input className='text' type="text" id="departmentId" value={departmentId} onChange={handleDepartmentIdChange}/>
      </div>
      <div className='form'>
        <label htmlFor="name">Name</label>
        <input className='text' type="text" id="name" value={name} onChange={handleNameChange}/>
      </div>
      <div className='form'>
        <label htmlFor="email">E-mail</label>
        <input className='text' type="text" id="email" value={email} onChange={handleEmailChange}/>
      </div>
      <button className='button-17' onClick={addToDatabase}>Add to Database</button>
      <button className='button-17' onClick={clearFields}>Clear fields</button><br/>
      {insertError && <span style={{color:"red",textAlign:"center"}}>{insertError}</span>}
      {insertStatus && <span style={{color:"green",textAlign:"center"}}>{insertStatus}</span>}
    </div>
  </div>
}