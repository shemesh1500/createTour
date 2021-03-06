import React from 'react'
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const signedInMenu = ({signOut, profile}) => {
    return (
            <Menu.Item position="right">
              <Image avatar spaced="right" src={profile.avatarUrl || '/assets/user.png'} />
              <Dropdown pointing="top left" text={profile.displayName}>          
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to='/settings' text="Settings" icon="settings" />
                  <Dropdown.Item onClick={signOut} text="Sign Out" icon="power" />
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
    )
}

export default signedInMenu;