import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import HoundHeader from './shared/HoundHeader';
import ValleyScene from './ValleyScene';
import EntranceScene from './EntranceScene';

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function App() {
  return (
    <Screen>
      <HoundHeader />
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ValleyScene} />
            <Route exact path="/entrance" component={EntranceScene} />
          </Switch>
        </BrowserRouter>
    </Screen>
  );
}

export default App;
