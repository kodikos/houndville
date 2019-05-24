import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import StoryScene from '../shared/StoryScene';
import { TextBox, Backdrop } from '../shared/Common';
import { Quiz, Question, Choice } from '../shared/Quiz';
import BackgroundImage from './background.png';

const Background = styled(Backdrop)`
    background-image: url(${BackgroundImage});
`;

export default class ValleyScene extends StoryScene {

    decideNextSubScene(currentScene) {
        switch(currentScene) {
            case 'init': return 'tantalizing';
            case 'tantalizing' : return 'head-down';
            case 'head-down': return 'quiz-gate-name';
            case 'quiz-gate-name' : return 'quiz-gate-name';
            case 'quiz-drawbridge' : return 'over-the-bridge';
            case 'quiz-moat' :
            case 'quiz-portcullis' :
                return 'quiz-gate-name';
            case 'over-the-bridge' : return 'over-the-bridge';
            default: return 'init';
        }
    }

    handleQuizAnswer = (next, isCorrect) => {
        this.changeSubScene(next);
    }

    render() {
        const { SubScene, SceneWrapper, ChangeScene } = this;
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

                <SubScene name="quiz-gate-name">
                    <Quiz onAnswer={this.handleQuizAnswer}>
                        <Question>What is the name of a gate that drops down 
                            over water?</Question>
                        <Choice next="quiz-drawbridge">Drawbridge</Choice>
                        <Choice next="quiz-moat">Moat</Choice>
                        <Choice next="quiz-portcullis">Portcullis</Choice>
                    </Quiz>
                </SubScene>

                <SubScene name="quiz-drawbridge">
                    <TextBox>
                        Correct! It's called this because it has to be drawn up by
                        chains to close it
                    </TextBox>
                </SubScene>

                <SubScene name="quiz-moat">
                    <TextBox>
                        Sorry, that's wrong. The moat is the name for the water
                        surrounding a fortification
                    </TextBox>
                </SubScene>

                <SubScene name="quiz-portcullis">
                    <TextBox>
                        Sorry, that's wrong. A portcullis is a gate that comes down
                        from above, usually from the ceiling of a gatehouse entrance
                    </TextBox>
                </SubScene>

                <SubScene name="over-the-bridge">
                    <TextBox>
                        <Link to="/entrance">Click here to proceed to the drawbridge</Link>
                    </TextBox>
                </SubScene>
            </SceneWrapper>
        );
    }
}
