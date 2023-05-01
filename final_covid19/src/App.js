import React, { useState, useEffect } from "react";
import "./App.scss";
import coverImgae from "../src/image/coverimge_covid19.jpg";
import LineChart from "./linechart";
import NewsCard from "./NewsCard";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [covidData, setCovidData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // /--------------------------------/

  useEffect(() => {
    fetch("https://covid19data.herokuapp.com/")
      .then((response) => response.json())
      .then((data) => setCovidData(data))
      .catch((error) => console.error(error));
  }, []);

  if (covidData.length === 0) {
    return (
      <div className="loading">
        <h3>Loading </h3>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  const filteredData = covidData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  console.log(covidData);

  return (
    <div className="App">
      <div className="frame_title">
        <h1>WELCOME TO THE LASTEST UPDATES AND NEWS ON COVID-19</h1>
      </div>

      <div className="frame_cover_img">
        <img src={coverImgae} alt="" />
      </div>

      {/* ----------------------------------------------------------------- */}

      <NewsCard />

      {/* /---------------------------------------------------------------- */}

      <LineChart />

      {/* ------------------------------------------------------------------- */}

      <h1>The Covid Rate Table </h1>

      <div className="frame_time_search">
        <div>
          <p>begin from 29/1/2020 to now</p>
        </div>

        <div className="search_bar">
          <input
            type="text"
            placeholder="Search by country name"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>

      <div className="main_table_covid_frame">
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Total Cases</th>
              <th>New Cases</th>
              <th>Total Deaths</th>
              <th>New Deaths</th>
              <th>Total Recovered</th>
              <th>New Recovered</th>
              <th>Active Cases</th>
              <th>Active Cases/ 1M pop</th>
              <th>Deaths/ 1M pop</th>
              <th>Total tests</th>
              <th>Serious,Critical</th>
              <th>Population</th>
              <th>Continent</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row["Country,Other"]}</td>
                <td>{row["TotalCases"]}</td>
                <td className={row["NewCases"] ? "active_newcases" : ""}>
                  {row["NewCases"]}
                </td>
                <td>{row["TotalDeaths"]}</td>
                <td className={row["NewDeaths"] ? "active" : ""}>
                  {row["NewDeaths"]}
                </td>
                <td>
                  {row["TotalRecovered"] === "N/A" ? "" : row["TotalRecovered"]}
                </td>
                <td
                  className={
                    row["NewRecovered"] === "N/A"
                      ? ""
                      : row["NewRecovered"] || row["NewRecovered"]
                      ? "active_newrecovered"
                      : ""
                  }
                >
                  {row["NewRecovered"] === "N/A" ? "" : row["NewRecovered"]}
                </td>

                <td>
                  {row["ActiveCases"] === "N/A" ? "" : row["ActiveCases"]}
                </td>
                <td>{row["Active Cases/1M pop"]}</td>
                <td>{row["Deaths/1M pop"]}</td>
                <td>{row["TotalTests"]}</td>
                <td>
                  {row["Serious,Critical"] === "N/A"
                    ? ""
                    : row["Serious,Critical"]}
                </td>
                <td>{row["Population"]}</td>
                <td>{row["Continent"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
