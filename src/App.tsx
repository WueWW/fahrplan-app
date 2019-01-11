import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

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
            <div className="App">
                <header className="App-header">
                    {this.state.sessions ? <SessionTable sessions={this.state.sessions} /> : 'still loading data ...'}
                    <div>
                        <Button primary={true}>Click Here</Button>
                    </div>
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
