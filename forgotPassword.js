const { Builder, By, Key, until } = require('selenium-webdriver');
const { elementsLocated } = require('selenium-webdriver/lib/until');

async function forgotPassword() {
    // Replace with your login page URL
    const loginUrl = 'https://portal.argenie.ai/';
    const driver = new Builder().forBrowser('chrome').build();

    try {
        // Open the login page
        await driver.get(loginUrl);

        // Locate and fill the username field
        const forgotPasswordButton = await driver.findElement(By.className('text-xs')); // Replace 'username' with the actual ID or selector
        await forgotPasswordButton.click(); // Replace with your username

        // Locate and fill the password field
        const usernameField = await driver.findElement(By.id('email')); // Replace 'password' with the actual ID or selector
        await usernameField.sendKeys('leotest1624@gmail.com'); // Replace with your password

        // Locate and click the login button
        const sendForgotlinkButton = await driver.findElement(By.css('button[type="submit"]')); // Replace 'loginButton' with the actual ID or selector
        await sendForgotlinkButton.click();

        console.log("Waiting for sentEmail page...");
        await driver.wait(until.urlContains('/emailSent'), 20000);
        console.log('Email sent successfully')

        // Wait for the "Back to login" button to be visible
        console.log("Waiting for 'Back to login' button...");
        const backToLoginButton = await driver.wait(
            until.elementLocated(By.xpath("/html/body/div/div[1]/div/div/div/div[2]/a")),
            10000
        );

        // Ensure the button is visible and interactable
        await driver.wait(until.elementIsVisible(backToLoginButton), 10000);

        // Click the button
        console.log("Clicking 'Back to login' button...");
        await backToLoginButton.click();

        // Wait for the next page to load (adjust the selector to a post-login element)
        await driver.wait(until.urlContains('https://portal.argenie.ai/login'), 5000);
        console.log('Successfully sent forgot password link to User and Back to Portal Login Screen');
    } catch (error) {
        console.error('Error during forgot password', error);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

forgotPassword();