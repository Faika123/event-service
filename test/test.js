const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Ouvrir la page d'ajout d'événement
    await driver.get('http://localhost:3006/ajouter'); // Remplacez l'URL par celle de votre application

    // Remplir le formulaire
    await driver.findElement(By.name('titre')).sendKeys('Mon Événement Test');
    await driver.findElement(By.name('description')).sendKeys('Ceci est un événement de test');
    await driver.findElement(By.name('prix')).sendKeys('10');
    await driver.findElement(By.name('lieu')).sendKeys('Ma ville');
    await driver.findElement(By.name('places_disponibles')).sendKeys('100');
    await driver.findElement(By.name('date_deb')).sendKeys('2024-05-15');
    await driver.findElement(By.name('date_fin')).sendKeys('2024-05-16');
    await driver.findElement(By.name('categorie_id')).sendKeys('1');
    await driver.findElement(By.name('photo_url')).sendKeys('/chemin/vers/photo.jpg'); // Mettez le chemin de votre photo

    // Soumettre le formulaire
    await driver.findElement(By.name('submit')).click();

    // Attendre le message de succès
    await driver.wait(until.elementLocated(By.className('success-message')), 5000);

    // Vérifier que l'événement est ajouté
    const successMessage = await driver.findElement(By.className('success-message')).getText();
    console.log('Message de succès:', successMessage);

    // Ajoutez ici des assertions pour vérifier que l'événement est bien ajouté dans la base de données

  } finally {
    await driver.quit();
  }
})();
