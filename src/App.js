import React, { Suspense } from 'react';
import './App.css';
import Demo from './Demo';

function App() {

  return (
    <div className="App">
           <Suspense fallback={<div>Loading...</div>}>
             <div className="container">
             <Demo />

             </div>

           </Suspense>
    </div>
  );
}

export default App;
