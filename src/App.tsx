import React, { Component } from 'react';
import { Icon, Message } from 'semantic-ui-react';

import Header from './component/Header';
import SessionDatePicker from './component/SessionDatePicker';
import SessionTable from './component/SessionTable';
import { Session } from './model/Session';

export interface Props {}

export interface State {
    initFailed: boolean;
    sessions?: SessionList;
    selectedDate?: string;
}

type SessionList = Session[];
type PartitionedSessionList = { [key: string]: SessionList };

function extractDate(session: Session): string {
    return new Date(session.start).toISOString().substr(0, 10);
}

function partitionByDate(sessions: SessionList): PartitionedSessionList {
    return sessions.reduce(
        (acc: PartitionedSessionList, session) => {
            const key = extractDate(session);
            acc[key] = acc[key] || [];
            acc[key].push(session);
            return acc;
        },
        {} as PartitionedSessionList
    );
}

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            initFailed: false,
            sessions: undefined,
        };

        this.onDateSelected = this.onDateSelected.bind(this);
    }

    async componentDidMount() {
        try {
            const response = await fetch('sessions.json');
            const data = await response.json();

            if (typeof data !== 'object' || !(data.sessions instanceof Array)) {
                throw new Error('sessions data malformed');
            }

            this.setState({ sessions: data.sessions, selectedDate: Object.keys(partitionByDate(data.sessions))[0] });
        } catch (e) {
            this.setState({ initFailed: true });
        }
    }

    onDateSelected(selectedDate: string) {
        this.setState({ selectedDate });
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

        if (!this.state.selectedDate) {
            throw Error('selectedDate not set, but sessions are loaded');
        }

        const partitionedSessions = partitionByDate(this.state.sessions);

        return (
            <>
                <Header />
                <SessionDatePicker
                    options={Object.keys(partitionedSessions)}
                    selectedDate={this.state.selectedDate}
                    onDateSelected={this.onDateSelected}
                />
                <SessionTable sessions={partitionedSessions[this.state.selectedDate]} />
            </>
        );
    }
}

export default App;
