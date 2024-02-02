const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

const fs = require('fs');

async function loginTest() {
    // launch the browser
    let driver = await new Builder().forBrowser("chrome").build();
    try {
        //navigate to travelio login page
        await driver.get("https://www.travelio.com/");

        // Waiting pop up' show
        await driver.wait(until.elementLocated(By.id('tpmModal')), 5000);
        
        // Take Screenshot 1 and Save to Local Storage
        await driver.sleep(2000);
        const screenshotFirst = await driver.takeScreenshot();
        fs.writeFileSync('screenshot-first.png', screenshotFirst, 'base64');
        
        // Get element close button in modal 
        const closeButton = await driver.findElement(By.css('i[data-dismiss="modal"]'));
        await closeButton.click();
        
        // Select login button and invoke click action
        const loginButton = await driver.findElement(By.id('loginBtn'));
        await loginButton.click();
        
        await driver.wait(until.elementLocated(By.id('loginModal')), 5000);
        
        // Take Screenshot 2 and Save to Local Storage
        await driver.sleep(2000);
        const screenshotSecond = await driver.takeScreenshot();
        fs.writeFileSync('screenshot-second.png', screenshotSecond, 'base64');

        // Select input elements and fill them out
        await driver.findElement(By.id("login-email")).sendKeys("jasmineiren14@gmail.com");
        await driver.findElement(By.id("login-password")).sendKeys("Password1");
        
        // Take Screenshot 4 and Save to Local Storage
        await driver.sleep(2000);
        const screenshotThird = await driver.takeScreenshot();
        fs.writeFileSync('screenshot-third.png', screenshotThird, 'base64');

        //If login details are correct we wiil be redirected to the welcome page
        await driver.findElement(By.id("login-modal-btn")).click();
        //On succesful login get page title

        //Check page title, to confirm login was successful
        const pageTitle = await driver.getTitle();
        // assert usign node assertion
        assert.strictEqual(pageTitle,"Sewa Apartemen, Rumah, Villa & Guest House | Travelio.com");
        //Check if redirect to login page was successfull
        await driver.wait(until.titleIs("Sewa Apartemen, Rumah, Villa & Guest House | Travelio.com"), 4000);

        // Take Screenshot 4 and Save to Local Storage
        await driver.sleep(2000);
        const screenshotFourth = await driver.takeScreenshot();
        fs.writeFileSync('screenshot-fourth.png', screenshotFourth, 'base64');

    } finally {
      await driver.quit();
    }
  }
  loginTest();