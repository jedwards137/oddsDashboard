import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import TickerPage from "./pages/TickerPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/ticker"
              element={<TickerPage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
