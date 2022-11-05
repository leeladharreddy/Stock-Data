import React, { useState } from "react";
import "./index.css";

const stockDataURL = "https://jsonmock.hackerrank.com/api/stocks"

export default function StockData() {

  const [date, setDate] = useState(null);
  const [stockData, setStockData] = useState(null);

  const handleInputDate = ({ target: { value = null } }) => {
    setDate(value);
  }

  const handleSearch = () => {
    if (date) {
      fetch(stockDataURL + `?date=${date}`)
        .then((response) => response.json())
        .then((result) => {
          setStockData(result.data)
        })
        .catch((error) => {
          setStockData(null)
        })
    }
  }


  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input type="text" className="large" placeholder="5-January-2000" id="app-input" data-testid="app-input" onChange={handleInputDate} />
        <button className="" id="submit-button" data-testid="submit-button" onClick={handleSearch}>Search</button>
      </section>
      {!!stockData && stockData.length > 0 &&
        <ul className="mt-50 slide-up-fade-in styled" id="stockData" data-testid="stock-data">
          <li className="py-10">Open: {stockData[0]['open']}</li>
          <li className="py-10">Close: {stockData[0]['close']}</li>
          <li className="py-10">High: {stockData[0]['high']}</li>
          <li className="py-10">Low: {stockData[0]['low']}</li>
        </ul>
      }
      {date && (stockData === null || stockData.length === 0) &&
        <div className="mt-50 slide-up-fade-in" id="no-result" data-testid="no-result">No Results Found</div>
      }
    </div>
  );
}
