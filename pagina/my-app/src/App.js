import React from 'react';
import {Header} from './components/Header';
import {BrowserRouter} from "react-router-dom";
import  {Paginas} from './components/Paginas';
import 'boxicons';
import {DataProvider} from './context/Dataprovider'

//Solucionar Paginas
function App() {
  return (
    <DataProvider>
    <div className="App">
    <BrowserRouter>
      <Header/>
      <Paginas/>
    </BrowserRouter>,
    </div>
    </DataProvider>
  );
}

export default App;
