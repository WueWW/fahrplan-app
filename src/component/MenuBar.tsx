import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';

export interface Props {}

export interface State {
    expanded: boolean;
}

const menuStyles = {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100%',
    borderRadius: 0,
    paddingTop: '4em',
};

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
                    style={{ position: 'absolute', left: '1rem', top: '1rem', zIndex: 100 }}
                    onClick={this.toggleMenu}
                />
                {this.state.expanded && (
                    <div>
                        <Menu inverted vertical style={menuStyles}>
                            <Link className="item" to="/" onClick={this.closeMenu}>
                                Fahrplan
                            </Link>
                            <Link className="item" to="/favorites" onClick={this.closeMenu}>
                                Favoriten
                            </Link>
                            <Link className="item" to="/impressum" onClick={this.closeMenu}>
                                Impressum
                            </Link>
                        </Menu>
                    </div>
                )}
            </Fragment>
        );
    }
}

export default MenuBar;
