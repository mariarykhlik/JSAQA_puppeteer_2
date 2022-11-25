const puppeteer = require('puppeteer');
const chai = require('chai');
const expect = chai.expect;
const { Given, When, Then, Before, After } = require('cucumber');
const {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60000);

const { clickElement, getText } = require('../../lib/commands.js');
const { firstAvailableSeance, vacantStandartSeat } = require('../../lib/selectors');

Before(async function () {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 100
    });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
});

After(async function () {
    if (this.browser) {
        await this.browser.close();
    }
});

Given('user is on main page', async function () {
    return await this.page.goto('http://qamid.tmweb.ru');
});

When('user selects day {string}', async function (string) {
    return await clickElement(this.page, `.page-nav__day:nth-of-type(${Number(string)})`);
});

When('user selects first available seance', async function () {
    return await clickElement(this.page, firstAvailableSeance);
});

When('user passes select vacant seat', async function () {
    // expect(this.page.url()).contains('http://qamid.tmweb.ru/client/hall.php');
    return await this.page;
});

When('user selects vacant seat', async function () {
    // expect(this.page.url()).contains('http://qamid.tmweb.ru/client/hall.php');
    return await clickElement(this.page, vacantStandartSeat);
});

Then('user can not book', async function () {
    expect(await this.page.$eval('button', (b) => b.disabled)).to.be.true;
});

Then('user books', async function () {
    // expect(this.page.url()).contains('http://qamid.tmweb.ru/client/hall.php');
    await clickElement(this.page, 'button');
    // expect(this.page.url()).contains('http://qamid.tmweb.ru/client/payment.php');
    await clickElement(this.page, 'button');
    expect(this.page.url()).contains('http://qamid.tmweb.ru/client/ticket.php');
});

Then('user sees {string}', async function (string) {
    expect(await getText(this.page, 'h2')).contains(string);
});
