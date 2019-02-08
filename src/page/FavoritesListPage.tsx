import React, { Fragment, FunctionComponent } from 'react';

import FavoritesList, { Props } from '../component/FavoritesList';
import Footer from '../component/Footer';

const FavoritesListPage: FunctionComponent<Props> = props => (
    <Fragment>
        <FavoritesList {...props} />
        <Footer />
    </Fragment>
);

export default FavoritesListPage;
