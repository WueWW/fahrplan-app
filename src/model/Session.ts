export interface Location {
    name: string;
    streetNo: string;
    zipcode: string;
    city: string;
    lat?: number;
    lng?: number;
}

export interface Session {
    id: number;
    start: string;
    end: string | null;
    cancelled: boolean;
    host: {
        id: number;
        name: string;
        infotext?: string;
        logo?: string;
        links?: {
            host?: string;
            facebook?: string;
            twitter?: string;
            youtube?: string;
            instagram?: string;
            xing?: string;
            linkedIn?: string;
        };
    };
    title: string;
    location: Location;
    description?: {
        short?: string;
        long?: string;
    };
    links?: {
        event?: string;
    };
}

export type SessionList = Session[];
export type PartitionedSessionList = { [key: string]: SessionList };

export function isSession(session: any): session is Session {
    if (typeof session !== 'object' || session === null) {
        return false;
    }

    return (
        typeof session.id === 'number' &&
        typeof session.start === 'string' &&
        (typeof session.end === 'string' || session.end === null) &&
        typeof session.cancelled === 'boolean' &&
        typeof session.host === 'object' &&
        session.host !== undefined &&
        typeof session.host.name === 'string' &&
        (typeof session.host.infotext === 'string' || session.host.infotext === undefined) &&
        typeof session.title === 'string'
        // FIXME not fully complete ...
    );
}

function extractDate(session: Session): string {
    return new Date(session.start).toISOString().substr(0, 10);
}

export namespace Session {
    export function partitionByDate(sessions: SessionList): PartitionedSessionList {
        return sessions.reduce(
            (acc: PartitionedSessionList, session) => {
                const key = extractDate(session);
                acc[key] = acc[key] || [];
                acc[key].push(session);
                return acc;
            },
            {} as PartitionedSessionList
        );
    }

    export function startTimeComparator(a: Session, b: Session) {
        if (a.start < b.start) return -1;
        if (a.start > b.start) return 1;
        return 0;
    }
}
