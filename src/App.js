import React, { useState,useEffect } from 'react';
import { Button,FormControl,InputLabel,Input } from '@material-ui/core';
import Todo  from './Todo'
import './App.css';
import db from './firebase'
import firebase from 'firebase'

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState([])
  
  //when the app loads we need to listen to the db and fetch new todos as they are added/removed
useEffect(() => {
  db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
    setTodos(snapshot.docs.map(doc => ({id:doc.id,todo:doc.data().todo}))
  )})

  // this code here....fires when the app.js loads
},[]);


  const addTodo = (event) =>{
    // this will fire of when we click the button
    event.preventDefault(); //will stop the refresh
    //console.log('i m working')
    //setTodos([...todos, input])
    //console.log(todos)
    db.collection('todos').add({
      todo:input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');    //clear input after clicking add todo button
     
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      

      <FormControl>
      <InputLabel>Write TODO</InputLabel>
      <Input value={input} style={{marginBottom:'1.4rem'}} onChange={event => setInput(event.target.value)}/>
      <Button disabled={!input} type='submit' onClick={addTodo} variant="contained" color="secondary">
        Add Todo
      </Button>
      </FormControl>

      <ul>
        {todos.map(todo => (
          <Todo text={todo}/>
        ))}
      </ul>

    </div>
  );
}

export default App;
