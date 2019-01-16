import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

import { Session as SessionType } from '../../model/Session';

export interface Props extends SessionType {}

export interface State {
    expanded: boolean;
}

function formatTime(dt: string): string {
    return new Date(dt).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

class Session extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { expanded: false };

        this.handleExpand = this.handleExpand.bind(this);
    }

    isExpandable() {
        return this.props.short_description || this.props.long_description || this.props.location;
    }

    handleExpand() {
        this.setState(state => ({ expanded: !state.expanded }));
    }

    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header onClick={this.handleExpand}>
                        {this.isExpandable() && (
                            <span className="right floated">
                                <Icon name={this.state.expanded ? 'chevron down' : 'chevron right'} />
                            </span>
                        )}
                        {this.props.title}
                    </Card.Header>
                    <Card.Meta>{this.props.host}</Card.Meta>
                </Card.Content>
                {this.state.expanded && this.props.short_description && (
                    <Card.Content extra>
                        <Card.Description>{this.props.short_description}</Card.Description>
                    </Card.Content>
                )}
                {this.state.expanded && this.props.long_description && (
                    <Card.Content extra>
                        <Card.Description>{this.props.long_description}</Card.Description>
                    </Card.Content>
                )}
                {this.state.expanded && this.props.location && (
                    <Card.Content extra>
                        <Card.Description>
                            <Icon name="globe" />
                            {this.props.location}
                        </Card.Description>
                    </Card.Content>
                )}

                <Card.Content extra>
                    <Icon name="clock" />
                    {formatTime(this.props.start)}
                    {this.props.end && ' - ' + formatTime(this.props.end)}
                </Card.Content>
            </Card>
        );
    }
}
export default Session;
