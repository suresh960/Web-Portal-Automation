const { Builder, By, until } = require('selenium-webdriver');

(async function loginTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    // This Code is currently Not Working
    try {
        await driver.get('https://staging-portal.argenie.net/Sessions');

        // // Using btn id selector for the username field
        // await driver.findElement(By.id('email')).sendKeys('doon@staging.com')

        // // Using btn id selector for the password field
        // await driver.findElement(By.id('password')).sendKeys('1234567890');  // Adjust class name
        // console.log('Password entered');

        // Using class name selector for the login button
        await driver.findElement(By.className('MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-colorPrimary css-1pmb064')).click();  // Adjust class name
        console.log('Login button clicked');

        // Wait for the post-login element to appear
        let dashboard = await driver.wait(until.elementLocated(By.css('.dashboard-class')), 10000);  // Adjust class name

        if (await dashboard.isDisplayed()) {
            console.log('Login test passed. Dashboard is visible.');
        } else {
            console.log('Login test failed. Dashboard not found.');
        }

    } catch (error) {
        console.error('Error during login:', error);
    // } finally {
    //     await driver.quit();
    }
})();