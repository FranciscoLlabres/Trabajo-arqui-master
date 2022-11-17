import React from 'react';
import Home from "./Home"
import Order from './Order';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import 'boxicons';


//Solucionar Paginas
function App() {
  return (
    
    <div className="App">
    <Router>
      <Routes>
      <Route exact path = "/" element={<Home/>}/>
      <Route exact path = "/" element={<Order/>}/>
      </Routes>
    </Router>,
    </div>
    
  );
}

export default App;
