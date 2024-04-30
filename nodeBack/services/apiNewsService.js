let data = require('../data/Tesla.json');
const { apiUrl } = require('../enviranements/dev');

const axios = require('axios');

let articles = [];


async function getall() {
   try {
      // Effectuer une requête HTTP GET à l'URL de l'API
      const response = await axios.get(apiUrl);

      // Récupérer les données de la réponse
      const data = response.data;
       // Retourner les données
      return data.articles;
   } catch (error) {
      // En cas d'erreur lors de la requête, afficher l'erreur dans la console
      console.error('Une erreur s\'est produite lors de la récupération des données :', error);
      // Retourner une liste vide en cas d'erreur
      return [];
   }
}


async function getById(id) {
   try {
      // chercher l'article par id 
      let item = getall().find(article => article.source.id == id);

      // Retourner l'article
      return item;
   } catch (error) {
      // En cas d'erreur lors de la requête, afficher l'erreur dans la console
      console.error('Une erreur s\'est produite lors de la récupération des données :', error);
      // Retourner une liste vide en cas d'erreur
      return [];
   }
}


module.exports = {
   getall,
   getById
   
}; 