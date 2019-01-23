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
