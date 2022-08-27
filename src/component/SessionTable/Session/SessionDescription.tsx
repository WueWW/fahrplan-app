import { Card } from 'semantic-ui-react';
import { Session } from '../../../model/Session';
import React, { Fragment, useState } from 'react';

interface SessionDescriptionProps {
    description: Session['description'];
}

const SessionDescription = (props: SessionDescriptionProps) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <Card.Content>
            <Card.Description>
                <p>
                    {props.description?.short}
                    {props.description?.long && !showMore ? (
                        <>
                            {' '}
                            <a
                                href="#"
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    setShowMore(true);
                                }}
                            >
                                mehr
                            </a>
                        </>
                    ) : null}
                </p>
                {props.description?.long &&
                    showMore &&
                    props.description?.long.split(/\r?\n\r?\n/).map((text, i) => (
                        <p key={i}>
                            {text.split(/\r?\n/).map((line, i) => (
                                <Fragment key={i}>
                                    {line}
                                    <br />
                                </Fragment>
                            ))}
                        </p>
                    ))}
            </Card.Description>
        </Card.Content>
    );
};

export default SessionDescription;
