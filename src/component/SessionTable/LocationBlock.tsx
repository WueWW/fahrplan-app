import React, { FunctionComponent } from 'react';
import { Card, Icon } from 'semantic-ui-react';

import { Location } from '../../model/Session';

export interface Props {
    location?: Location;
}

const LocationBlock: FunctionComponent<Props> = ({ location }) => {
    if (!location || !location.name) {
        return null;
    }

    return (
        <Card.Content extra>
            <Card.Description>
                <Icon name="globe" />
                {location.name}
            </Card.Description>
        </Card.Content>
    );
};

export default LocationBlock;
