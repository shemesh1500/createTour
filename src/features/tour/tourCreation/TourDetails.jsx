import React, { useState } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import TourForm from './TourForm';
import TourMedia from './TourMedia';

const TourDetails = ({onFormSubmit}) => {
    const [ActiveTab, setActiveTab] = useState('General details')

    const switchContent = (ActiveTab) => {
        switch (ActiveTab){
            case 'General details':
                return <TourForm onFormSubmit={onFormSubmit} />
            case 'General content':
                return <TourMedia saveChanges={onFormSubmit} />
            default:
                break;
        }
    }

    return (
        <div>
            <Menu attached='top' tabular> 
                    <Menu.Item
                        name='General details'
                        active={ActiveTab === 'General details'}
                        onClick={() => setActiveTab('General details')}
                    />
                    <Menu.Item
                        name='General content'
                        active={ActiveTab === 'General content'}
                        onClick={() => setActiveTab('General content')}
                    />
                </Menu>
                <Segment attached='bottom'>
                    {switchContent(ActiveTab)}
                </Segment>
        </div>
    )
}

export default TourDetails
