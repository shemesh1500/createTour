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

export const createNewBusiness = ( user, business) => {
    return {
        ...business, 
        tourOwner : user.uid,
        hostedBy: user.displayName,
        created_date: new Date()
    }
}

export const businessForRoute = (user, business, tourOwner, stopsCount) => {
    return {
        ...business,
        business_id : business.id,
        tour_owner : tourOwner,
        created_date : new Date(),
        order: stopsCount + 1,
        all_media : [],
        type : "businessStop"
    }
}

export const createNewStop = (user, stop, tourOwner, stopsCount) => {
    return {
        ...stop,
        tour_owner : tourOwner,
        stopOwner : user.uid,
        created_date : new Date(),
        tourOwner : null,
        all_media : [], 
        order: stopsCount,
        type : "bigStop"
    }
}