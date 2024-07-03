// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import QnA from './components/QnA';
import Detail from './components/Detail';

function App() {
  return (
    <Router>
      <div>
      
        <Routes>
        
          <Route exact path="/qna" element={<QnA />} />
         
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
