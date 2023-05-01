const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://www.worldometers.info/coronavirus/", { timeout: 60000 });
    const $ = cheerio.load(response.data);
    const title = $("title").text();

    // Get the table data
    const data = [];
    const table = $("#main_table_countries_today");
    const headers = [];
    const headerCols = table.find("thead tr th");
    headerCols.each((j, headerCol) => {
      headers.push($(headerCol).text().trim());
    });
    data.push(headers);
    const rows = table.find("tbody tr");
    rows.each((i, row) => {
      const cols = $(row).find("td");
      const rowData = [];
      cols.each((j, col) => {
        rowData.push($(col).text().trim());
      });
      data.push(rowData);
    });
  
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
