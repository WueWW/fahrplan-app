import './style.less';

import React from 'react';
import { Container } from 'semantic-ui-react';

export interface Props {
    Header: React.ReactNode;
    children: React.ReactNode;
}

export interface State {
    attached: boolean;
}

class Layout extends React.Component<Props, State> {
    private debounceTimer?: number;

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

        if (this.state.attached && window.scrollY < window.innerHeight * 0.03) {
            return true;
        }

        let contentHeight = document.getElementById('root')!.offsetHeight;

        if (this.state.attached) {
            contentHeight -= window.innerHeight * 0.42 - 100;
        }

        if (
            window.innerWidth >= 992 &&
            // the 1.05 factor is some assumed, minimal sensible scrolling step size (in dependence of window inner hegiht)
            contentHeight < window.innerHeight * 1.05
        ) {
            // cannot effectively scroll (reducing logo size) without flickering
            // ... since reducing height (from innerHeight * 42% to 100px) would result in the viewport
            // height not being scrollable anymore.
            return true;
        }

        return false;
    };

    onIntersectionChanged = () => {
        if (!this.debounceTimer) {
            this.debounceTimer = window.setTimeout(() => {
                this.debounceTimer = undefined;
                this.setState({ attached: this.shouldBeAttached() });
            }, 50);
        }
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

export default Layout;
