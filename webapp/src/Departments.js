import React, { useEffect, useState } from 'react';
import "./main.css"

const apiUrl = process.env.REACT_APP_API_URL


export function FetchDepartments({ onReload, reloadDepartments }) {
  const [departments, setDepartments] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState('');

  useEffect(() => {
    fetch(`${apiUrl}/departments`)
      .then(response => response.json())
      .then(data => {
        setDepartments(null)
        setTimeout(() => {
          setDepartments(data)
        }, 250)
      })
  }, [reloadDepartments])

  const setId = (id) => {
    setSelectedId(id);
    console.log(id);
  };

  const deleteDepartment = () => {
    fetch(`${apiUrl}/departments/${selectedId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      if (response.json() === true)
        setDeleteStatus("Success")
      onReload()
    })
  };

  return <div className='card'>
    <div>
      <h2>All Departments</h2>
      {departments !== null && (<>
        <table className='table'>
          <thead>
            <tr>
              <th>Department Id</th>
              <th>Name</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((element) => (
              <tr key={element.id} onClick={() => setId(element.id)}>
                <td>{element.id}</td>
                <td>{element.name}</td>
                <td>{element.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <span>{deleteStatus}</span>
        <button className='button-17' style={{ float: 'right' }} disabled={!selectedId} onClick={deleteDepartment}>Delete Department</button>
      </>
      )}
      {departments === null && (
        <div className='placeholder'><div className='loader'></div></div>
      )}
    </div>
  </div>
}

export function FetchDepartmentById() {
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
    if (!departmentId) {
      setDepartmentError("Provide an ID");
      setDepartmentDetails(null);
      return;
    }
    setDepartmentError(null);
    fetch(`${apiUrl}/departments/${departmentId}`/*,{ mode: 'no-cors' }*/)
      .then(response => response.json())
      .then(setDepartmentDetails);
  };

  const dummyData = () => {
    setDepartmentDetails({ id: "1", name: "Dummy", email: "Something@idk.com" })
  }

  return <div className='card'>
    <div>
      <h2 style={{ textAlign: 'center' }}>Fetch Department by Id </h2>
      <div>
        <label htmlFor="departmentId">Department ID:</label>
        <input className='text' type="text" id="departmentId" value={departmentId} onChange={handleInputChange} onKeyDown={handleKeyPress} />
      </div>
      <button className='button-17' onClick={fetchDataFromServer}>Fetch Data</button>
      <button className='button-17' onClick={dummyData}>ShowDummyData</button>
      {departmentDetails !== null && (
        <div>
          <h3>Department Details</h3>
          <p>Id: {departmentDetails.id}</p>
          <p>Name: {departmentDetails.name}</p>
          <p>Email: {departmentDetails.email}</p>
        </div>
      )}
      {departmentDetails === null && (
        <div style={{ height: '155px' }}><p style={{ color: "red" }}>{departmentError}</p></div>
      )}
    </div>
  </div>
}

export function InsertDepartmentData({ onReload }) {
  const [departmentId, setDepartmentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [insertStatus, setInsertStatus] = useState(null);
  const [insertError, setInsertError] = useState(null);

  const handleDepartmentIdChange = (event) => {
    setDepartmentId(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

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
      name: name
    };

    // Send data to the backend server
    fetch(`${apiUrl}/departments`, {
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
      .then(() => {
        setInsertStatus("Success")
        setInsertError(null)
        clearFields()
        onReload()
      })
      .catch(error => {
        setInsertStatus(null)
        setInsertError(error.toString());
      });
  };

  return <div className='card'>
    <div>
      <h2 style={{ textAlign: 'center' }}>Insert Department into Database</h2>
      <div className='form'>
        <label htmlFor="departmentId">Department ID:</label>
        <input className='text' type="text" id="departmentId" value={departmentId} onChange={handleDepartmentIdChange} />
      </div>
      <div className='form'>
        <label htmlFor="name">Name</label>
        <input className='text' type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
      <div className='form'>
        <label htmlFor="email">E-mail</label>
        <input className='text' type="text" id="email" value={email} onChange={handleEmailChange} />
      </div>
      <button className='button-17' onClick={addToDatabase}>Add to Database</button>
      <button className='button-17' onClick={clearFields}>Clear fields</button><br />
      {insertError && <span style={{ color: "red", textAlign: "center" }}>{insertError}</span>}
      {insertStatus && <span style={{ color: "green", textAlign: "center" }}>{insertStatus}</span>}
    </div>
  </div>
}