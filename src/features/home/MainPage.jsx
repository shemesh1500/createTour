import React from 'react'
import { withFirebase } from 'react-redux-firebase'
import { connect } from 'react-redux'
import '../../style/mainPage.css'

import icon from '../../images/icon.png'

const mapState = (state) => ({
    profile: state.firebase.profile
})

const MainPage = ({ profile }) => {
    return (
        <div className='mainZone'>
            <div className='headers'>
                <div className='mainHeader'>Hello {profile.displayName}, <br />Your are in you personal zone!</div>
                <div className='subHeader'>Here you can do different actions</div>
            </div>

          
                <a href='/tourControl' className='mainZoneButtun'>
                        <img className='icon' src={icon} />
                        <div className='buttonText'>Create new tour</div>
                        <div></div>   
                </a>
                <a href='/tourControl' className='mainZoneButtun'>
                        <img className='icon' src={icon} />
                        <div className='buttonText'>Create new business stop</div>
                        <div></div>   
                </a>
                <a href='/settings' className='mainZoneButtun'>
                        <img className='icon' src={icon} />
                        <div className='buttonText'>Edit personal details</div>
                        <div></div>   
                </a>
                <a href='/tours' className='mainZoneButtun'>
                        <img className='icon' src={icon} />
                        <div className='buttonText'>All you assets</div>
                        <div></div>   
                </a>
          
        </div>
    )
}

export default withFirebase(connect(mapState)(MainPage))
