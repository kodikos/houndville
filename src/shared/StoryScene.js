import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import { SceneWrapper as CommonSceneWrapper } from './Common';

const SubSceneDiv = styled.div`
    width: 100%;
    height: 100%;
`;

//  Story scene is based on a set of subscenes

export default class StoryScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subscene: 'init'
        }
    } 

    SubScene = (props) => {
        if (props.name !== this.state.subscene) { return null;}
        return <SubSceneDiv>{props.children}</SubSceneDiv>;
    }

    SceneWrapper = (props) => {
        return (
            <CommonSceneWrapper onClick={this.changeSubSceneEvent}>
                {props.children}
            </CommonSceneWrapper>
        );
    }

    ChangeScene = (props) => {
        return (
            <this.SubScene name={props.name}>
                <Redirect push to={'/' + props.to} />
            </this.SubScene>
        );
    }

    changeSubScene = (sceneName) => {
        this.setState({
            subscene: sceneName
        });
    }

    changeSubSceneEvent = () => {
        const nextScene = this.decideNextSubScene(this.state.subscene);
        this.changeSubScene(nextScene);
    }

    decideNextSubScene(currentScene) {
        console.log('To be overridden');
    }
}
