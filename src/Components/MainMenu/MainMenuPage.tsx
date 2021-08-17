import React from 'react';
import UseNavigation from '../../hooks/UseNavigation';

import Button from '../styles/Button';
import { Page, Title } from '../styles/globalStyles';
import { ButtonsContainer } from './MainMenu.elements';

const MainMenuPage = () => {
  const { navToP4Local, navToP4online, navToP4vsIa } = UseNavigation();

  return (
    <Page>
      <Title>Puissance 4</Title>
      <ButtonsContainer>
        <Button onClick={navToP4Local}>2 joueurs</Button>
        <Button onClick={navToP4vsIa}>Contre l&apos;IA</Button>
        <Button onClick={navToP4online}>En ligne</Button>
      </ButtonsContainer>
    </Page>
  );
};

export default MainMenuPage;
