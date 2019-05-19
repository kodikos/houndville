import React from 'react';
import styled from 'styled-components';

import HoundHeader from './shared/HoundHeader';
import ValleyScene from './ValleyScene';

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function App() {
  return (
    <Screen>
      <HoundHeader />
      <ValleyScene />
    </Screen>
  );
}

export default App;
