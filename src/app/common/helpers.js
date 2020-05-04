import cuid from "cuid"

export const objectToArray = object => {
    if (object) {
        return Object.entries(object).map(e => Object.assign({}, e[1], {id:e[0]}))
    }
}
export const createNewTour = ( user, tour) => {
    return {
        ...tour, 
        tourOwner : user.uid,
        hostedBy: user.displayName,
        created_date: new Date()
    }
}

export const createNewStop = (user, stop, tourOwner, stopsCount) => {
    return {
        ...stop,
        tour_owner : tourOwner,
        stopOwner : user.uid,
        created_date : new Date(),
        tourOwner : null,
        //id : cuid(),
        all_media : [], 
        order: stopsCount 
    }
}