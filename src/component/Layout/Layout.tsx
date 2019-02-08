import './style.less';

import React from 'react';
import { Container } from 'semantic-ui-react';

interface Props {
    Header: React.ReactNode;
    children: React.ReactNode;
}

interface State {
    attached: boolean;
}

export class Layout extends React.Component<Props, State> {
    componentDidMount() {
        document.addEventListener('scroll', this.onIntersectionChanged);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.onIntersectionChanged);
    }

    shouldBeAttached = () => {
        if (window.scrollY === 0) {
            return true;
        }

        if (
            window.innerWidth >= 992 &&
            document.getElementById('root')!.offsetHeight + 100 - window.innerHeight * 0.42 < window.innerHeight
        ) {
            // cannot effectively scroll (reducing logo size) without flickering
            // ... since reducing height (from innerHeight * 42% to 100px) would result in the viewport
            // height not being scrollable anymore
            return true;
        }

        return false;
    };

    onIntersectionChanged = () => {
        this.setState({ attached: this.shouldBeAttached() });
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

    constructor(props: Props) {
        super(props);
        this.state = {
            attached: this.shouldBeAttached(),
        };
    }
}
