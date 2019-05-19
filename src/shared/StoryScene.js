import React, { Component } from 'react';
import styled from 'styled-components';

import { SceneWrapper as CommonSceneWrapper } from './Common';

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
        return <div>{props.children}</div>;
    }

    SceneWrapper = (props) => {
        return (
            <CommonSceneWrapper onClick={this.changeSubSceneEvent}>
                {props.children}
            </CommonSceneWrapper>
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
