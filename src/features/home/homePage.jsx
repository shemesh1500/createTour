import React from 'react'
import { Icon, Button, Image, Header, Container, Segment } from 'semantic-ui-react';

const homePage = ({history}) => {
    return (
        <div>
                <Segment inverted textAlign='center' vertical className='masthead'>
                <Container text>
                <Image
                      size='massive'
                      src='/assets/logoB.png'
                      alt='logo'
                      style={{ marginBottom: 12 }}
                    />
                  <Header as='h1' inverted>
                    D-Guide
                  </Header>
                  <Button onClick={() => history.push('/tours')} size='huge' inverted>
                    Get started
                    <Icon name='right arrow' inverted />
                  </Button>
                </Container>
              </Segment>
        </div>
    )
}

export default homePage;