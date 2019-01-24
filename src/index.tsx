import 'semantic-ui-less/semantic.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'semantic-ui-react';

import App from './App';

ReactDOM.render(
    <Container>
        <App />
    </Container>,
    document.getElementById('root')
);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
