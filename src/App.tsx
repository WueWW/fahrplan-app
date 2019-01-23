import React, { Component } from 'react';
import { Icon, Message } from 'semantic-ui-react';

import Header from './component/Header';
import SessionViewer from './component/SessionViewer';
import { SessionList } from './model/Session';

export interface Props {}

export interface State {
    initFailed: boolean;
    sessions?: SessionList;
}

const SESSION_DATA_URL = 'https://wueww.github.io/fahrplan-2019/sessions.json';

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            initFailed: false,
            sessions: undefined,
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
                sessions: data.sessions,
            });
        } catch (e) {
            this.setState({ initFailed: true });
        }
    }

    render() {
        if (this.state.initFailed) {
            return (
                <Message icon negative>
                    <Icon name="warning sign" />
                    <Message.Content>
                        <Message.Header>Fehler beim Laden der Sessiondaten</Message.Header>
                        <p>Die Sessiondaten konnten leider nicht geladen werden. Sorry ¯\_(ツ)_/¯</p>
                    </Message.Content>
                </Message>
            );
        }

        if (!this.state.sessions) {
            return (
                <Message icon>
                    <Icon name="circle notched" loading />
                    <Message.Content>
                        <Message.Header>Einen Moment bitte...</Message.Header>
                        Die Sessiondaten werden gerade geladen.
                    </Message.Content>
                </Message>
            );
        }

        return (
            <>
                <Header />
                <SessionViewer sessions={this.state.sessions} />
            </>
        );
    }
}

export default App;
