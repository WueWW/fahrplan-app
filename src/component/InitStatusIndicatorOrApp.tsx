import React, { Fragment, FunctionComponent } from 'react';
import { Icon, Message } from 'semantic-ui-react';

import AppState, { InitStatus } from '../model/AppState';
import { SessionList } from '../model/Session';

export type Props = AppState & { children: (sessions: SessionList) => React.ReactElement<any> };

const InitStatusIndicatorOrApp: FunctionComponent<Props> = props => {
    if (props.status === InitStatus.InitializationFailed) {
        return (
            <Message icon negative>
                <Icon name="warning sign" />
                <Message.Content>
                    <Message.Header>Fehler beim Laden der Sessiondaten</Message.Header>
                    <p>Die Sessiondaten konnten leider nicht geladen werden. Sorry ¯\_(ツ)_/¯</p>
                </Message.Content>
            </Message>
        );
    }

    if (props.status === InitStatus.FetchingSessionData) {
        return (
            <Message icon>
                <Icon name="circle notched" loading />
                <Message.Content>
                    <Message.Header>Einen Moment bitte...</Message.Header>
                    Die Sessiondaten werden gerade geladen.
                </Message.Content>
            </Message>
        );
    }

    return <Fragment>{props.children(props.sessions)} </Fragment>;
};

export default InitStatusIndicatorOrApp;
