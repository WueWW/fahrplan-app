import React from 'react';
import { Container } from 'semantic-ui-react';

require('./style.css');

interface Props {
    Header: React.ReactNode;
    children: React.ReactNode;
}

interface State {
    big: boolean;
}

const bigP = (x: number) => x === 0;

export class Layout extends React.Component<Props, State> {
    componentDidMount() {
        document.addEventListener('scroll', this.onIntersectionChanged);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.onIntersectionChanged);
    }

    onIntersectionChanged = () => {
        this.setState({ big: bigP(window.scrollY) });
    };

    render() {
        const { Header, children } = this.props;
        const { big } = this.state;
        return (
            <div className="Layout">
                <div className={'Layout-Header' + (big ? ' Layout-Header-big' : '')}>{Header}</div>
                <Container className="Layout-Body" style={{ gridArea: 'body' }}>
                    {children}
                </Container>
            </div>
        );
    }

    state = {
        big: bigP(window.scrollY),
    };
}
