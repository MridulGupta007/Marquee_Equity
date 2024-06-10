import React from "react";
import { useState } from "react";
import { DataContext } from "./Context/Context";
import { Outlet } from "react-router-dom";

function App() {
  const [booksData, setBooksData] = useState([]);
  const [responseReceived, setResponseReceived] = useState(false);
  const [personalShelf, setPersonalShelf] = useState([]);
  return (
    <DataContext.Provider
      value={{
        booksData,
        setBooksData,
        responseReceived,
        setResponseReceived,
        personalShelf,
        setPersonalShelf,
      }}
    >
      <div className="py-5 font-mono bg-[#E88D67] min-h-[100vh]">
        <Outlet />
      </div>
   
    </DataContext.Provider>
  );
}

export default App;
