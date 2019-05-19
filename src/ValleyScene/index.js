import React from 'react';
import styled from 'styled-components';

import StoryScene from '../shared/StoryScene';
import { TextBox, Backdrop } from '../shared/Common';
import BackgroundImage from './background.png';

const Background = styled(Backdrop)`
    background-image: url(${BackgroundImage});
`;

export default class ValleyScene extends StoryScene {

    decideNextSubScene(currentScene) {
        switch(currentScene) {
            case 'init': return 'tantalizing';
            case 'tantalizing' : return 'head-down';
            default: return 'init';
        }
    }

    render() {
        const { SubScene, SceneWrapper } = this;
        return (
            <SceneWrapper>
                <Background />
                <SubScene name="init">
                    <TextBox>
                        As you reach the top of the hill, Houndville appears beneath you
                        in the next valley
                    </TextBox>
                </SubScene>

                <SubScene name="tantalizing">
                    <TextBox>
                        For some reason it seems a tantalizing place
                    </TextBox>
                </SubScene>

                <SubScene name="head-down">
                    <TextBox>
                        You head down towards a bridge. As you get closer you
                        can see a special kind of gate
                    </TextBox>
                </SubScene>
            </SceneWrapper>
        );
    }
}
