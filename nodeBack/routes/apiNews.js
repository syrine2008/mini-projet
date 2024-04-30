const express = require("express") ; 
const router = express.Router() ; 


const service = require('../services/apiNewsService') ;

/**
 * Route pour récupérer toutes les actualités.
 * Endpoint: GET /
 * Retourne toutes les actualités sous forme de tableau JSON.
 */

router.get("/", async (req, res) => {
    try {
        const data = await service.getall();// Appel de la fonction pour récupérer toutes les actualités
        res.status(200).json(data);
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des données." });
    }
});

module.exports = router ; 