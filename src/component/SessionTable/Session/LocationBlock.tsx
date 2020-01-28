import React, { FunctionComponent } from 'react';
import { Card, Icon } from 'semantic-ui-react';

import { Location } from '../../../model/Session';
import { isAndroidDevice, isAppleDevice, isMobileDevice } from '../../../util/mobile';

export interface Props {
    location?: Location;
}

const distanceDivStyle = { marginLeft: '1.5rem' };

const geoLink = (location: Location): string | undefined => {
    if (location.lat === undefined || location.lng === undefined) {
        return undefined;
    }

    if (isAppleDevice()) {
        return `http://maps.apple.com/?daddr=${location.lat},${location.lng}&z=16`;
    }

    if (isAndroidDevice()) {
        return `geo:${location.lat},${location.lng}`;
    }

    return `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}&zoom=16`;
};

const LocationBlock: FunctionComponent<Props> = ({ location }) => {
    if (!location || !location.name) {
        return null;
    }

    return (
        <Card.Content extra>
            <Card.Description>
                <Icon className="left floated" name="globe" />
                <div style={distanceDivStyle}>
                    <a href={geoLink(location)} target={isMobileDevice() ? undefined : '_blank'}>
                        {location.name}
                    </a>
                </div>
                <div className="meta" style={distanceDivStyle}>
                    {location.streetNo}, {location.zipcode} {location.city}
                </div>
            </Card.Description>
        </Card.Content>
    );
};

export default LocationBlock;
