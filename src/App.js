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

const NotEnoughPointsNotice = styled.div`
  width: 50vw;
  margin: 25vh 25vw;
  padding: 5vh 5vw;
  border: 3px solid black;
  border-radius: 5vh;
  background: red;
  color: white;
  text-align: center;
  font-size: 2.5em;
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

    SceneRoute = ({ component: Component, ...sceneProps}) => {
        if (sceneProps.requires &&
            !this.state.completed.includes(sceneProps.requires)) {
            return (
                <NotEnoughPointsNotice>
                    You do not have enough points to access this part
                    of the game yet!
                </NotEnoughPointsNotice>
            );
        }

        return <Route {...sceneProps}
            render={(props) => {
                return (<Component
                    {...props}
                    progress={this.state.completed}
                    onCompleted={(stage) => this.onCompleted(stage)}
                  />);
            }}
        />
    };

    render() {
        const { SceneRoute } = this;
        return (
            <PageWrapper>
                <RoutingWrapper>
                    <SceneRoute exact path="/" component={ValleyScene} />
                    <SceneRoute path="/entrance" component={EntranceScene} requires="valley" />
                </RoutingWrapper>
            </PageWrapper>
        );
    }
}

export default App;
