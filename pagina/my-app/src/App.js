import React from 'react';
import Home from "./Home"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import 'boxicons';


//Solucionar Paginas
function App() {
  return (
    
    <div className="App">
    <Router>
      <Routes>
      <Route exact path = "/" element={<Home/>}/>
      </Routes>
    </Router>,
    </div>
    
  );
}

export default App;
