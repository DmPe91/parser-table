const puppeteer = require("puppeteer");
const Blob = require("node-blob/index");
const fs = require("fs");
var FileSaver = require("file-saver");

const url = "https://www.rp-ural.ru/stock/";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);
  let arr = await page.evaluate(() => {
    let text = Array.from(
      document.querySelectorAll("table"),
      (el) => el.innerText
    );
    return text;
  });
  let blob = new Blob([arr], { type: "text/csv;charset=utf-8;" });
  fs.writeFile("data.csv", [arr], function (error) {
    if (error) {
      // если ошибка
      return console.log(error);
    }
    console.log("Файл успешно записан");
  });
  ///let file_csv = FileSaver.saveAs(blob, "data.csv");

  await browser.close();
})();
