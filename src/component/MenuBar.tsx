import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';

export interface Props {}

export interface State {
    expanded: boolean;
}

const menuStyles = (expanded: boolean) => ({
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 90,
    height: '100%',
    width: expanded ? undefined : 0,
    margin: 0,
    borderRadius: 0,
    paddingTop: '4em',
    transition: '0.3s',
});

class MenuBar extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { expanded: false };
    }

    toggleMenu = () => {
        this.setState(state => ({
            expanded: !state.expanded,
        }));
    };

    closeMenu = () => this.setState({ expanded: false });

    render() {
        return (
            <Fragment>
                <Button
                    basic
                    inverted={this.state.expanded}
                    icon="bars"
                    style={{ position: 'fixed', left: '1rem', top: '1rem', zIndex: 100 }}
                    onClick={this.toggleMenu}
                />
                <Menu inverted vertical style={menuStyles(this.state.expanded)}>
                    <NavLink
                        className="item"
                        to="/"
                        isActive={(_, location) => !!location.pathname.match(/^\/($|20)/)}
                        onClick={this.closeMenu}
                    >
                        Fahrplan
                    </NavLink>
                    <NavLink className="item" to="/favorites" onClick={this.closeMenu}>
                        Favoriten
                    </NavLink>
                    <NavLink className="item" to="/impressum" onClick={this.closeMenu} style={{ marginTop: '1rem' }}>
                        Info&nbsp;&amp;&nbsp;Impressum
                    </NavLink>
                </Menu>
            </Fragment>
        );
    }
}

export default MenuBar;
