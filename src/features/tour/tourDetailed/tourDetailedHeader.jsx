import React from 'react'
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react'

const tourImageStyle = {
    filter: 'brightness(30%)'
};

const tourImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

const TourDetailedHeader =  tour  => {
    
   /* const [mediaName, setMedia] = useState([]);
    
    useEffect(() => {
        return () => {
            mediaName.forEach(file => URL.revokeObjectURL(file.preview))
        }
    }, [mediaName])

    const handleUploadProfileMedia = async () => {
        try {
            //uploadImage = (file, fileName, basePath, options, docRefPath, collectionName)
            console.log(mediaName)
        } catch (error) {
            console.log(error)
            toastr.error('Oops', 'Something went wrong')
        }
    }*/

    return (
        <Segment.Group>
            <Segment basic attached="top" style={{ padding: '0' }}>
                <Image src={tour.profile_pic} fluid style={tourImageStyle} /> 
                <Segment basic style={tourImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size="huge"
                                    content={tour.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{tour.city}</p>
                                <p>{tour.main_sentense}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>

            <Segment attached="bottom">
                <Button>Update Main Picture</Button>
                <Button color="teal">Update Preview Video</Button>
            </Segment>
        </Segment.Group>
    )
}

export default TourDetailedHeader;
