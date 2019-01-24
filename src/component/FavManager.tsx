import React, { Component, Fragment } from 'react';

import { Session } from '../model/Session';

export interface Props {
    children: (fav: FavManagerProps) => React.ReactElement<any>;
}

export interface State {
    favorites: { [sessionKey: string]: Session };
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
            this.state = { favorites: JSON.parse(localStorage.favorites) };
        } catch {
            console.info('failed to restore favs state, assuming empty');
            this.state = { favorites: {} };
        }
    }

    commit({ favorites }: State): State {
        localStorage.favorites = JSON.stringify(favorites);
        return { favorites };
    }

    addFavorite(session: Session) {
        this.setState(state => {
            return this.commit({ favorites: { ...state.favorites, [session.key]: session } });
        });
    }

    removeFavorite(sessionKey: string) {
        this.setState(state => {
            const { [sessionKey]: deletedData, ...leftoverFavorites } = state.favorites;
            return this.commit({ favorites: leftoverFavorites });
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
