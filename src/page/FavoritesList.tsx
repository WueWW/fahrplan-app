import React, { Fragment, FunctionComponent } from 'react';
import { Icon, Message } from 'semantic-ui-react';

import { FavManagerProps } from '../component/FavManager';
import Footer from '../component/Footer';
import SessionTable from '../component/SessionTable';
import { Session, SessionList } from '../model/Session';
import { formatDate } from '../util/DateUtil';

export interface Props extends FavManagerProps {
    sessions: SessionList;
}

const FavoritesList: FunctionComponent<Props> = props => {
    const data = Session.partitionByDate(Object.values(props.favorites));
    const dates = Object.keys(data).sort();

    if (!dates.length) {
        return (
            <Fragment>
                {' '}
                <Message icon negative>
                    <Icon name="info circle" />
                    <Message.Content>
                        <Message.Header>Keine Favoriten ausgewählt</Message.Header>
                        <p>
                            Aktuell ist keine der Sessions als "Favorit" markiert. Verwende das Herz-Symbol an der
                            Sessionkachel um die jeweilige Session zu dieser Liste hinzuzufügen.
                        </p>
                    </Message.Content>
                </Message>
            </Fragment>
        );
    }

    return (
        <Fragment>
            {dates.map(datum => (
                <Fragment key={datum}>
                    <h3>{formatDate(datum)}</h3>
                    <SessionTable {...props} sessions={data[datum]} />
                </Fragment>
            ))}

            <Footer />
        </Fragment>
    );
};

export default FavoritesList;
