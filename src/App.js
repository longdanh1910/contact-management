import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import "./App.css"

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactList/>}/>
        <Route path="/add" element={<AddContact/>}/>
        <Route path="/edit/:id" element={<EditContact/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;