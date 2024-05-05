import React, { useEffect, useState } from 'react';
import "./main.css"
 
export default function MainPage(){
  return <div className='container'>
    <FetchMemberById/>
    <InsertMemberData/>
    <FetchMembers/>
  </div>
};


function FetchMembers(){
const [members,setMembers]=useState(null);

useEffect(()=>{
  fetch("http://localhost:8080/members")
    .then(response=>response.json())
    .then(setMembers)
},[])

return <div className='card'>
  <div>
    <h2>All Members</h2>
    {members!==null&&(
      <table className='memberTable'>
        <thead>
          <tr>
            <th>Member Id</th>
            <th>Name</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {members.map((element)=>(
            <tr>
              <td>{element.id}</td>
              <td>{element.name}</td>
              <td>{element.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    {members===null &&(
      <div className='placeholder'><div className='loader'></div></div>
    )}
  </div>
</div>
}

function FetchMemberById(){
  const [memberId, setMemberId] = useState('');
  const [memberDetails, setMemberDetails] = useState(null);
  const [memberError, setMemberError] = useState(null);

  const handleInputChange = (event) => {
    setMemberId(event.target.value);
  };

  // Function to handle key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchDataFromServer();
    }
  };

  const fetchDataFromServer = () => {
    if(!memberId){
      setMemberError("Provide an ID");
      setMemberDetails(null);
      return;
    }
    setMemberError(null);
    fetch(`http://localhost:8080/members/${memberId}`/*,{ mode: 'no-cors' }*/)
        .then(response=>response.json())
        .then(setMemberDetails);
  };

  const dummyData=()=>{
    setMemberDetails({id:"1",name:"Dummy",email:"Something@idk.com"})
  }

  return <div className='card'>
    <div>
      <h2 style={{textAlign:'center'}}>Fetch Member by Id </h2>
      <div>
        <label htmlFor="memberId">Member ID:</label>
        <input className='text' type="text" id="memberId" value={memberId} onChange={handleInputChange} onKeyDown={handleKeyPress}/>
      </div>
      <button className='button-17' onClick={fetchDataFromServer}>Fetch Data</button>
      <button className='button-17' onClick={dummyData}>ShowDummyData</button>
      {memberDetails!==null && (
        <div>
          <h3>Member Details</h3>
          <p>Id: {memberDetails.id}</p>
          <p>Name: {memberDetails.name}</p>
          <p>Email: {memberDetails.email}</p>
        </div>
      )}
      {memberDetails===null&&(
        <div style={{height:'155px'}}><p style={{color:"red"}}>{memberError}</p></div>
      )}
    </div>
  </div>
}

function InsertMemberData(){
  // Define state variables for each input field
  const [memberId, setMemberId] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [insertStatus, setInsertStatus] = useState(null);
  const [insertError, setInsertError] = useState(null);
  
  // Function to handle input changes for Member ID
  const handleMemberIdChange = (event) => {
    setMemberId(event.target.value);
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
    setMemberId('');
    setName('');
    setEmail('');
  };

  const addToDatabase = () => {
    if (!memberId || !email || !name) {
      setInsertError("Fill all the fields");
      return; 
    }
    
    const data = {
      id: memberId,
      email: email,
      name:name
    };

    // Send data to the backend server
    fetch('http://localhost:8080/members', {
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
      <h2 style={{textAlign:'center'}}>Insert member into Database</h2>
      <div className='form'>
        <label htmlFor="memberId">Member ID:</label>
        <input className='text' type="text" id="memberId" value={memberId} onChange={handleMemberIdChange}/>
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