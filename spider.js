const express = require('express');
const puppeteer = require('puppeteer');

const server = express();

server.get('/', async (request, response) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('link_da_pagina');
    //await page.screenshot({ path: 'example.png' });
    const spiderScraping = await page.evaluate(() => {
        return {
            title: document.querySelector('.class_desejada').innerHTML,
            subtitle: document.querySelector('.class_desejada').innerHTML,
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            deviceScaleFactor: window.devicePixelRatio
        }
    });

    await browser.close();
    response.send({
        title: spiderScraping.title,
        subtitle: spiderScraping.subtitle,
        width: spiderScraping.width,
        height: spiderScraping.height,
        deviceScaleFactor: spiderScraping.deviceScaleFactor,
    });
});

server.listen(3000, () => { console.log('Executando...') })

