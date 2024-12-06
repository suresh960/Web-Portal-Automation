const { Builder, By, Key, until } = require('selenium-webdriver');
const { elementsLocated } = require('selenium-webdriver/lib/until');

async function forgotPassword() {
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

        console.log("Waiting for sentEmail page...");
        await driver.wait(until.urlContains('localhost:3000/emailSent'), 10000);

        const backTologinButton = await driver.findElement(By.className('inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-neutral-300 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 h-10 px-4 py-2 flex gap-2 items-center w-full'))
        await backTologinButton.click();
        console.log('successfully back to Login')

        // Wait for the next page to load (adjust the selector to a post-login element)
        await driver.wait(until.titleContains('AR Genie Portal'), 5000);
        console.log('Successfully sent forgot password link to user and back to Portal Login Screen');
    } catch (error) {
        console.error('Error during forgot password', error);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

forgotPassword();