import {useEffect, useState} from "react";

const TickerPage = () => {
  const [odds, setOdds] = useState([]);

  useEffect(() => {
    const fetchOdds = async () => {
      const response = await fetch('http://localhost:4000/api/workouts');
      const responseJson = await response.json();
      if (response.ok) {
        setOdds(responseJson);
      }
    }
  }, [])

  return (
    <div>
      <h1>ticker page</h1>
      {odds && odds.map(() => (
        <p></p>
      ))}
    </div>
  );
}

export default TickerPage;