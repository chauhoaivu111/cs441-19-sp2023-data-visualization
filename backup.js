// const firebaseFunctions = require("firebase-functions");
// const express = require("express");
// const playwright = require("playwright-firefox");
// const NodeCache = require("node-cache");

// const app = express();
// const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

// app.get("/", async (req, res) => {
//   try {
//     let data = cache.get("covidData");

//     if (!data) {
//       const browser = await playwright.firefox.launch();

//       const context = await browser.newContext();

//       const page = await context.newPage();
//       // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299');

     

//       await page.goto("https://www.worldometers.info/coronavirus/", { timeout: 60000 });

//       // Wait for the table to load
//       await page.waitForSelector("#main_table_countries_today");

//       // Get the table data
//       data = await page.evaluate(() => {
//         const table = document.querySelector("#main_table_countries_today");
//         const rows = table.querySelectorAll("tr");
//         const headers = Array.from(rows[0].querySelectorAll("th")).map((th) =>
//           th.innerText.trim()
//         );
//         const values = Array.from(rows)
//           .slice(1)
//           .map((row) => {
//             const cells = Array.from(row.querySelectorAll("td")).map((td) =>
//               td.innerText.trim()
//             );
//             return cells.reduce((result, cell, index) => {
//               result[headers[index]] = cell;
//               return result;
//             }, {});
//           });
//         return values;
//       });

//       await browser.close();

//       cache.set("covidData", data);
//     }

//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Content-Type", "application/json");
//     res.send(JSON.stringify(data));
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server errors");
//   }
// });

// exports.app = firebaseFunctions
//   .runWith({ timeoutSeconds: 540, memory: "1GB" })
//   .https.onRequest(app);


const functions = require("firebase-functions");
const puppeteer = require("puppeteer");

exports.runBrowser = functions.runWith({ timeoutSeconds: 300 }).https.onRequest(async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();

    await page.goto("https://www.worldometers.info/coronavirus/",{ timeout: 60000 });
    
    const title = await page.title();

    await browser.close();

    res.send(`Title: ${title}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error running browser");
  }
});




// const firebaseFunctions = require("firebase-functions");
// const express = require("express");
// const puppeteer = require("puppeteer");
// const NodeCache = require("node-cache");

// const app = express();
// const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

// app.get("/", async (req, res) => {
//   try {
//     let data = cache.get("covidData");

//     if (!data) {
//       const browser = await puppeteer.launch({
//         args: ["--no-sandbox", "--disable-setuid-sandbox"],
//       });

//       const page = await browser.newPage();
      
//       await page.goto("https://www.worldometers.info/coronavirus/", { timeout: 60000 });

//       // Wait for the table to load
//       await page.waitForSelector("#main_table_countries_today");

//       // Get the table data
//       data = await page.evaluate(() => {
//         const table = document.querySelector("#main_table_countries_today");
//         const rows = table.querySelectorAll("tr");
//         const headers = Array.from(rows[0].querySelectorAll("th")).map((th) =>
//           th.innerText.trim()
//         );
//         const values = Array.from(rows)
//           .slice(1)
//           .map((row) => {
//             const cells = Array.from(row.querySelectorAll("td")).map((td) =>
//               td.innerText.trim()
//             );
//             return cells.reduce((result, cell, index) => {
//               result[headers[index]] = cell;
//               return result;
//             }, {});
//           });
//         return values;
//       });

//       await browser.close();

//       cache.set("covidData", data);
//     }

//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Content-Type", "application/json");
//     res.send(JSON.stringify(data));
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server errors");
//   }
// });

// exports.app = firebaseFunctions
//   .runWith({ timeoutSeconds: 540, memory: "1GB" })
//   .https.onRequest(app);

