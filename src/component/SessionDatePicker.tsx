import React from 'react';
import { Dropdown, Icon, Segment } from 'semantic-ui-react';

import { formatDate } from '../util/DateUtil';

export interface Props {
    options: string[];
    selectedDate: string;

    onDateSelected: (selectedDate: string) => void;
}

function buildOptions(options: string[]) {
    return options.map(option => ({ text: formatDate(option), value: option }));
}

const SessionDatePicker: React.FunctionComponent<Props> = props => (
    <Segment>
        <Dropdown
            fluid
            trigger={
                <span>
                    <Icon name="calendar outline" /> {formatDate(props.selectedDate)}
                </span>
            }
            options={buildOptions(props.options)}
            value={props.selectedDate}
            onChange={(e, p) => props.onDateSelected(p.value as string)}
        />
    </Segment>
);

export default SessionDatePicker;
