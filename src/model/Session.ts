export interface Session {
    key: string;
    start: string;
    end: string | null;
    host: {
        name: string;
        infotext?: string;
    };
    title: string;
    location?: {
        name: string;
        latitude: number;
        longitude: number;
    };
    description?: {
        short?: string;
        long?: string;
    };
    tags?: string[];
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
}
