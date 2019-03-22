import React, { Component, Fragment } from 'react';

import { isSession, Session } from '../model/Session';

export interface Props {
    children: (fav: FavManagerProps) => React.ReactElement<any>;
}

type FavList = string[];

function isFavList(data: any): data is FavList {
    return Array.isArray(data) && data.every(x => typeof x === 'string');
}

type LegacyFavFormat = { [sessionKey: string]: Session };

function isLegacyFavFormat(data: any): data is LegacyFavFormat {
    if (typeof data !== 'object') {
        return false;
    }

    return Object.keys(data).every(sessionKey => isSession(data[sessionKey]));
}

export interface State {
    favorites: FavList;
}

export interface FavManagerProps extends State {
    addFavorite: (session: Session) => void;
    removeFavorite: (sessionKey: string) => void;
}

class FavManager extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.addFavorite = this.addFavorite.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);

        try {
            const storeData = JSON.parse(localStorage.favorites);

            if (isFavList(storeData)) {
                this.state = { favorites: storeData };
            } else if (isLegacyFavFormat(storeData)) {
                this.state = { favorites: Object.keys(storeData) };
            } else {
                throw new Error('invalid fav state');
            }
        } catch {
            console.info('failed to restore favs state, assuming empty');
            this.state = { favorites: [] };
        }
    }

    commit({ favorites }: State): State {
        localStorage.favorites = JSON.stringify(favorites);
        return { favorites };
    }

    addFavorite(session: Session) {
        this.setState(state => {
            return this.commit({ favorites: [...state.favorites, session.key] });
        });
    }

    removeFavorite(sessionKey: string) {
        this.setState(state => {
            return this.commit({ favorites: state.favorites.filter(x => x !== sessionKey) });
        });
    }

    render() {
        return this.props.children({
            ...this.state,
            addFavorite: this.addFavorite,
            removeFavorite: this.removeFavorite,
        });
    }
}

export default FavManager;
