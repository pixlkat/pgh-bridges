import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { BridgesListPage } from './features/bridges/BridgeListPage';
import { BridgeFooter } from './features/bridges/BridgeFooter';

const App: React.FC = () => {
  return (
    <Container className={'p-3 d-flex flex-column h-100'}>
      <Jumbotron>
        <h1 className={'header'}>Pittsburgh Bridge Data</h1>
      </Jumbotron>
      <BridgesListPage />
      <BridgeFooter />
     </Container>

);
};

export default App;
