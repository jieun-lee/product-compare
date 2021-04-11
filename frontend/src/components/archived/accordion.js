import React, { useState } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import { COLORS } from '../../util/const';

const ArchivedAccordion = (props) => {
    const { children } = props;
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Accordion style={{ marginTop: '36px' }}>
            <Accordion.Title active={isOpen} onClick={() => setIsOpen(currValue => !currValue)} style={{ backgroundColor: COLORS.ARCHIVE }}>
                <h3>
                    <Icon name="dropdown" />
                    Archived
                </h3>
            </Accordion.Title>
            <Accordion.Content active={isOpen} style={{ backgroundColor: COLORS.ARCHIVE_LIGHT }}>
                {children}
            </Accordion.Content>
        </Accordion>
    );
}

export default ArchivedAccordion;