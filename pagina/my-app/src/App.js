import React from 'react';
import {Header} from './components/Header';
import {BrowserRouter} from "react-router-dom";
import  {Paginas} from './components/Paginas';
import 'boxicons';

//Solucionar Paginas
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Header/>
      <Paginas/>  
    </BrowserRouter>,
    </div>
  );
}

export default App;
