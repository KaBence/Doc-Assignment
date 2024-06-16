import React, { useState } from 'react';
import { FetchDepartmentById, InsertDepartmentData, FetchDepartments } from './Departments.js';
import { AddStories, FetchStories } from './Stories.js';

export default function MainPage() {
  const [reloadDepartments, setreloadDepartments] = useState(false);
  const [reloadStories, setreloadStories] = useState(false);

  const handleReloadDepartments = () => {
    setreloadDepartments(!reloadDepartments);
  };

  const handleReloadStories = () => {
    setreloadStories(!reloadStories);
  }

  return <div className='container'>
    <FetchDepartmentById />
    <InsertDepartmentData onReload={handleReloadDepartments} />
    <FetchDepartments onReload={handleReloadDepartments} reloadDepartments={reloadDepartments} />
    <AddStories onReload={handleReloadStories} />
    <FetchStories onReload={handleReloadStories} reloadStories={reloadStories} />
  </div>
};
