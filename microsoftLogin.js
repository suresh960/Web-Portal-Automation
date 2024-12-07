const { Builder, By, Key, until } = require('selenium-webdriver');

async function microsoftLogin() {
    const driver = new Builder().forBrowser('chrome').build();

    try {
        // Replace with your actual login page URL
        const loginUrl = 'https://staging-portal.argenie.net/';
        await driver.get(loginUrl);

        // Wait for the Google button to appear
        console.log("Waiting for  Microsoft button...");
        const googleButton = await driver.wait(until.elementLocated(By.xpath("/html/body/div/div[1]/div/div/div/form/div[2]/div/div[2]/button[2]")), 10000);
        console.log("Google button found, clicking...");
        await googleButton.click();

        // Wait for the Google login page to load
        console.log("Waiting for Microsoft login page...");
        await driver.wait(until.urlContains('login.microsoftonline.com'), 10000);

        // Interact with the email input field
        const emailField = await driver.wait(until.elementLocated(By.id('i0116')), 10000);
        await driver.wait(until.elementIsVisible(emailField), 10000); // Ensure it's visible
        await emailField.click(); // Focus on the input field
        await emailField.sendKeys('oneten07@outlook.com');
        console.log("Email entered, clicking Next...");
        const nextButton = await driver.wait(until.elementLocated(By.xpath("/html/body/div/form[1]/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[3]/div/div/div/div[4]/div/div/div/div/input")), 10000);
        await nextButton.click();
        // Add a short delay to wait for the password field
        await driver.sleep(2000); // Wait for animations or transitions

        // Wait for the password field and enter password
        const passwordField = await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/div/div/div/div[2]/div[1]/div/div/div/div/div[2]/div[2]/div/form/div[3]/div/div/input")), 10000);
        await driver.wait(until.elementIsVisible(passwordField), 10000); // Ensure it's visible
        await driver.executeScript("arguments[0].scrollIntoView(true);", passwordField); // Scroll into view
        await passwordField.click(); // Focus on the input field
        await passwordField.sendKeys('Kingfisher@12');
        console.log("Password entered, submitting...");
        await passwordField.sendKeys(Key.RETURN);

        // Optionally wait for the redirect back to your app
        console.log("Waiting for redirection back to the app...");
        await driver.wait(until.urlContains('portal.argenie.ai'), 10000);

        console.log("Google login successful!");
    } catch (error) {
        console.error("Error during Microsoft login automation:", error);
    } finally {
        // Close the browser
        await driver.quit();
    }
}

microsoftLogin();