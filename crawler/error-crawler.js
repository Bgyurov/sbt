const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function accessSafePage() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/snap/bin/chromium",
  });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)"
  );

  await page.setCookie({
    name: "userData",
    value: JSON.stringify({
      isTouchable: true,
      isHeadless: true,
      isMobileResolution: true,
    }),
    url: "http://localhost:8080",
  });

  const url = "http://localhost:8080/money?gclid=invalidgclid";

  await page.goto(url, { waitUntil: "networkidle2" });

  const content = await page.content();
  const filePath = path.join(__dirname, "safePageResults.html");
  fs.writeFileSync(filePath, content);
  console.log("Safe page content saved to:", filePath);

  await browser.close();
}

accessSafePage();
