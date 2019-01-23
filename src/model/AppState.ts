import { SessionList } from './Session';

export enum InitStatus {
    FetchingSessionData,
    InitializationFailed,
    InitializationComplete,
}

type AppState =
    | { status: InitStatus.FetchingSessionData }
    | { status: InitStatus.InitializationFailed }
    | { status: InitStatus.InitializationComplete; sessions: SessionList };

export default AppState;
