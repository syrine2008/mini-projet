import React from 'react';
import image from '../assets/images/notfound.png';
import { Card, Button } from 'react-bootstrap';
import '../App.css';

const NewsCard = ({ newsItem }) => {
    return (

        <Card style={{ width: '400px', margin: '15px', border: 'none' }}>
            <Card.Body>
                {newsItem.urlToImage != null ? (
                    <Card.Img variant="top" src={newsItem.urlToImage} style={{ height: '200px' }} />
                ) : (
                    <Card.Img variant="top" src={image} style={{ height: '200px' }} />

                )}
                <Card.Title>{newsItem.title}</Card.Title>
                <Card.Text>
                    {newsItem.description}
                </Card.Text>
                <Button variant="danger" href={newsItem.url}>More</Button>
            </Card.Body>
        </Card>
      );
}

export default NewsCard;