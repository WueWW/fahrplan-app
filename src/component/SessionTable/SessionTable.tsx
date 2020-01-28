import React from 'react';
import { Card } from 'semantic-ui-react';

import { Session } from '../../model/Session';
import { FavManagerProps } from '../FavManager';
import DisplaySession from './Session';

export interface Props extends FavManagerProps {
    sessions: Session[];
}

const SessionTable: React.FunctionComponent<Props> = props => (
    <Card.Group doubling itemsPerRow="two">
        {props.sessions.sort(Session.startTimeComparator).map(session => {
            return (
                <DisplaySession
                    key={session.id}
                    {...session}
                    isFavorite={props.favorites.includes(session.id)}
                    onToggleFavorite={
                        props.favorites.includes(session.id)
                            ? () => props.removeFavorite(session.id)
                            : () => props.addFavorite(session)
                    }
                />
            );
        })}
    </Card.Group>
);

export default SessionTable;
