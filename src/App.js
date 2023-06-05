import './App.css';
import React, { useState } from 'react';
function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // Multiple state updates
    setCount(count=>count + 1);
    setCount(count + 1);
    setCount(count=>count + 1);

  };
  
  return (
    <div className="App">
    <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

export default App;
