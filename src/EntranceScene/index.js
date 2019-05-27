import React, { Component } from 'react';
import styled from 'styled-components';

import StoryScene from '../shared/StoryScene';
import { TextBox as BaseTextBox, Backdrop, ScoreBoard } from '../shared/Common';
import { Quiz, Question, Choice } from '../shared/Quiz';
import BackgroundImage from './background.png';

const Background = styled(Backdrop)`
    background-image: url(${BackgroundImage});
`;

const TextBox = styled(BaseTextBox)`
    top: auto;
    bottom: 2vh;
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
                <ScoreBoard progress={[1,2]} />
                <SubScene name="init">
                    <TextBox>
                        I can't believe it, no one is guarding the entrance
                    </TextBox>
                </SubScene>
            </SceneWrapper>
        );
    }
}
