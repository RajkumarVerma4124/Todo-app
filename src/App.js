import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //when the app loads we need to listen to the database and fetch new todos as they get refreshed or added/removed
  //console.log(input);
  useEffect(() => {
    //this code fire when the app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, []);

  const addTodo = (event) => {
    // this will fire up when we click the add button
    event.preventDefault();  //it will stop the page from refresh
    //console.log('i am working');
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    { /*setTodos([...todos, input]); */ }
    setInput(''); //clear the input after clicking todo button
  }
    return ( 
      <div className="App">
        <h1> Welcome to Todo Application</h1>  
        <form>
          <FormControl>
            <InputLabel>  Write a Todo... </InputLabel>
            <Input value = {input} onChange={ event => setInput(event.target.value) }/>
          </FormControl>

          <Button disabled={!input} type='submit'onClick={addTodo} variant="contained" color="primary">
            Add Todo
          </Button>
          {/*<button type='submit' onClick={addTodo}>Add Todo </button>*/} 
        </form>
        

        <ul>
          {todos.map(todo => (
            <Todo todo={todo}/>
            //<li> {todo}</li>
            ))
          }
         
        </ul>
        </div>
    );
}

export default App;