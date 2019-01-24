import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import FavManager, { FavManagerProps } from './component/FavManager';
import Header from './component/Header';
import InitStatusIndicatorOrApp from './component/InitStatusIndicatorOrApp';
import AppState, { InitStatus } from './model/AppState';
import { SessionList } from './model/Session';
import InfoPage from './page/InfoPage';
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

    router(sessions: SessionList, fav: FavManagerProps) {
        return (
            <Router>
                <Switch>
                    <Route path="/info" component={() => <InfoPage />} />
                    <Route
                        path="/:date?"
                        component={(route: any) => (
                            <SessionViewer
                                {...fav}
                                {...route}
                                selectedDate={route.match.params.date}
                                sessions={sessions}
                            />
                        )}
                    />
                </Switch>
            </Router>
        );
    }

    render() {
        return (
            <Fragment>
                <Header />
                <InitStatusIndicatorOrApp {...this.state}>
                    {sessions => <FavManager>{fav => this.router(sessions, fav)}</FavManager>}
                </InitStatusIndicatorOrApp>
            </Fragment>
        );
    }
}

export default App;
