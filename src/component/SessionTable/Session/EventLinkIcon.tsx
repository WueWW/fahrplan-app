import React from 'react';
import { Icon } from 'semantic-ui-react';

const eventEmail = (link: string | undefined): string | undefined => {
    if (!link || link.indexOf('@') === -1) {
        return undefined;
    }

    return `mailto:${link}`;
};

const eventUrl = (link: string | undefined): string | undefined => {
    if (!link) {
        return undefined;
    }

    if (link.startsWith('http')) {
        return link;
    }

    if (link.startsWith('www.')) {
        return `http://${link}`;
    }

    return undefined;
};

interface EventLinkIconProps {
    link: string | undefined;
}

const EventLinkIcon = ({ link }: EventLinkIconProps) => {
    if (eventUrl(link)) {
        return (
            <a className="event-link right floated" href={eventUrl(link)}>
                <Icon name="linkify" style={{ cursor: 'pointer' }} />
            </a>
        );
    }

    if (eventEmail(link)) {
        return (
            <a className="event-link right floated" href={eventEmail(link)}>
                <Icon name="mail" style={{ cursor: 'pointer' }} />
            </a>
        );
    }

    return null;
};

export default EventLinkIcon;
