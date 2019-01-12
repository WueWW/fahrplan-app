import React from 'react';
import { Card } from 'semantic-ui-react';

import { Session } from '../../model/Session';
import SessionComponent from './Session';

export interface Props {
    sessions: Session[];
}

const SessionTable: React.FunctionComponent<Props> = props => (
    <Card.Group centered doubling itemsPerRow="two">
        {props.sessions.map(session => (
            <SessionComponent {...session} />
        ))}
    </Card.Group>
);

export default SessionTable;
