import React from 'react'
import { Grid } from 'semantic-ui-react'
import SettingNav from './SettingNav'
import { Route, Redirect, Switch } from 'react-router-dom'
import BasicPage from './BasicPage'
import AboutPage from './AboutPage'
import AcountPage from './AcountPage'
import { updatePassword } from '../../auth/authActions'
import { connect } from 'react-redux'
import { updateProfile } from '../userActions'
import PhotosPage from './photos/PhotoPage'

const actions = {
    updatePassword,
    updateProfile
}

const mapState = (state) => ({
    providerId: state.firebase.auth.providerData[0].providerId,
    user: state.firebase.profile
})


const SettingDashboard = ({ user, updateProfile }) => {
    return (
        <Grid> 
            <Grid.Column width={12}>
                <Switch>
                    <Redirect exact from='/settings' to='/settings/basic' />
                    <Route path='/settings/basic' render={() => <BasicPage initialValues={user} updateProfile={updateProfile} />} />
                    <Route path='/settings/about' render={() => <AboutPage initialValues={user} updateProfile={updateProfile} />} />
                    <Route path='/settings/acount' component={AcountPage} />
                    <Route path='/settingss/photo' component={PhotosPage} />
                </Switch>
            </Grid.Column>
            <Grid.Column width={4}>
                <SettingNav />
            </Grid.Column>
        </Grid>
    )
}

export default connect(mapState, actions)(SettingDashboard);
