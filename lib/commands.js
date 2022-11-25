module.exports = {
    clickElement: async function (page, selector) {
        try {        
            await page.waitForSelector(selector, {visible:true});
            await page.click(selector);
        } catch (error) {
            throw new Error(`Selector '${selector}' is not clickable`);
        }
    },

    getText: async function (page, selector) {
        try {
            await page.waitForSelector(selector, {visible:true});
            return await page.$eval(selector, (link) => link.textContent);
        } catch (error) {
            throw new Error(`Text for selector '${selector}' is not available`);
        }
    }
};
