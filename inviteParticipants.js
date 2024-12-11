const { Builder, By, Key, until, error } = require('selenium-webdriver');
const { urlContains } = require('selenium-webdriver/lib/until');

async function inviteParticipants() {
    // Replace with your login page URL
    const loginUrl = 'https://staging-portal.argenie.net/';
    const driver = new Builder().forBrowser('chrome').build();

    try {
        // Step 1: Open the login page and Log in to Portal
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
        console.log('login button clicked');

       // Wait for the next page to load (adjust the selector to a post-login element)
        await driver.wait(until.urlContains('https://staging-portal.argenie.net/Sessions'), 5000);
        console.log('Login successful');

        // Navigate to the "My Sessions" page
        console.log("Navigating to 'My Sessions' page...");
        await driver.wait(until.urlContains('/Sessions'), 10000);

        // Find the invite button
        console.log("Finding the Invite button...");
        const inviteButton = await driver.wait(until.elementLocated(By.className('MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-vn4aa5')), 10000);
        await inviteButton.click();

        // Click the "INVITE" button
        console.log("Clicking 'INVITE BUTTON'...");

        const inviteSMSField = await driver.findElement(By.className('form-control ')); // Find the SMS enter field
        await inviteSMSField.sendKeys('9528063756'); // Fill the your Phone number

        console.log('Finding send sms Button...');

        const sendSmsButton = await driver.wait(until.elementLocated(By.className('MuiButtonBase-root MuiIconButton-root MuiIconButton-colorPrimary MuiIconButton-sizeSmall css-941tgv')),10000);
        await sendSmsButton.click();
        console.log('Phone number filled and clicked on the send SMS button successfully')

        await driver.wait(until.urlContains('https://staging-portal.argenie.net/Sessions'),1000);
        console.log('Session invitation successfully sent via SMS');
    } catch (error) {
        console.error('Error during Send invitation Link via SMS:', error);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

inviteParticipants();