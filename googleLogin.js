const { Builder, By, Key, until } = require('selenium-webdriver');

async function googleLogin() {
    const driver = new Builder().forBrowser('chrome').build();

    try {
        // Replace with your actual login page URL
        const loginUrl = 'https://staging-portal.argenie.net/';
        await driver.get(loginUrl);

        // Wait for the Google button to appear
        console.log("Waiting for Google button...");
        const googleButton = await driver.wait(until.elementLocated(By.xpath("/html/body/div/div[1]/div/div/div/form/div[2]/div/div[2]/button[1]")), 10000);
        console.log("Google button found, clicking...");
        await googleButton.click();

        // Wait for the Google login page to load
        console.log("Waiting for Google login page...");
        await driver.wait(until.urlContains('accounts.google.com'), 10000);

        // Interact with the email input field
        const emailField = await driver.wait(until.elementLocated(By.id('identifierId')), 10000);
        await driver.wait(until.elementIsVisible(emailField), 10000); // Ensure it's visible
        await emailField.click(); // Focus on the input field
        await emailField.sendKeys('realkme12@gmail.com');
        console.log("Email entered, clicking Next...");
        const nextButton = await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/div[1]/div[2]/c-wiz/div/div[3]/div/div[1]/div/div/button/span")), 10000);
        await nextButton.click();
        // Add a short delay to wait for the password field
        await driver.sleep(2000); // Wait for animations or transitions

        // Wait for the password field and enter password
        const passwordField = await driver.wait(until.elementLocated(By.className('whsOnd zHQkBf')), 20000);
        await driver.wait(until.elementIsVisible(passwordField), 10000); // Ensure it's visible
        await driver.executeScript("arguments[0].scrollIntoView(true);", passwordField); // Scroll into view
        await passwordField.click(); // Focus on the input field
        await passwordField.sendKeys('oviovi@123');
        console.log("Password entered, submitting...");
        await passwordField.sendKeys(Key.RETURN);

        // Optionally wait for the redirect back to your app
        console.log("Waiting for redirection back to the app...");
        await driver.wait(until.urlContains('portal.argenie.ai'), 10000);

        console.log("Google login successful!");
    } catch (error) {
        console.error("Error during Google login automation:", error);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

googleLogin();

