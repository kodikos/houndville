import React from 'react';
import styled from 'styled-components';

import StoryScene from '../shared/StoryScene';
import { SceneWrapper } from '../shared/Common';

export default class EntranceScene extends StoryScene {

    nextSubSceneSwitcher(currentScene) {
        switch(currentScene) {
            case 'init': return 'scene2';
            default: return 'init';
        }
    }

    render() {
        return (
            <SceneWrapper onClick={this.nextTextEvent}>
                Hello from the scene!
                <this.SubScene name="init">
                    This is the intro subscene
                </this.SubScene>

                <this.SubScene name="scene2">
                    This is the next subscene
                </this.SubScene>
            </SceneWrapper>
        );
    }
}
