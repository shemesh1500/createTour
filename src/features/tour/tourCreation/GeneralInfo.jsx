import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import TourDetailedInfo from '../tourDetailed/tourDetailedInfo';
import { Grid, Button } from 'semantic-ui-react';
import TourForm from '../tourForm/tourForm';


const GeneralInfo = ({ tour }) => {
    const [editStat, setEditStat] = useState(false);
    return (
        <Grid>
            <Grid.Column width={12}>
                {editStat ? <TourForm id={tour.id} /> : <TourDetailedInfo tour={tour} />}
            </Grid.Column>
            <Button
                content='Edit details'
                color='orange'
                onClick={() => setEditStat(!editStat)} 
            />
        </Grid>
    )
}

export default GeneralInfo;//connect(mapState)(GeneralInfo);