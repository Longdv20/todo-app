import React, { useEffect, useState } from "react";
import './App.css';
import Axios from 'axios'

function App() {

  const[action, setAction] = useState('');
  const[description, setDescription] = useState('');
  const [descriptionList, setActionList] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setActionList(response.data)
    })
  })

  const submitDescription = () =>{
    Axios.post('http://localhost:3001/api/insert', {action: action, description: description})
    .then(() => {
      alert("done successfully!")
    })
  }

  setActionList([
    ...descriptionList, {action: action, description: description},
  ]);

const deleteDescription = 0;
const update = 0;

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div className="form">
        <label>Action:</label>
        <input type="text" name="action" onChange={(e)=>{setAction(e.target.value)}}/>
        <label>Description:</label>
        <input type="text" name="description" onChange={(e)=>{setDescription(e.target.value)}}/>

        <button onclick={submitDescription}>Submit</button>
      
      {descriptionList.map((val)=>{
        return ( <h1>Action: {val.action} | Description: {val.description}</h1>
      );
        })}
      </div>
    </div>
  );
};

export default App;
