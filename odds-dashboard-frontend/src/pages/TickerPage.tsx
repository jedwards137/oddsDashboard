import {useEffect, useState} from "react";

const TickerPage = () => {
  const [odds, setOdds] = useState([]);

  useEffect(() => {
    const fetchOdds = async () => {
      const response = await fetch('/api/events');
      const responseJson = await response.json();
      if (response.ok) {
        setOdds(responseJson);
        console.log(responseJson);
      }
    }

    //fetchOdds();
  }, [])

  return (
    <div>
      <h1>ticker page</h1>
      {odds && odds.map(() => (
        <p>{odds.sportKey}</p>
      ))}
    </div>
  );
}

export default TickerPage;