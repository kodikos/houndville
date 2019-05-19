import React from 'react';
import styled from 'styled-components';

import StoryScene from '../shared/StoryScene';
import { SceneWrapper, TextBox } from '../shared/Common';
import BackgroundImage from './background.png';

const Background = styled.div`
    background: url(${BackgroundImage}) no-repeat center center fixed;
    background-size: cover;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 0;
`;

export default class ValleyScene extends StoryScene {

    nextSubSceneSwitcher(currentScene) {
        switch(currentScene) {
            case 'init': return 'tantalizing';
            case 'tantalizing' : return 'head-down';
            default: return 'init';
        }
    }

    render() {
        return (
            <SceneWrapper onClick={this.nextTextEvent}>
                <Background />
                <this.SubScene name="init">
                    <TextBox>
                        As you reach the top of the hill, Houndville appears beneath you
                        in the next valley
                    </TextBox>
                </this.SubScene>

                <this.SubScene name="tantalizing">
                    <TextBox>
                        For some reason it seems a tantalizing place
                    </TextBox>
                </this.SubScene>

                <this.SubScene name="head-down">
                    <TextBox>
                        You head down towards a bridge. As you get closer you
                        can see a special kind of gate
                    </TextBox>
                </this.SubScene>
            </SceneWrapper>
        );
    }
}
