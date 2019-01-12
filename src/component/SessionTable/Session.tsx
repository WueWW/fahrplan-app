import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

import { Session as SessionType } from '../../model/Session';

export interface Props extends SessionType {}

export interface State {
    expanded: boolean;
}

class Session extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { expanded: false };

        this.handleExpand = this.handleExpand.bind(this);
    }

    handleExpand() {
        console.log('handleExpand', this.state);
        this.setState(state => ({ expanded: !state.expanded }));
    }

    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header onClick={this.handleExpand}>
                        {this.props.title}
                        <span className="right floated">
                            <Icon name={this.state.expanded ? 'chevron down' : 'chevron right'} />
                        </span>
                    </Card.Header>
                    <Card.Meta>wird schon wer machen</Card.Meta>
                    {this.state.expanded && (
                        <Card.Description>
                            Lorem ipsum dolor foo Lorem ipsum dolor foo Lorem ipsum dolor foo Lorem ipsum dolor foo
                            Lorem ipsum dolor foo Lorem ipsum dolor foo Lorem ipsum dolor foo Lorem ipsum dolor foo
                        </Card.Description>
                    )}
                </Card.Content>
                <Card.Content extra>
                    <Icon name="clock" />
                    10:00 - 12:00
                </Card.Content>
            </Card>
        );
    }
}
export default Session;
