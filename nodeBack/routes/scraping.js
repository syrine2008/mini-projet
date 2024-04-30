const express = require("express");
const router = express.Router();
const service = require('../services/ScrapingService');

/**
 * Route pour effectuer le scraping de données.
 * Endpoint: GET /
 * Cette route utilise le service ScrapingService pour récupérer et scraper les données.
 * Elle renvoie les données scrapées sous forme de réponse JSON.
 */

router.get('/', async (req, res) => {
    try {
        const data = await service.scrapeData();// Appel de la fonction pour effectuer le scraping de données
        res.json(data);
    } catch (error) {
        console.error('Error scraping data:', error);
        res.status(500).json({ error: 'An error occurred while scraping data.' });
    }
});

module.exports = router;