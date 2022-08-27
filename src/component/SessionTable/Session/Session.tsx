import './style.less';

import React, { useState } from 'react';
import { Card, Icon, Label } from 'semantic-ui-react';

import { Session as SessionType } from '../../../model/Session';
import LocationBlock from './LocationBlock';
import SessionDescription from './SessionDescription';
import EventLinkIcon from './EventLinkIcon';

export interface Props extends SessionType {
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export interface State {
    expanded: boolean;
}

function formatTime(dt: string): string {
    return new Date(dt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

const Session = (props: Props) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Card className={props.cancelled ? 'cancelled' : undefined}>
            <Card.Content>
                <Card.Header onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer' }}>
                    <span className="right floated">
                        <Icon name={expanded ? 'chevron down' : 'chevron right'} />
                    </span>
                    {props.title}
                </Card.Header>
                <Card.Meta>{props.host.name}</Card.Meta>
            </Card.Content>
            {expanded && props.cancelled && (
                <Card.Content extra>
                    <Card.Description>
                        <Label color="red">
                            <Icon name="ban" /> Die Session wurde abgesagt.
                        </Label>
                    </Card.Description>
                </Card.Content>
            )}
            {expanded && !props.cancelled && <SessionDescription description={props.description} />}
            {expanded && !props.cancelled && <LocationBlock location={props.location} />}

            <Card.Content extra>
                {(props.isFavorite || !props.cancelled) && (
                    <Icon
                        className="right floated"
                        name={props.isFavorite ? 'heart' : 'heart outline'}
                        color={props.isFavorite ? 'red' : undefined}
                        onClick={props.onToggleFavorite}
                        style={{ cursor: 'pointer' }}
                    />
                )}
                <EventLinkIcon link={props.links?.event} />
                <Icon name="clock outline" />
                {formatTime(props.start)}
                {props.end && ' - ' + formatTime(props.end)}
            </Card.Content>
        </Card>
    );
};

export default Session;
