import icalGenerator from 'ical-generator';

import { SessionList } from '../model/Session';

const generateIcal = (sessions: SessionList): string => {
    const cal = icalGenerator({ domain: 'app.wueww.de', name: 'WueWW Favoriten' });

    sessions.forEach(session =>
        cal.createEvent({
            uid: session.key,
            start: new Date(session.start),
            end: session.end ? new Date(session.end) : undefined,
            summary: session.title,
            description: session.description && session.description.long,
            location: session.location && session.location.name,
            geo:
                session.location && session.location.lat !== undefined && session.location.lng !== undefined
                    ? {
                          lat: session.location.lat,
                          lon: session.location.lng,
                      }
                    : undefined,
        })
    );

    return cal.toString();
};

export default generateIcal;
