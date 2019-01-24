import React, { Component } from 'react';
import Hammer from 'react-hammerjs';
import { RouteComponentProps } from 'react-router';

import FavManager from '../component/FavManager';
import SessionDatePicker from '../component/SessionDatePicker';
import SessionTable from '../component/SessionTable';
import { Session, SessionList } from '../model/Session';

export interface Props extends RouteComponentProps<any> {
    sessions: SessionList;
    selectedDate?: string;
}

export interface State {}

class SessionViewer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.onDateSelected = this.onDateSelected.bind(this);
        this.onSwipe = this.onSwipe.bind(this);
    }

    selectedDate() {
        return this.props.selectedDate || this.defaultDate();
    }

    defaultDate() {
        return Object.keys(Session.partitionByDate(this.props.sessions)).sort()[0];
    }

    onDateSelected(selectedDate: string) {
        this.props.history.push(`/${selectedDate}`);
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
        let index = dates.findIndex(value => value === this.selectedDate());

        index++;

        if (index < dates.length) {
            this.onDateSelected(dates[index]);
        }
    }

    onSwipeRight() {
        // load next day (if any)
        const dates = Object.keys(Session.partitionByDate(this.props.sessions)).sort();
        const index = dates.findIndex(value => value === this.selectedDate());

        if (index > 0) {
            this.onDateSelected(dates[index - 1]);
        }
    }

    render() {
        const partitionedSessions = Session.partitionByDate(this.props.sessions);

        return (
            <Hammer direction="DIRECTION_HORIZONTAL" onSwipe={this.onSwipe}>
                <div>
                    <SessionDatePicker
                        options={Object.keys(partitionedSessions).sort()}
                        selectedDate={this.selectedDate()}
                        onDateSelected={this.onDateSelected}
                    />
                    <FavManager>
                        {fav => <SessionTable {...fav} sessions={partitionedSessions[this.selectedDate()]} />}
                    </FavManager>
                </div>
            </Hammer>
        );
    }
}

export default SessionViewer;
