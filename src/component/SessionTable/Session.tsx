import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

import { Session as SessionType } from '../../model/Session';

export interface Props extends SessionType {}

const Session: React.FunctionComponent<Props> = props => (
    <Card>
        <Card.Content>
            <Card.Header>{props.title}</Card.Header>
            <Card.Meta>wird schon wer machen</Card.Meta>
        </Card.Content>
        <Card.Content extra>
            <Icon name="clock" />
            10:00 - 12:00
        </Card.Content>
    </Card>
);

export default Session;
