import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './component/Header';
import InitStatusIndicatorOrApp from './component/InitStatusIndicatorOrApp';
import AppState, { InitStatus } from './model/AppState';
import SessionViewer from './page/SessionViewer';

export interface Props {}

const SESSION_DATA_URL = 'https://wueww.github.io/fahrplan-2019/sessions.json';

class App extends Component<Props, AppState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            status: InitStatus.FetchingSessionData,
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch(SESSION_DATA_URL);
            const data = await response.json();

            if (typeof data !== 'object' || !(data.sessions instanceof Array)) {
                throw new Error('sessions data malformed');
            }

            this.setState({
                status: InitStatus.InitializationComplete,
                sessions: data.sessions,
            });
        } catch (e) {
            this.setState({ status: InitStatus.InitializationFailed });
        }
    }

    render() {
        return (
            <Fragment>
                <Header />
                <InitStatusIndicatorOrApp {...this.state}>
                    {sessions => (
                        <Router>
                            <Switch>
                                <Route path="/" component={() => <SessionViewer sessions={sessions} />} />
                            </Switch>
                        </Router>
                    )}
                </InitStatusIndicatorOrApp>
            </Fragment>
        );
    }
}

export default App;
