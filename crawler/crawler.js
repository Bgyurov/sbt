const puppeteer = require('puppeteer');

async function runCrawler() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Настройване на филтри, за да се уверим, че crawler-ът ще фейлва при опит да достигне освен safe page.
  await page.setUserAgent('CrawlerBot'); // Пример за промяна на user agent на crawler-a
  await page.setExtraHTTPHeaders({
    'Referer': 'https://notgoogle.com' // Настройка на невалиден referrer
  });

  await page.goto('http://localhost:8080'); // Променете URL-а според вашия сайт
  const content = await page.content(); // Извличане на съдържанието на страницата

  console.log(content); // Отпечатване или записване на съдържанието

  // Записване на съдържанието в файл на същия сървър или контейнер
  const fs = require('fs');
  fs.writeFile('./info.txt', content, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  await browser.close();
}

runCrawler().catch(console.error);
