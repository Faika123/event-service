const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver');  // Assure que chromedriver est installé et accessible

(async function example() {
  let driver = await new Builder()
    .forBrowser('firefox')
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    
    await driver.get('http://localhost:3006/ajouter');

    // Attendre que le formulaire soit chargé
    await driver.wait(until.elementLocated(By.name('titre')), 10000);

    // Remplir le formulaire
    await driver.findElement(By.name('titre')).sendKeys('concert fete de la musique');
    await driver.findElement(By.name('description')).sendKeys('Comme chaque année, le Théâtre Municipal de Tunis sera le théâtre de notre passion commune pour la musique le 21 juin!  Cette année, 180 artistes talentueux, âgés de 5 à 70 ans, se réunissent pour vous offrir une soirée inoubliable sous la baguette du maestro Hafedh Makni et du chef de choeur Mourad Gaâloul.');
    await driver.findElement(By.name('prix')).sendKeys('35');
    await driver.findElement(By.name('lieu')).sendKeys('Théâtre Municipal de Tunis');
    await driver.findElement(By.name('places_disponibles')).sendKeys('100');
    await driver.findElement(By.name('date_deb')).sendKeys('2024-05-15');
    await driver.findElement(By.name('date_fin')).sendKeys('2024-05-15');
    await driver.findElement(By.name('categorie_id')).sendKeys('35');
    await driver.findElement(By.name('photo_url')).sendKeys('/assets/img/fete.jpg');

    // Soumettre le formulaire
    await driver.findElement(By.name('submit')).click();

    // Attendre le message de succès
    await driver.wait(until.elementLocated(By.className('success-message')), 10000);

    // Vérifier que l'événement est ajouté
    const successMessage = await driver.findElement(By.className('success-message')).getText();
    console.log('Message de succès:', successMessage);

  } catch (error) {
    console.error('Une erreur est survenue:', error);
  } finally {
    await driver.quit();
  }
})();
