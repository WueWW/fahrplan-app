import React, { Component } from 'react';
import Hammer from 'react-hammerjs';
import { RouteComponentProps } from 'react-router';

import { FavManagerProps } from '../component/FavManager';
import Footer from '../component/Footer';
import SessionDatePicker from '../component/SessionDatePicker';
import SessionTable from '../component/SessionTable';
import { Session, SessionList } from '../model/Session';

export interface Props extends FavManagerProps, RouteComponentProps<any> {
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
        const availableDates = Object.keys(Session.partitionByDate(this.props.sessions)).sort();
        const todayDate = new Date().toISOString().substr(0, 10);

        if (availableDates.includes(todayDate)) {
            return todayDate;
        }

        return availableDates[0];
    }

    onDateSelected(selectedDate: string) {
        this.props.history.replace(`/${selectedDate}`);
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
                    <SessionTable {...this.props} sessions={partitionedSessions[this.selectedDate()]} />

                    <Footer />
                </div>
            </Hammer>
        );
    }
}

export default SessionViewer;
