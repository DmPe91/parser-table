const puppeteer = require("puppeteer");
const fs = require("fs");
let parse = require("csv-parse");

const url = "https://www.rp-ural.ru/stock/";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);
  let arr = await page.evaluate(() => {
    let text = Array.from(
      document.querySelectorAll("tr"),
      (el) => el.innerText
    );
    return text;
  });

  let table_arr = arr.map(function (el) {
    el = el.split("\n");
    el = el.map((element) => {
      element = element.trimStart();
      return element;
    });
    el = el.filter((num) => {
      return num !== "";
    });
    el[el.length - 1] = el[el.length - 1] + "\n";

    return el;
  });
  ///for (let i = 0; i < table_arr.length; i++)
  table_arr.forEach((elem) => {
    for (let i = 0; i < elem.length; i++) {
      fs.writeFileSync(
        "table.csv",
        elem[i] + ",",
        { flag: "a" },
        function (error) {
          if (error) throw error; // ошибка чтения файла, если есть
          console.log("Данные успешно записаны записать файл");
        }
      );
    }
  });
  ///console.log(table_arr);

  await browser.close();
})();
