import React, { FunctionComponent } from 'react';
import { Header } from 'semantic-ui-react';

const InfoPage: FunctionComponent = () => (
    <div>
        <p>Schön, dass du die WueWW Fahrplan App benutzt :-)</p>
        <p>
            Lob, Kritik &amp; Verbesserungsvorschläge kannst du gerne{' '}
            <a href="https://github.com/WueWW/fahrplan-app/issues">im Issue-Tracker auf GitHub</a> anbringen.
        </p>
        <p>
            Bei der WueWW Fahrplan App handelt es sich um eine <em>Progressive Web App</em>. Soll heißen, du kannst
            diese auf deinem Handy zum Startbildschirm hinzufügen und auch offline verwenden.
        </p>

        <Header>Bedienungshinweise</Header>
        <p>
            Im Fahrplan-Teil der Anwendung kannst du sämtliche Sessions der WueWW nach Tagen gegliedert sehen. Wenn du
            die Sessionkachel aufklappst, findest du auch weitere Details zur Session. Zwischen den Tagen kannst du
            wahlweise über das Dropdown oben, oder auch durch einfaches Swipen hin und her wechseln.
        </p>

        <p>
            Deine favorisierten Sessions kannst du mit dem Herz-Symbol markieren und anschließend übersichtlich auf der
            Favoriten-Seite wieder abrufen.
        </p>

        <Header>Datenschutz</Header>
        <p>
            Diese App ist auf Datensparsamkeit ausgelegt. Von dir in der App gemachte persönliche Einstellungen (z.B.
            gewählte Favoriten) werden ausschließlich lokal in deinem Browser abgelegt und nicht an den Server
            übertragen. Die App wird über GitHub Pages veröffentlicht, von dritter Seite werden keine Daten abgerufen.
        </p>

        <Header>Impressum</Header>
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
