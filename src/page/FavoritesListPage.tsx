import React, { Fragment, FunctionComponent } from 'react';
import { Button } from 'semantic-ui-react';

import FavoritesList, { Props } from '../component/FavoritesList';
import Footer from '../component/Footer';
import { SessionList } from '../model/Session';
import generateIcal from '../util/icalExport';
import { isAppleStandalone } from '../util/mobile';

const downloadIcalFile = (sessions: SessionList) => {
    var element = document.createElement('a');
    var file = new Blob([generateIcal(sessions)], { type: 'text/calendar' });
    element.href = URL.createObjectURL(file);
    element.download = 'wueww-favoriten.ics';
    element.click();
};

const FavoritesListPage: FunctionComponent<Props> = props => (
    <Fragment>
        {isAppleStandalone() || (
            <Button
                primary
                icon="calendar alternate outline"
                content="in Kalender exportieren"
                onClick={() => {
                    downloadIcalFile(props.sessions.filter(session => props.favorites.includes(session.id)));
                }}
            />
        )}
        <FavoritesList {...props} />
        <Footer />
    </Fragment>
);

export default FavoritesListPage;
