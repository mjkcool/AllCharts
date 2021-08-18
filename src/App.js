import React, { useState, useEffect } from 'react';

function App() {
  const [Name, setName] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api')
    .then(res=>res.json())
    .then(data => setName(data.name));
  })

  return (
    <div>
      {Name ? `Hello ${Name}` : 'Nice to meet you'}
    </div>
  );
}

export default App;
