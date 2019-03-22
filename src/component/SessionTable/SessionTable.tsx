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
                    {...session}
                    isFavorite={props.favorites.includes(session.key)}
                    onToggleFavorite={
                        props.favorites.includes(session.key)
                            ? () => props.removeFavorite(session.key)
                            : () => props.addFavorite(session)
                    }
                />
            );
        })}
    </Card.Group>
);

export default SessionTable;
