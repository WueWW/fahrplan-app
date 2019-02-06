import React, { Component } from 'react';

import { FavManagerProps } from '../component/FavManager';
import { SessionList } from '../model/Session';

export interface Props extends FavManagerProps {
    sessions: SessionList;
}

export interface State {}

class FavoritesList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>Favoritenliste</h3>
            </div>
        );
    }
}

export default FavoritesList;
