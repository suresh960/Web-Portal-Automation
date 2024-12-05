const { Builder, By, Key, until } = require('selenium-webdriver');

async function login() {
    // Replace with your login page URL
    const loginUrl = 'http://localhost:3000/';
    const driver = new Builder().forBrowser('chrome').build();

    try {
        // Open the login page
        await driver.get(loginUrl);

        // Locate and fill the username field
        const usernameField = await driver.findElement(By.id('email')); // Replace 'username' with the actual ID or selector
        await usernameField.sendKeys('doon@staging.com'); // Replace with your username

        // Locate and fill the password field
        const passwordField = await driver.findElement(By.id('password')); // Replace 'password' with the actual ID or selector
        await passwordField.sendKeys('1234567890'); // Replace with your password

        // Locate and click the login button
        const loginButton = await driver.findElement(By.css('button[type="submit"]')); // Replace 'loginButton' with the actual ID or selector
        await loginButton.click();

        // Wait for the next page to load (adjust the selector to a post-login element)
        await driver.wait(until.titleContains('AR Genie Portal'), 5000);
        console.log('Login successful');
    } catch (error) {
        console.error('Error during Login:', error);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

login();
