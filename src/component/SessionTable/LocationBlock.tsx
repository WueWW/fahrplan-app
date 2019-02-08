import React, { FunctionComponent } from 'react';
import { Card, Icon } from 'semantic-ui-react';

import { Location } from '../../model/Session';

export interface Props {
    location?: Location;
}

const distanceDivStyle = { marginLeft: '1.5rem' };

const isMobileDevice = (): boolean => /iPad|iPhone|iPod|android/i.test(navigator.userAgent);

const LocationBlock: FunctionComponent<Props> = ({ location }) => {
    if (!location || !location.name) {
        return null;
    }

    const parts = location.name
        .split(/\n/)
        .map((x: string) => x.trim())
        .filter((x: string) => x);

    const geoLink =
        location.lat !== undefined &&
        location.lng !== undefined &&
        (isMobileDevice()
            ? `geo:${location.lat},${location.lng}`
            : `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}&zoom=16`);

    return (
        <Card.Content extra>
            <Card.Description>
                <Icon className="left floated" name="globe" />
                <div style={distanceDivStyle}>
                    <a href={geoLink || undefined} target={isMobileDevice() ? undefined : '_blank'}>
                        {parts[0]}
                    </a>
                </div>
                <div className="meta" style={distanceDivStyle}>
                    {parts.slice(1).join(', ')}
                </div>
            </Card.Description>
        </Card.Content>
    );
};

export default LocationBlock;
