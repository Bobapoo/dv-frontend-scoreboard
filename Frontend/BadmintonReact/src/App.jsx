// src/App.jsx
import React from 'react';
import ScoreDisplay from './components/scoreboard';
import './styles/theme.css';

const App = () => {
//   return (

//   );
// };
  return (
  <div className="App">
    <ScoreDisplay />  {/* Render the ScoreDisplay component */}
  </div>
  );
};

export default App;