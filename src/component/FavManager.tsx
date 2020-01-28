import React, { Component } from 'react';

import { Session } from '../model/Session';

export interface Props {
    children: (fav: FavManagerProps) => React.ReactElement<any>;
}

type FavList2020 = number[];

function isFavList2020(data: any): data is FavList2020 {
    return Array.isArray(data) && data.every(x => typeof x === 'number');
}

export interface State {
    favorites: FavList2020;
}

export interface FavManagerProps extends State {
    addFavorite: (session: Session) => void;
    removeFavorite: (sessionId: number) => void;
}

class FavManager extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.addFavorite = this.addFavorite.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);

        try {
            const storeData = JSON.parse(localStorage.favorites);

            if (isFavList2020(storeData)) {
                this.state = { favorites: storeData };
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
            return this.commit({ favorites: [...state.favorites, session.id] });
        });
    }

    removeFavorite(sessionId: number) {
        this.setState(state => {
            return this.commit({ favorites: state.favorites.filter(x => x !== sessionId) });
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
