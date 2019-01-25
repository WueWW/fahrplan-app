import React from 'react';
import { Dropdown, Segment } from 'semantic-ui-react';

export interface Props {
    options: string[];
    selectedDate: string;

    onDateSelected: (selectedDate: string) => void;
}

function formatDate(d: string): string {
    return new Date(d).toLocaleDateString('de-de', { weekday: 'long', year: undefined, month: 'long', day: 'numeric' });
}

function buildOptions(options: string[]) {
    return options.map(option => ({ text: formatDate(option), value: option }));
}

const SessionDatePicker: React.FunctionComponent<Props> = props => (
    <Segment>
        <Dropdown
            fluid
            options={buildOptions(props.options)}
            value={props.selectedDate}
            onChange={(e, p) => props.onDateSelected(p.value as string)}
        />
    </Segment>
);

export default SessionDatePicker;
