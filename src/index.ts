import * as puppeteer from "puppeteer";

const run = async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto(`https://github.com/${process.argv[2]}`);

  await page.evaluate(() => {
    const elementList = document.getElementsByClassName("flex-shrink-0");
    let i = 0;
    while (true) {
      const element = elementList.item(i);
      if (!element) {
        break;
      }
      element.remove();
      i++;
    }

    document.querySelector("html").setAttribute("data-color-mode", "dark");
  });

  await (await page.$(".js-yearly-contributions")).screenshot({ path: "./output.jpeg", type: "jpeg", quality: 100 });

  await browser.close();
};

run().then().catch(console.error);
