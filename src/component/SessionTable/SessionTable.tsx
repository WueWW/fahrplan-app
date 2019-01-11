import React from 'react';

import { Session } from '../../model/Session';
import SessionComponent from './Session';

export interface Props {
    sessions: Session[];
}

const SessionTable: React.FunctionComponent<Props> = props => (
    <ul>
        {props.sessions.map(session => (
            <SessionComponent {...session} />
        ))}
    </ul>
);

export default SessionTable;
