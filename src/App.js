import React from 'react';
import styled from 'styled-components';

import HoundHeader from './shared/HoundHeader';
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
      <EntranceScene />
    </Screen>
  );
}

export default App;
