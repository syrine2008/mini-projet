const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeData() {
try {
    const url = "https://react-bootstrap.netlify.app/docs/components/cards/" ; 
     const response = await axios.get(url);
    const $ = cheerio.load(response.data);

  console.log(response.data) ; 
    const data = [];
    

    $('html').each((index, element) => {
       
        const item = $(element).text();
        data.push(item);
    });

    return response.data;
    
} catch (error) {
    console.error('Erreur lors du scraping des données :', error);
    throw error; 
}
  
}

module.exports = { scrapeData };