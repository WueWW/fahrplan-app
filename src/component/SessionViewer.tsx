import React, { Component } from 'react';
import Hammer from 'react-hammerjs';

import { Session, SessionList } from '../model/Session';
import SessionDatePicker from './SessionDatePicker';
import SessionTable from './SessionTable';

export interface Props {
    sessions: SessionList;
}

export interface State {
    selectedDate: string;
}

class SessionViewer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.onDateSelected = this.onDateSelected.bind(this);
        this.onSwipe = this.onSwipe.bind(this);
        this.state = {
            selectedDate: Object.keys(Session.partitionByDate(props.sessions)).sort()[0],
        };
    }

    onDateSelected(selectedDate: string) {
        this.setState({ selectedDate });
    }

    onSwipe(event: HammerInput) {
        if (event.deltaX < 0) {
            this.onSwipeLeft();
        } else {
            this.onSwipeRight();
        }
    }

    onSwipeLeft() {
        // load next day (if any)
        const dates = Object.keys(Session.partitionByDate(this.props.sessions)).sort();
        let index = dates.findIndex(value => value === this.state.selectedDate);

        index++;

        if (index < dates.length) {
            this.setState({ selectedDate: dates[index] });
        }
    }

    onSwipeRight() {
        // load next day (if any)
        const dates = Object.keys(Session.partitionByDate(this.props.sessions)).sort();
        const index = dates.findIndex(value => value === this.state.selectedDate);

        if (index > 0) {
            this.setState({ selectedDate: dates[index - 1] });
        }
    }

    render() {
        const partitionedSessions = Session.partitionByDate(this.props.sessions);

        return (
            <Hammer direction="DIRECTION_HORIZONTAL" onSwipe={this.onSwipe}>
                <div>
                    <SessionDatePicker
                        options={Object.keys(partitionedSessions).sort()}
                        selectedDate={this.state.selectedDate}
                        onDateSelected={this.onDateSelected}
                    />
                    <SessionTable sessions={partitionedSessions[this.state.selectedDate]} />
                </div>
            </Hammer>
        );
    }
}

export default SessionViewer;
