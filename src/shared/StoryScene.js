import React, { Component } from 'react';
import styled from 'styled-components';

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

    nextTextEvent = () => {
        this.setState({
            subscene: this.nextSubSceneSwitcher(this.state.subscene)
        });
    }

    nextSubSceneSwitcher(currentScene) {
        console.log('To be overridden');
    }
}
