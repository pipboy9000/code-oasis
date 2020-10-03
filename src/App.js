import React, { useState } from "react";

import Counter from "./components/counter/Counter";
import Header from "./components/header/Header";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Counter />
    </div>
  );
}

export default App;
