import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const Footer: FunctionComponent = () => (
    <footer>
        Made with <Icon name="heart" size="small" color="red" /> by Rolf | <Link to="/impressum">Impressum</Link>
    </footer>
);

export default Footer;
