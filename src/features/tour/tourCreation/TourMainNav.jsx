import React, { Fragment } from 'react'
import { Menu } from 'semantic-ui-react';

const TourMainNav = ({ activeTab, handleTabChange }) => { 
    return (
        <Fragment>
            <Menu fluid tabula='true'>
                <Menu.Item
                    name='Main Location'
                    active={activeTab === 'Main Location'}
                    onClick={() => handleTabChange("Main Location")}
                />
                <Menu.Item
                    name='Tour Editor'
                    active={activeTab === 'Tour Editor'}
                    onClick={() => handleTabChange("Tour Editor")}
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