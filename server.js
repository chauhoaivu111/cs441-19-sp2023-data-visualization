
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://www.worldometers.info/coronavirus/", { timeout: 60000 });
    const $ = cheerio.load(response.data);
    const title = $("title").text();

    res.send(`Title: ${title}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});



// const express = require('express');
// const puppeteer = require('puppeteer');
// const app = express();

// app.get('/covid-data', async (req, res) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto('https://www.worldometers.info/coronavirus/');

//   // Wait for the table to load
//   await page.waitForSelector('#main_table_countries_today');

//   // Get the table data
//   const data = await page.evaluate(() => {
//     const table = document.querySelector('#main_table_countries_today');
//     const rows = table.querySelectorAll('tr');
//     const headers = Array.from(rows[0].querySelectorAll('th')).map(th => th.innerText.trim());
//     const values = Array.from(rows).slice(1).map(row => {
//       const cells = Array.from(row.querySelectorAll('td')).map(td => td.innerText.trim());
//       return cells.reduce((result, cell, index) => {
//         result[headers[index]] = cell;
//         return result;
//       }, {});
//     });
//     return values;
//   });

//   await browser.close();


//   //  res.setHeader('Access-Control-Allow-Origin', ' http://localhost:3000');
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    const allowedOrigins = ['http://localhost:3000', 'http://localhost:3000/covid-data'];
//    const origin = req.headers.origin;
//    if (allowedOrigins.includes(origin)) {
//      res.setHeader('Access-Control-Allow-Origin', origin);
//    }
   



//   res.json(data);
//   console.log(data)
// });

// app.listen(3001, () => console.log('API server started on port 3001'));
// exports.app = functions.https.onRequest(app);

// res.setHeader('Access-Control-Allow-Origin', 'http://covid19_data');
  
// app.listen(3001, () => console.log('API server started on port 3001'));



//   const functions = require("firebase-functions");

// const express = require('express');
// const puppeteer = require('puppeteer');
// const app = express();

// app.get('/covid-data', async (req, res) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto('https://www.worldometers.info/coronavirus/');

//   // Wait for the table to load
//   await page.waitForSelector('#main_table_countries_today');

//   // Get the table data
//   const data = await page.evaluate(() => {
//     const table = document.querySelector('#main_table_countries_today');
//     const rows = table.querySelectorAll('tr');
//     const headers = Array.from(rows[0].querySelectorAll('th')).map(th => th.innerText.trim());
//     const values = Array.from(rows).slice(1).map(row => {
//       const cells = Array.from(row.querySelectorAll('td')).map(td => td.innerText.trim());
//       return cells.reduce((result, cell, index) => {
//         result[headers[index]] = cell;
//         return result;
//       }, {});
//     });
//     return values;
//   });

//   await browser.close();

//   res.setHeader('Access-Control-Allow-Origin', '*');

//   res.json(data);
//   console.log(data)
// });

// exports.app = functions.https.onRequest(app);
