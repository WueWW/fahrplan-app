import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Menu, Sidebar } from 'semantic-ui-react';

export interface State {
    visible: boolean;
}

class SidebarMenu extends Component<{}, State> {
    state = { visible: false };

    showMenu = () => {
        this.setState({
            visible: true,
        });
    };

    hideMenu = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { visible } = this.state;

        return (
            <div>
                {visible || (
                    <Button
                        basic
                        inverted={this.state.visible}
                        icon="bars"
                        style={{ position: 'fixed', left: '1rem', top: '1rem', zIndex: 90 }}
                        onClick={this.showMenu}
                    />
                )}
                <Sidebar.Pushable>
                    <Sidebar
                        style={{ paddingTop: '2em' }}
                        as={Menu}
                        animation="overlay"
                        inverted
                        onHide={this.hideMenu}
                        vertical
                        visible={visible}
                        width="very wide"
                    >
                        <NavLink
                            className="item"
                            to="/"
                            isActive={(_, location) => !!location.pathname.match(/^\/($|20)/)}
                            onClick={this.hideMenu}
                        >
                            Fahrplan
                        </NavLink>
                        <NavLink className="item" to="/favorites" onClick={this.hideMenu}>
                            Favoriten
                        </NavLink>
                        <NavLink className="item" to="/impressum" style={{ marginTop: '1rem' }} onClick={this.hideMenu}>
                            Impressum
                        </NavLink>
                    </Sidebar>

                    <Sidebar.Pusher dimmed={visible} onClick={this.hideMenu}>
                        {this.props.children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

export default SidebarMenu;
