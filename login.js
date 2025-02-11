const { Builder, By, Key, until } = require('selenium-webdriver');

async function login() {
    // Replace with your login page URL
    const loginUrl = 'https://portal.argenie.ai/';
    const driver = new Builder().forBrowser('chrome').build();

    try {
        // Open the login page
        await driver.get(loginUrl);

        // Locate and fill the username field
        const usernameField = await driver.findElement(By.id('email')); // Replace 'username' with the actual ID or selector
        await usernameField.sendKeys('leotest1624@gmail.com'); // Replace with your username

        // Locate and fill the password field
        const passwordField = await driver.findElement(By.id('password')); // Replace 'password' with the actual ID or selector
        await passwordField.sendKeys('King@123'); // Replace with your password

        // Locate and click the login button
        const loginButton = await driver.findElement(By.css('button[type="submit"]')); // Replace 'loginButton' with the actual ID or selector
        await loginButton.click();

        // Wait for the next page to load (adjust the selector to a post-login element)
        await driver.wait(until.urlContains('https://portal.argenie.ai/Sessions'), 5000);
        console.log('Login successful');
    } catch (error) {
        console.error('Error during Login:', error);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

login();
