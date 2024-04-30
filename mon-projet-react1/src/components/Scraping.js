import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { baseUrl } from '../enviranements/baseUrl';

/**
 * Composant MyScrap
 * 
 * Ce composant affiche le contenu HTML récupéré depuis l'URL de scraping spécifiée dans baseUrl.
 * Il permet également à l'utilisateur de rechercher dans le contenu HTML.
 */

const MyScrap = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [datafetch, setDatafetch] = useState('');

    useEffect(() => {
           // Fonction asynchrone pour récupérer les données depuis l'URL de scraping
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/scraping`);
                const data = await response.json();
                setDatafetch(data);
                console.log(data);
            } catch (error) {
                console.error("An error occurred while fetching news:", error);
            }
        };

        fetchData();

    }, []);

  


    return (
        <div className="container">
             <div dangerouslySetInnerHTML={{ __html: datafetch }}    />
        </div>
    );
}

export default MyScrap;