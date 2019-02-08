import 'react-semantic-toasts/styles/react-semantic-alert.css';

import React, { Component, Fragment } from 'react';
import {
    HashRouter as Router, Route, RouteComponentProps, Switch, withRouter
} from 'react-router-dom';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';

import FavManager from './component/FavManager';
import Header from './component/Header';
import InitStatusIndicatorOrApp from './component/InitStatusIndicatorOrApp';
import PageToggle from './component/PageToggle';
import AppState, { InitStatus } from './model/AppState';
import FavoritesListPage from './page/FavoritesListPage';
import InfoPage from './page/InfoPage';
import SessionViewer from './page/SessionViewer';

export interface Props {}

const SESSION_DATA_URL = 'https://wueww.github.io/fahrplan-2019/sessions.json';
const updatesChannel = typeof BroadcastChannel !== 'undefined' && new BroadcastChannel('session-updates');

const PageToggleWithRouter = withRouter(PageToggle);

class App extends Component<Props, AppState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            status: InitStatus.FetchingSessionData,
        };

        this.onSessionDataUpdate = this.onSessionDataUpdate.bind(this);
    }

    processSessionJSON(data: any) {
        if (typeof data !== 'object' || !(data.sessions instanceof Array)) {
            throw new Error('sessions data malformed');
        }

        this.setState({
            status: InitStatus.InitializationComplete,
            sessions: data.sessions,
        });
    }

    async componentDidMount() {
        updatesChannel && updatesChannel.addEventListener('message', this.onSessionDataUpdate);

        try {
            const response = await fetch(SESSION_DATA_URL);
            this.processSessionJSON(await response.json());
        } catch (e) {
            this.setState({ status: InitStatus.InitializationFailed });
        }
    }

    componentWillUnmount() {
        updatesChannel && updatesChannel.removeEventListener('message', this.onSessionDataUpdate);
    }

    async onSessionDataUpdate(event: any) {
        const { cacheName, updatedUrl } = event.data.payload;

        try {
            const cache = await caches.open(cacheName);
            const response = await cache.match(updatedUrl);

            if (!response) {
                return;
            }

            this.processSessionJSON(await response.json());
            toast({
                title: 'Die Daten wurden erfolgreich aktualisiert',
                time: 1500,
            });
        } catch {
            console.warn('onSessionDataUpdate called, but updated failed');
        }
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <PageToggleWithRouter />
                    <Header />

                    <InitStatusIndicatorOrApp {...this.state}>
                        {sessions => (
                            <FavManager>
                                {fav => (
                                    <Switch>
                                        <Route path="/impressum" component={() => <InfoPage />} />
                                        <Route
                                            path="/favorites"
                                            component={() => <FavoritesListPage {...fav} sessions={sessions} />}
                                        />
                                        <Route
                                            path="/:date?"
                                            render={(route: RouteComponentProps<any>) => (
                                                <SessionViewer
                                                    {...fav}
                                                    {...route}
                                                    selectedDate={route.match.params.date}
                                                    sessions={sessions}
                                                />
                                            )}
                                        />
                                    </Switch>
                                )}
                            </FavManager>
                        )}
                    </InitStatusIndicatorOrApp>
                    <SemanticToastContainer position="bottom-center" />
                </Fragment>
            </Router>
        );
    }
}

function pwaInstallPrompt(e: any) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();

    window.removeEventListener('beforeinstallprompt', pwaInstallPrompt);

    toast({
        title: 'Fahrplan App',
        description: 'Die Fahrplan App kann als Progressive Web App auf den Startbildschirm hinzugefügt werden',
        time: 2500,
        onClick: () => e.prompt(),
    });
}

window.addEventListener('beforeinstallprompt', pwaInstallPrompt);

export default App;
