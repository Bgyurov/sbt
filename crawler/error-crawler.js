const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function accessSafePage() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Установяване на User-Agent и Referrer, които не отговарят на условията за "money page"
  await page.setUserAgent("Mozilla/5.0 (incompatible; MyCrawler/1.0)");
  await page.setExtraHTTPHeaders({
    Referer: "http://not-google.com", // Симулирайте референт, който не е google.com
  });

  // Добавяне на симулирани данни като JSON
  const simulatedData = {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    referrer: "https://google.com",
    gclid: "test1234",
    screenResolution: `${1920}x${1080}`, // Симулирайте резолюция
    isTouchable: false, // Симулирайте устройството като не-докосваемо    browserLanguage: "en-US",
    localBrowserTime: new Date().toLocaleString(),
  };

  // Навигация към "money page"
  const url = "http://localhost:8080/money?gclid=123123";
  await page.goto(url, { waitUntil: "networkidle2" });

  // Изпращане на POST заявка със симулирани данни
  await page.evaluate((data) => {
    fetch("http://localhost:8080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        console.log("Simulated data sent successfully");
      } else {
        console.error("Failed to send simulated data");
      }
    });
  }, simulatedData);

  // Съхраняване на съдържанието на страницата
  const content = await page.content();
  const filePath = path.join(__dirname, "crawl_results.html");
  fs.writeFileSync(filePath, content);
  console.log("Crawled data saved to:", filePath);

  // Затваряне на браузъра
  await browser.close();
}

accessSafePage();
