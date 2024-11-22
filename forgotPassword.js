const { Builder, By, Key, until } = require('selenium-webdriver');

async function forgotpassword() {
    // Replace with your login page URL
    const loginUrl = 'http://localhost:3000/';
    const driver = new Builder().forBrowser('chrome').build();

    try {
        // Open the login page
        await driver.get(loginUrl);

        // Locate and fill the username field
        const forgotPasswordButton = await driver.findElement(By.className('text-xs')); // Replace 'username' with the actual ID or selector
        await forgotPasswordButton.click(); // Replace with your username

        // Locate and fill the password field
        const usernameField = await driver.findElement(By.id('email')); // Replace 'password' with the actual ID or selector
        await usernameField.sendKeys('doon@staging.com'); // Replace with your password

        // Locate and click the login button
        const sendForgotlinkButton = await driver.findElement(By.css('button[type="submit"]')); // Replace 'loginButton' with the actual ID or selector
        await sendForgotlinkButton.click();

        // Wait for the next page to load (adjust the selector to a post-login element)
        await driver.wait(until.titleContains('AR Genie Portal'), 5000);
        console.log('Successfully clicked on Forgot password button and sent link to user');
    } catch (error) {
        console.error('Error during forgot password', error);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

forgotpassword();