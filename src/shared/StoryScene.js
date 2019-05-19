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
            <CommonSceneWrapper  onClick={this.changeSubScene}>
                {props.children}
            </CommonSceneWrapper>
        );
    }

    changeSubScene = () => {
        this.setState({
            subscene: this.decideNextSubScene(this.state.subscene)
        });
    }

    decideNextSubScene(currentScene) {
        console.log('To be overridden');
    }
}
