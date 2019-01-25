import React, { FunctionComponent } from 'react';
import { Header } from 'semantic-ui-react';

const InfoPage: FunctionComponent = () => (
    <div>
        <p>Schön, dass du die WueWW Fahrplan App benutzt :-)</p>
        <p>Lob, Kritik &amp; Verbesserungsvorschläge kannst du gerne auf GitHub anbringen.</p>
        <p>
            Bei der WueWW Fahrplan App handelt es sich um eine <em>Progressive Web App</em>.
        </p>

        <Header>Datenschutz</Header>
        <p>
            Diese App ist auf Datensparsamkeit ausgelegt. Von dir in der App gemachte persönliche Einstellungen (z.B.
            gewählte Favoriten) werden ausschließlich lokal in deinem Browser abgelegt und nicht an den Server
            übertragen. Die App wird über GitHub Pages veröffentlicht, von dritter Seite werden keine Daten abgerufen.
        </p>

        <a id="/impressum">
            <Header>Impressum</Header>
        </a>
        <p>
            Stefan Siegl <br />
            Annastraße 17a <br />
            97072 Würzburg <br />
            <br />
            E-Mail: <a href="mailto:stesie@brokenpipe.de">stesie@brokenpipe.de</a>
        </p>
    </div>
);

export default InfoPage;
