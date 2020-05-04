import React, { Fragment } from 'react'
import { Menu } from 'semantic-ui-react';

const TourMainNav = ({activeTab, handleTabChange}) => {
    return (
        <Fragment>
        <Menu fluid vertical tabula='true'>
            <Menu.Item
                name='Main Location'
                active={activeTab === 'Main Location'}
                onClick={() => handleTabChange("Main Location")}
            />
            <Menu.Item
                name='Tour Details'
                active={activeTab === 'Tour Details'}
                onClick={() => handleTabChange("Tour Details")}
            />
            <Menu.Item
                name='Tour Media'
                active={activeTab === 'Tour Media'}
                onClick={() => handleTabChange("Tour Media")}
            />
            <Menu.Item
                name='Create Route'
                active={activeTab === 'Create Route'}
                onClick={() => handleTabChange("Create Route")}
            />
        </Menu>
    </Fragment>
    )
}

export default TourMainNav;