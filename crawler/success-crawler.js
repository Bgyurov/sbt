const puppeteer = require("puppeteer");

async function accessMoneyPage() {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "/snap/bin/chromium",
  });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36"
  );
  await page.setExtraHTTPHeaders({
    Referer: "https://google.com",
  });

  const userDataCookie = {
    name: "userData",
    value: JSON.stringify({
      isTouchable: false,
      isHeadless: false,
      isMobileResolution: false,
    }),
    url: "http://localhost:8080",
  };
  await page.setCookie(userDataCookie);

  const url = "http://localhost:8080/money?gclid=test1234";
  await page.goto(url, { waitUntil: "networkidle2" });

  const content = await page.content();
  console.log(content);

  await browser.close();
}

accessMoneyPage();
