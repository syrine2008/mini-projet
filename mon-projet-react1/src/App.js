import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from '../src/components/NavBar';
import NewsTesla from '../src/components/NewsTesla';
import MyScrap from '../src/components/Scraping';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';

function App() {
  return (
    <>
      <div className="App">
        <MyNavbar />
        <Container>
          <Tabs defaultActiveKey="news" id="app-tabs">
            <Tab eventKey="news" title="News Tesla">
              <NewsTesla />
            </Tab>
            <Tab eventKey="scrap" title="Scraping">
              <MyScrap />
            </Tab>
          </Tabs>
        </Container>
      </div>
    </>
  );
}

export default App;