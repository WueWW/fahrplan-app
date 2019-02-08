import React, { FunctionComponent } from 'react';
import { Card, Icon } from 'semantic-ui-react';

import { Location } from '../../model/Session';

export interface Props {
    location?: Location;
}

const distanceDivStyle = { marginLeft: '1.5rem' };

const LocationBlock: FunctionComponent<Props> = ({ location }) => {
    if (!location || !location.name) {
        return null;
    }

    const parts = location.name
        .split(/\n/)
        .map((x: string) => x.trim())
        .filter((x: string) => x);

    return (
        <Card.Content extra>
            <Card.Description>
                <Icon className="left floated" name="globe" />
                <div style={distanceDivStyle}>{parts[0]}</div>
                <div className="meta" style={distanceDivStyle}>
                    {parts.slice(1).join(', ')}
                </div>
            </Card.Description>
        </Card.Content>
    );
};

export default LocationBlock;
