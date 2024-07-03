import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QnA from './components/QnA'; 
import Detail from './components/Detail'; // Import the Detail component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<QnA />} />
          <Route path="/detail/:id" element={<Detail />} /> {/* Add this line */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
