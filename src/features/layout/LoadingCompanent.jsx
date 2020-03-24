import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const LoadingCompanent = ({inverted = true}) => {
    return (
        <Dimmer inverted={inverted} active={true}>
            <Loader content="Loading..." />
        </Dimmer>
    )
}

export default LoadingCompanent
