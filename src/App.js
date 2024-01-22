import React, { useState } from 'react';
import './App.css';
import Navbar from "./components/navbar";
import TodoList from './components/Todo-list';

function App() {
  return (
    <>
     <Navbar />
     <TodoList />
    </>
  )
}

export default App;