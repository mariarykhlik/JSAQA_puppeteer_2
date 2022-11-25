const { clickElement, getText } = require('../lib/commands');
const { firstAvailableSeance, vacantStandartSeat } = require('../lib/selectors');

let page;

beforeEach(async () => {
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
    page.close();
});

describe('Ticket booking Tests', () => {   
    beforeEach(async () => {
        await page.goto('http://qamid.tmweb.ru');
    });
    
    test('Should book ticket for single', async () => {
        await clickElement(page, '.page-nav__day.page-nav__day_weekend');
        // const choice = await getText(page, firstAvailableSeance);
        await clickElement(page, firstAvailableSeance);
        // expect(await getText(page, '.buying__info-start')).toContain(choice);
        await clickElement(page, vacantStandartSeat);
        await clickElement(page, 'button');
        // expect(await getText(page, 'h2')).toContain('Вы выбрали билеты:');
        await clickElement(page, 'button');
        expect(await getText(page, 'h2')).toContain('Электронный билет')
    });
    
    test('Should book ticket for several', async () => {
        await clickElement(page, '.page-nav__day.page-nav__day_weekend');
        // const choice = await getText(page, firstAvailableSeance);
        await clickElement(page, firstAvailableSeance);
        // expect(await getText(page, '.buying__info-start')).toContain(choice);
        await clickElement(page, vacantStandartSeat);
        await clickElement(page, vacantStandartSeat);
        await clickElement(page, vacantStandartSeat);
        await clickElement(page, 'button');
        // expect(await getText(page, 'h2')).toContain('Вы выбрали билеты:');
        await clickElement(page, 'button');
        expect(await getText(page, 'h2')).toContain('Электронный билет')
    });

    test('Should not book for pass seat select', async () => {
        await clickElement(page, '.page-nav__day.page-nav__day_weekend');
        // const choice = await getText(page, firstAvailableSeance);
        await clickElement(page, firstAvailableSeance);
        // expect(await getText(page, '.buying__info-start')).toContain(choice);
        expect(await page.$eval('button', (b) => b.disabled)).toBe(true);
    });
});
