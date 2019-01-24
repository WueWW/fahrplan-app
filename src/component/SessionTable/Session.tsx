import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

import { Session as SessionType } from '../../model/Session';

export interface Props extends SessionType {
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

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

    description(): string | undefined {
        return this.props.description && (this.props.description.short || this.props.description.long);
    }

    isExpandable(): boolean {
        return this.description() !== undefined || (this.props.location && this.props.location.name) !== undefined;
    }

    handleExpand() {
        this.setState(state => ({ expanded: !state.expanded }));
    }

    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header onClick={this.handleExpand} style={{ cursor: 'pointer' }}>
                        {this.isExpandable() && (
                            <span className="right floated">
                                <Icon name={this.state.expanded ? 'chevron down' : 'chevron right'} />
                            </span>
                        )}
                        {this.props.title}
                    </Card.Header>
                    <Card.Meta>{this.props.host.name}</Card.Meta>
                </Card.Content>
                {this.state.expanded && this.description() && (
                    <Card.Content extra>
                        <Card.Description>{this.description()}</Card.Description>
                    </Card.Content>
                )}
                {this.state.expanded && this.props.location && this.props.location.name && (
                    <Card.Content extra>
                        <Card.Description>
                            <Icon name="globe" />
                            {this.props.location.name}
                        </Card.Description>
                    </Card.Content>
                )}

                <Card.Content extra>
                    <Icon className="right floated" name="heart" color={this.props.isFavorite ? 'red' : undefined } onClick={this.props.onToggleFavorite} />
                    <Icon name="clock" />
                    {formatTime(this.props.start)}
                    {this.props.end && ' - ' + formatTime(this.props.end)}
                </Card.Content>
            </Card>
        );
    }
}
export default Session;
