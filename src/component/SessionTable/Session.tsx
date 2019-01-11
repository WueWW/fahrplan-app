import React from 'react';

import { Session as SessionType } from '../../model/Session';

export interface Props extends SessionType {}

const Session: React.FunctionComponent<Props> = props => <li>{props.title}</li>;

export default Session;
