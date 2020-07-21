import React from 'react'
import { Menu } from 'semantic-ui-react'

const SmallStopNav = ({activeTab, handleTabChange}) => {
    return (
        <div>
            <div>
               <Menu attached='top' tabular>
                    <Menu.Item
                        name='Location'
                        active={activeTab === 'Location'}
                        onClick={() => handleTabChange("Location")}
                    />
                    <Menu.Item
                        name='Context'
                        active={activeTab === 'Context'}
                        onClick={() => handleTabChange("Context")}
                    />
                </Menu>
            </div>
        </div>
    )
}

export default SmallStopNav
