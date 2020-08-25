import cuid from "cuid";

export const objectToArray = (object) => {
  if (object) {
    return Object.entries(object).map((e) =>
      Object.assign({}, e[1], { id: e[0] })
    );
  }
};
export const createNewTour = (user, tour) => {
  let approval_date = new Date();
  approval_date.setFullYear(approval_date.getFullYear() - 10);
  return {
    ...tour,
    tour_guide: {
      id: user.uid,
      full_name: user.displayName,
      profile_image: user.photoURL,
    },
    hostedBy: user.displayName,
    created_date: new Date(),
    rating: {
      total: 0,
      votes: 0,
    },
    starting_point: {
      latitude: 0,
      longitude: 0,
    },
    stops: [],
    last_update: new Date(),
    approval_date: approval_date,
  };
};

export const createNewBusiness = (user, business) => {
  return {
    ...business,
    tourOwner: user.uid,
    hostedBy: user.displayName,
    created_date: new Date(),
    id: cuid(),
    all_media: [],
    loc_pics: [],
  };
};

export const businessForRoute = (user, business, tourOwner, stopsCount) => {
  return {
    ...business,
    business_id: business.id,
    tour_owner: tourOwner,
    created_date: new Date(),
    order: stopsCount + 1,
    all_media: [],
    type: "businessStop",
  };
};

export const createNewStop = (user, stop, tourOwner, stopsCount, stopType) => {
  return {
    ...stop,
    tour_owner: tourOwner,
    stop_owner: user.uid,
    created_date: new Date(),
    all_media: [],
    order: stopsCount,
    type: stopType,
    loc_pics: [],
  };
};
