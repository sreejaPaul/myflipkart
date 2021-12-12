import React, { useEffect } from "react";
import Homebody from "./Homebody";
import Topbar from "./Topbar";
import { Route, Routes } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Checkout from "./Checkout";


function App() {
  const [{ }, dispatch] = useStateValue();

  return (
    <div className="App">
      {/* Hrader - top bar
      Home - body */}
      {/* <Routes>

        <Route path="/" exact>
          <>
            <Topbar />
            <Homebody />
          </>
        </Route>

        <Route path="/checkout" exact>
          <>
            <Topbar />
            <Checkout />
          </>
        </Route>
      </Routes> */}
      <Routes>
        <Route exact path="/" 
        element={<>
            <Topbar />
            <Homebody />
          </>} />
        <Route path="/checkout" 
        element={<>
            <Topbar />
            <Checkout />
          </>} />
        
      </Routes>

    </div>
  );
}

export default App;
