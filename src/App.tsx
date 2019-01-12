import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import SessionTable from './component/SessionTable';
import { Session } from './model/Session';

export interface Props {}

export interface State {
    sessions?: Session[];
}

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            sessions: undefined,
        };
    }

    async componentDidMount() {
        const response = await fetch('sessions.json');
        const data = await response.json();

        if (typeof data !== 'object' || !(data.sessions instanceof Array)) {
            throw new Error('sessions data malformed');
        }

        this.setState({ sessions: data.sessions });
    }

    render() {
        return (
            <Container>
                {this.state.sessions ? <SessionTable sessions={this.state.sessions} /> : 'still loading data ...'}
            </Container>
        );
    }
}

export default App;
