import './style.less';

import React from 'react';
import { Card, Icon, Label } from 'semantic-ui-react';

import { Session as SessionType } from '../../../model/Session';
import LocationBlock from './LocationBlock';

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

    eventEmail(): string | undefined {
        if (!this.props.links || !this.props.links.event || this.props.links.event.indexOf('@') === -1) {
            return undefined;
        }

        return this.props.links.event;
    }

    eventUrl(): string | undefined {
        if (!this.props.links || !this.props.links.event) {
            return undefined;
        }

        if (this.props.links.event.startsWith('http')) {
            return this.props.links.event;
        }

        if (this.props.links.event.startsWith('www.')) {
            return `http://${this.props.links.event}`;
        }

        return undefined;
    }

    render() {
        return (
            <Card className={this.props.cancelled ? 'cancelled' : undefined}>
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
                {this.state.expanded && this.props.cancelled && (
                    <Card.Content extra>
                        <Card.Description>
                            <Label color="red">
                                <Icon name="ban" /> Die Session wurde abgesagt.
                            </Label>
                        </Card.Description>
                    </Card.Content>
                )}
                {this.state.expanded && !this.props.cancelled && this.description() && (
                    <Card.Content extra>
                        <Card.Description>{this.description()}</Card.Description>
                    </Card.Content>
                )}
                {this.state.expanded && !this.props.cancelled && <LocationBlock location={this.props.location} />}

                <Card.Content extra>
                    <Icon
                        className="right floated"
                        name={this.props.isFavorite ? 'heart' : 'heart outline'}
                        color={this.props.isFavorite ? 'red' : undefined}
                        onClick={this.props.onToggleFavorite}
                        style={{ cursor: 'pointer' }}
                    />
                    {this.eventUrl() && (
                        <a href={this.eventUrl()}>
                            <Icon className="right floated" name="linkify" style={{ cursor: 'pointer' }} />
                        </a>
                    )}
                    {this.eventEmail() && (
                        <a href={`mailto:${this.eventEmail()}`}>
                            <Icon className="right floated" name="mail" style={{ cursor: 'pointer' }} />
                        </a>
                    )}
                    <Icon name="clock outline" />
                    {formatTime(this.props.start)}
                    {this.props.end && ' - ' + formatTime(this.props.end)}
                </Card.Content>
            </Card>
        );
    }
}
export default Session;
