import React, { Fragment } from 'react'
import { Menu } from 'semantic-ui-react'

const StopCreationNav = ({activeTab, handleTabChange}) => {

        return (
            <Fragment>
                <Menu tabularl="true">
                    <Menu.Item
                        name='Location'
                        active={activeTab === 'Location'}
                        onClick={() => handleTabChange("Location")}
                    />
                    <Menu.Item
                        name='General Info'
                        active={activeTab === 'General Info'}
                        onClick={() => handleTabChange("General Info")}
                    />
                    <Menu.Item
                        name='Media'
                        active={activeTab === 'Media'}
                        onClick={() => handleTabChange("Media")}
                    />
                </Menu>
            </Fragment>
        )
  //  }
}
export default StopCreationNav