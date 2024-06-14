import React, { useState } from 'react';
import { FetchDepartmentById ,InsertDepartmentData,FetchDepartments} from './Departments.js';
import { AddStories } from './Stories.js';
 
export default function MainPage(){
  const [reloadDepartments, setreloadDepartments] = useState(false);

  const handleReload = () => {
    setreloadDepartments(!reloadDepartments);
  };

  return <div className='container'>
    <FetchDepartmentById/>
    <InsertDepartmentData onReload ={handleReload}/>
    <FetchDepartments onReload ={handleReload} reloadDepartments={reloadDepartments}/>
    <AddStories/>
  </div>
};
