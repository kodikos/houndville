import React from 'react';
import styled from 'styled-components';

import HoundHeader from './shared/HoundHeader';
import { SceneWrapper } from './shared/Common';

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function App() {
  return (
    <Screen>
      <HoundHeader />
      <SceneWrapper>
          This will be the scene
      </SceneWrapper>
    </Screen>
  );
}

export default App;
