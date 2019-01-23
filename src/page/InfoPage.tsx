import React, { FunctionComponent } from 'react';

const InfoPage: FunctionComponent = () => (
    <div>
        <p>Schön, dass du die WueWW Fahrplan App benutzt :-)</p>
        <p>Lob, Kritik &amp; Verbesserungsvorschläge kannst du gerne auf GitHub anbringen.</p>
        <p>
            Bei der WueWW Fahrplan App handelt es sich um eine <em>Progressive Web App</em>.
        </p>
        <p>
            Datenschutzhinweis: Diese App ist auf Datensparsamkeit ausgelegt. Von dir in der App gemachte persönliche
            Einstellungen (z.B. gewählte Favoriten) werden ausschließlich lokal in deinem Browser abgelegt und nicht an
            den Server übertragen. Die App wird über GitHub Pages veröffentlicht, von dritter Seite werden keine Daten
            abgerufen.
        </p>
    </div>
);

export default InfoPage;
