import { useEffect, useState } from 'react';
import { baseUrl } from '../enviranements/baseUrl';
import NewsCard from './NewsCard';
import '../layout/NewsTesla.css';
import img from '../assets/images/logoTesla.jpg';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');



const NewsTesla = () => {

    const [newsTesla, setNewsTesla] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [newsPerPage] = useState(9);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/news`);
                const data = await response.json();
                setNewsTesla(data);
            } catch (error) {
                console.error("An error occurred while fetching news:", error);
            }
        };

        fetchData();

    }, []);
    // écouter les mises à jour des données via Socket.io
    useEffect(() => {

        socket.on('dataUpdate', async (data) => {
            console.log('Received updated data:', data);
            setNewsTesla(data);
        });
    }, [socket]);// Déclenchement de l'effet lorsque la socket change



    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);

    };
    // Filtrage des actualités en fonction de recherche
    const filteredNews = Array.isArray(newsTesla) ? newsTesla.filter(newsItem =>
        newsItem.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];
    // Tri des actualités par date de publication
    const sortedNews = [...filteredNews].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    // Calculer l'index du dernier article sur la page
    const indexOfLastNews = currentPage * newsPerPage;
    // Calculer l'index du premier article sur la page
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    // Obtenir les articles actuellement affichés sur la page
    const currentNews = sortedNews.slice(indexOfFirstNews, indexOfLastNews);
    // Fonction pour changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (

        <div className="container">
            <div className="row">
                <div className="d-flex justify-content-center">
                    <img src={img} alt={img} style={{ width: '500px', height: '200px' }} />
                </div>
            </div>
            <div className="row">
                <div className="col d-flex justify-content-center mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        style={{ width: '500px', height: '30px' }}
                    />

                </div>

            </div>

            <div className="row">
                {currentNews.map((newsItem, index) => (
                    <NewsCard key={index} newsItem={newsItem} />
                ))}
            </div>
            <div className="d-flex justify-content-center">
                <nav>
                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(sortedNews.length / newsPerPage) }, (_, i) => (
                            <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                                <button onClick={() => paginate(i + 1)} className="page-link " >{i + 1}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default NewsTesla;