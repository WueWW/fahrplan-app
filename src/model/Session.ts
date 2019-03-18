export interface Location {
    name: string;
    lat?: number;
    lng?: number;
}

export interface Session {
    key: string;
    start: string;
    end: string | null;
    cancelled: boolean;
    host: {
        name: string;
        infotext?: string;
    };
    title: string;
    location?: Location;
    description?: {
        short?: string;
        long?: string;
    };
    tags?: string[];
    links?: {
        event?: string;
        host?: string;
    };
}

export type SessionList = Session[];
export type PartitionedSessionList = { [key: string]: SessionList };

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
