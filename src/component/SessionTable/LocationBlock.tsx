import React, { FunctionComponent } from 'react';
import { Card, Icon } from 'semantic-ui-react';

import { Location } from '../../model/Session';

export interface Props {
    location?: Location;
}

const distanceDivStyle = { marginLeft: '1.5rem' };

const isAppleDevice = (): boolean => /iPad|iPhone|iPod/i.test(navigator.userAgent);

const isAndroidDevice = (): boolean => /android/i.test(navigator.userAgent);

const isMobileDevice = (): boolean => isAppleDevice() || isAndroidDevice();

const geoLink = (location: Location): string | undefined => {
    if (location.lat === undefined || location.lng === undefined) {
        return undefined;
    }

    if (isAppleDevice()) {
        return `http://maps.apple.com/?ll=${location.lat},${location.lng}`;
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

    const parts = location.name
        .split(/\n/)
        .map((x: string) => x.trim())
        .filter((x: string) => x);

    return (
        <Card.Content extra>
            <Card.Description>
                <Icon className="left floated" name="globe" />
                <div style={distanceDivStyle}>
                    <a href={geoLink(location)} target={isMobileDevice() ? undefined : '_blank'}>
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
