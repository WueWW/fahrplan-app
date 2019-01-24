import React from 'react';
import { Card } from 'semantic-ui-react';

import { Session } from '../../model/Session';
import { FavManagerProps } from '../FavManager';
import DisplaySession from './Session';

export interface Props extends FavManagerProps {
    sessions: Session[];
}

const SessionTable: React.FunctionComponent<Props> = props => (
    <Card.Group centered doubling itemsPerRow="two">
        {props.sessions.map(session => {
            return (
                <DisplaySession
                    {...session}
                    isFavorite={session.key in props.favorites}
                    onToggleFavorite={
                        session.key in props.favorites
                            ? () => props.removeFavorite(session.key)
                            : () => props.addFavorite(session)
                    }
                />
            );
        })}
    </Card.Group>
);

export default SessionTable;
