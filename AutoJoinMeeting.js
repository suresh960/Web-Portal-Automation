const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function autojoinMeeting() {
    // Step 1: Configure ChromeOptions
    const chromeOptions = new chrome.Options();

    // Set default permissions for microphone and camera
    chromeOptions.addArguments('--use-fake-ui-for-media-stream'); // Bypass media permission prompts
    chromeOptions.setUserPreferences({
        "profile.default_content_setting_values.media_stream_mic": 1, // 1 = Allow microphone
        "profile.default_content_setting_values.media_stream_camera": 1, // 1 = Allow camera (optional)
        "profile.default_content_setting_values.geolocation": 1 // Optional, allow location
    });

    // Build the WebDriver with ChromeOptions
    const driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();
    // Replace with your login page URL
    const loginUrl = 'https://staging-portal.argenie.net/';

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

       // Wait for the next page to load (adjust the selector to a post-login element)
        await driver.wait(until.titleContains('AR Genie Portal'), 5000);
        console.log('Login successful');

        // Step 2: Navigate to the "My Sessions" page
        console.log("Navigating to 'My Sessions' page...");
        await driver.wait(until.urlContains('/Sessions'), 10000);

        // Step 3: Find the session you want to join
        console.log("Finding the session...");
        const sessionXPath = "/html/body/div/div[1]/div/div/main/div[2]/div/div/div/div[1]/div/div[3]/div[2]/div/button";
        const joinButton = await driver.wait(until.elementLocated(By.xpath(sessionXPath)), 10000);

        // Step 4: Click the "Join Meeting" button
        console.log("Clicking 'JOIN MEETING'...");
        await driver.executeScript("arguments[0].click();", joinButton);

        // Step 5: Wait for the session to load (optional step)
        console.log("Waiting for session to load...");
        await driver.wait(until.urlContains('https://staging-portal.argenie.net/Sessions'), 10000);

        console.log("Successfully joined the session!");
    } catch (error) {
        console.error("Error during session join automation:", error);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

autojoinMeeting();