import { Card } from 'semantic-ui-react';
import { Session } from '../../../model/Session';
import React, { useState } from 'react';

interface SessionDescriptionProps {
    description: Session['description'];
}

const SessionDescription = (props: SessionDescriptionProps) => (
    <Card.Content extra>
        <Card.Description>{props.description?.short}</Card.Description>
    </Card.Content>
);

export default SessionDescription;
