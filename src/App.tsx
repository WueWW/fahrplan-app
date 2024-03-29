import 'react-semantic-toasts/styles/react-semantic-alert.css';

import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';

import FavManager from './component/FavManager';
import Header from './component/Header';
import InitStatusIndicatorOrApp from './component/InitStatusIndicatorOrApp';
import Layout from './component/Layout/Layout';
import PageToggleButton from './component/PageToggleButton';
import AppState, { InitStatus } from './model/AppState';
import FavoritesListPage from './page/FavoritesListPage';
import InfoPage from './page/InfoPage';
import SessionViewer from './page/SessionViewer';

export interface Props {}

const SESSION_DATA_URL = 'https://backend.timetable.wueww.de/export/session.json';
const updatesChannel = typeof BroadcastChannel !== 'undefined' && new BroadcastChannel('session-updates');

const PageToggleWithRouter = withRouter(PageToggleButton);

class App extends Component<Props, AppState> {
    private lastFetch?: number;

    constructor(props: Props) {
        super(props);

        this.state = {
            status: InitStatus.FetchingSessionData,
        };
    }

    processSessionJSON = (data: any) => {
        if (typeof data !== 'object' || !(data.sessions instanceof Array)) {
            throw new Error('sessions data malformed');
        }

        this.setState({
            status: InitStatus.InitializationComplete,
            sessions: data.sessions,
        });
    };

    fetchSessionJSON = async () => {
        try {
            if (this.lastFetch && (Date.now() - this.lastFetch) / 60e3 < 30) {
                console.log('skipping auto-update, last fetch < 30 minutes ago');
                return;
            }

            const response = await fetch(SESSION_DATA_URL);
            this.processSessionJSON(await response.json());
            this.lastFetch = Date.now();
        } catch (e) {
            this.setState({ status: InitStatus.InitializationFailed });
        }
    };

    componentDidMount() {
        updatesChannel && updatesChannel.addEventListener('message', this.onSessionDataUpdate);
        document.addEventListener('visibilitychange', this.onVisibilityChange);

        this.fetchSessionJSON();
    }

    componentWillUnmount() {
        updatesChannel && updatesChannel.removeEventListener('message', this.onSessionDataUpdate);
        document.removeEventListener('visibilitychange', this.onVisibilityChange);
    }

    onVisibilityChange = () => {
        if (document.visibilityState !== 'visible') {
            return;
        }

        this.fetchSessionJSON();
    };

    onSessionDataUpdate = async (event: any) => {
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
    };

    render() {
        return (
            <Router>
                <Layout
                    Header={
                        <>
                            <PageToggleWithRouter />
                            <Header />
                        </>
                    }
                >
                    <InitStatusIndicatorOrApp {...this.state}>
                        {(sessions) => (
                            <FavManager>
                                {(fav) => (
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
                </Layout>
            </Router>
        );
    }
}

function pwaInstallPrompt(e: any) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();

    window.removeEventListener('beforeinstallprompt', pwaInstallPrompt);

    toast(
        {
            title: 'Fahrplan App',
            description: 'Die Fahrplan App kann als Progressive Web App auf den Startbildschirm hinzugefügt werden',
            time: 2500,
        },
        () => undefined,
        () => e.prompt()
    );
}

window.addEventListener('beforeinstallprompt', pwaInstallPrompt);

export default App;
