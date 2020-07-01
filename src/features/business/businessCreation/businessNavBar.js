import React, { Fragment } from 'react'
import { Menu } from 'semantic-ui-react';

const businessNavBar = ({ activeTab, handleTabChange }) => { 
    return (
        <Fragment>
            <Menu fluid tabula='true'>
                <Menu.Item
                    name='General Info'
                    active={activeTab === 'General Info'}
                    onClick={() => handleTabChange("General Info")}
                />
                <Menu.Item
                    name='Offer Details'
                    active={activeTab === 'Offer Details'}
                    onClick={() => handleTabChange("Offer Details")}
                />
                <Menu.Item
                    name='Business Content'
                    active={activeTab === 'Business Content'}
                    onClick={() => handleTabChange("Business Content")}
                />
            </Menu>
        </Fragment>
    )
}

export default businessNavBar;