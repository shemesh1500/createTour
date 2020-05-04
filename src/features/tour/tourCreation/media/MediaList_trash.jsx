import React, { Fragment } from 'react'
import { Header, Card, Image } from 'semantic-ui-react'

const MediaList = (mainMedia, allMedia) => {
    return (
        <Fragment>
            <Header sub color='teal' content='All media' />
            <Card.Group itemsPerRow={4} >
                <Card>
                    <Image src={mainMedia || '/assets/user.png'} /> 
                </Card>
                {allMedia && allMedia.map((media) => (
                    <Card key={media.id}>
                        <Image 
                        src={media.url} 
                        />}
                    </Card>
                ))}
            </Card.Group>
        </Fragment>
    )
}

export default MediaList
