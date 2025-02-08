import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/") // Call Flask backend
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  return (
    <div>
      <h1>Vite + React</h1>
      <p>Backend Response: {message}</p>
    </div>
  );
}

export default App;
