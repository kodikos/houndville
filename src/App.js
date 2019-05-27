import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import HoundHeader from './shared/HoundHeader';
import ValleyScene from './ValleyScene';
import EntranceScene from './EntranceScene';

const Screen = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const PageWrapper = (props) => 
    <Screen>
        <HoundHeader />
        {props.children}
    </Screen>;

const RoutingWrapper = (props) =>
    <HashRouter>
        <Switch>
            {props.children}
        </Switch>
    </HashRouter>;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: []
        }
    }

    onCompleted(stage) {
        if (this.state.completed.includes(stage)) {
            return;
        }

        this.setState({
            completed: Array.concat(this.state.completed, [stage])
        });
    }

    render() {
        return (
            <PageWrapper>
                <RoutingWrapper>
                    <Route exact path="/" component={ValleyScene} />
                    <Route exact path="/entrance" component={EntranceScene} />
                </RoutingWrapper>
            </PageWrapper>
        );
    }
}

export default App;
