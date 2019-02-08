import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button } from 'semantic-ui-react';

interface Props extends RouteComponentProps {}

const isMainpage = (path: string) => path.match(/^\/($|20)/);

const PageToggle: FunctionComponent<Props> = props => {
    const buttonProps = isMainpage(props.location.pathname)
        ? { icon: 'heart outline', title: 'Favoriten anzeigen', onClick: () => props.history.push('/favorites') }
        : { icon: 'file alternate outline', title: 'Sessionliste anzeigen', onClick: () => props.history.push('/') };

    return <Button {...buttonProps} size="massive" style={{ position: 'fixed', left: '1rem', top: '1rem' }} />;
};

export default PageToggle;
