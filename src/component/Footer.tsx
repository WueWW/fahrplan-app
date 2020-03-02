import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const Footer: FunctionComponent = () => (
    <footer>
        <Link to="/impressum">Impressum</Link>
    </footer>
);

export default Footer;
