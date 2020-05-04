import React, { Fragment } from 'react'
import { Menu } from 'semantic-ui-react'

const TourCreationNav = ({activeTab, handleTabChange}) => {

        return (
            <Fragment>
                <Menu tabularl="true">
                    <Menu.Item
                        name='General info'
                        active={activeTab === 'General info'}
                        onClick={() => handleTabChange("General info")}
                    />
                    <Menu.Item
                        name='Media'
                        active={activeTab === 'Media'}
                        onClick={() => handleTabChange("Media")}
                    />
                    <Menu.Item
                        name='Tour Stops'
                        active={activeTab === 'Tour stops'}
                        onClick={() => handleTabChange("Tour stops")}
                    />
                </Menu>
            </Fragment>
        )
  //  }
}
export default TourCreationNav
