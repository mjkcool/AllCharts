import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [Chart, setChart] = useState([]);


  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/melon')
    .then(res => {
      setChart(...[res.data.melon])
    });
    
  })

  return (
    <div>
      { Chart && Chart.map((item, index) => (
          <React.Fragment key={index}>
            <div>{item.rank} {item.title}/{item.singer}</div>
          </React.Fragment>
        ))
      }
    </div>
  );
}

export default App;
