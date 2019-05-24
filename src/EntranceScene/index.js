import React, { Component } from 'react';
import styled from 'styled-components';

import StoryScene from '../shared/StoryScene';
import { TextBox, Backdrop } from '../shared/Common';
import { Quiz, Question, Choice } from '../shared/Quiz';
import BackgroundImage from './background.png';

const Background = styled(Backdrop)`
    background-image: url(${BackgroundImage});
`;

export default class EntranceScene extends StoryScene {

    decideNextSubScene(currentScene) {
        switch(currentScene) {
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
                        I can't believe it, no one is guarding the entrance
                    </TextBox>
                </SubScene>
            </SceneWrapper>
        );
    }
}
