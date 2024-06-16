import { useEffect, useState } from "react"
import "./main.css"

export function AddStories() {
    const [storyId, setStoryId] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [insertStatus, setInsertStatus] = useState(null);
    const [insertError, setInsertError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/departments")
            .then(response => response.json())
            .then(data => {
                setDepartments(data)
            })
    }, [])

    const handleStoryIdChange = (event) => {
        setStoryId(event.target.value);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleDescChange = (event) => {
        setDesc(event.target.value);
    }

    const handleSelectedDepartment = (event) => {
        setSelectedDepartment(event.target.value);
    }

    const addToDatabase = () => {
        if (!storyId || !desc || !name) {
            setInsertError("Fill all the fields");
            return;
        }

        const data = {
            id: storyId,
            name: name,
            description: desc,
            departmentId: selectedDepartment
        }

        fetch('http://localhost:8080/stories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok)
                    throw new Error('Network response was not ok');
                return response.json();
            })
            .then(() => {
                setInsertStatus("Success")
                setInsertError(null)
                clearFields()
            })
            .catch(error => {
                setInsertStatus(null)
                setInsertError(error.toString());
            });
    }

    const clearFields = () => {
        setDesc('')
        setName('')
        setStoryId('')
    }

    return <div className='card'>
        <div>
            <h2 style={{ textAlign: 'center' }}>Insert Story into Database</h2>
            <div className='form'>
                <label htmlFor="storyId">Story ID:</label>
                <input className='text' type="text" id="storyId" value={storyId} onChange={handleStoryIdChange} />
            </div>
            <div className='form'>
                <label htmlFor="storyName">Story Name:</label>
                <input className='text' type="text" id="storyName" value={name} onChange={handleNameChange} />
            </div>
            <div className='form'>
                <label htmlFor="storyName">Description:</label>
                <input className='text' type="text" id="storyDesc" value={desc} onChange={handleDescChange} />
            </div>
            <div className='form'>
                <label htmlFor="storyName">Departments:</label>
                <select id="department" className="departmentSelect" value={selectedDepartment} onChange={handleSelectedDepartment}>
                    {departments?.map((item, index) => (
                        <option key={index} value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
            <button className='button-17' onClick={addToDatabase}>Add to Database</button>
            <button className='button-17' onClick={clearFields}>Clear fields</button><br />
            {insertError && <span style={{ color: "red", textAlign: "center" }}>{insertError}</span>}
            {insertStatus && <span style={{ color: "green", textAlign: "center" }}>{insertStatus}</span>}
        </div>
    </div>
}

export function FetchStories({ onReload, reloadStories }) {
    const [stories, setStories] = useState(null)
    const [selectedId, setSelectedId] = useState(null);
    const [deleteStatus, setDeleteStatus] = useState('');

    useEffect(()=>{
        fetch("http://localhost:8080/stories")
            .then(response =>response.json())
            .then(data => {
                setStories(null)
                setTimeout(()=>{
                    setStories(data)
                },250)
            })
    },[reloadStories])

    return <div className="card">
        <div>
            <h2>All Stories</h2>
            {stories !==null &&(<>
                <table className="table">
                    <thead>
                        <tr>
                            <th>StoryId</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stories.map((element)=>(
                            <tr key={element.id}>
                                <td>{element.id}</td>
                                <td>{element.name}</td>
                                <td>{element.description}</td>
                                <td>{element.department}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>)}
            {stories ===null &&(
                <div className="placeholder"><div className="loader"></div></div>
            )}
        </div>
    </div>
}