import React from 'react';
import { Container } from 'semantic-ui-react';

require('./style.less');

interface Props {
    Header: React.ReactNode;
    children: React.ReactNode;
}

interface State {
    attached: boolean;
}

const attachedP = (y: number) => y === 0;

export class Layout extends React.Component<Props, State> {
    componentDidMount() {
        document.addEventListener('scroll', this.onIntersectionChanged);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.onIntersectionChanged);
    }

    onIntersectionChanged = () => {
        this.setState({ attached: attachedP(window.scrollY) });
    };

    render() {
        const { Header, children } = this.props;
        const { attached } = this.state;

        return (
            <div className="layout">
                <div className={'header' + (attached ? ' attached' : '')}>{Header}</div>
                <Container className="body">{children}</Container>
            </div>
        );
    }

    state = {
        attached: attachedP(window.scrollY),
    };
}
