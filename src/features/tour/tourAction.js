import { DELETE_TOUR, FETCH_TOUR } from "./tourConstarnts";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";
import { toastr } from "react-redux-toastr";
import { createNewTour } from "../../app/common/helpers";
import cuid from "cuid";

export const uploadImage = (file, fileName, basePath, tour) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const options = {
    name: imageName,
  };

  try {
    dispatch(asyncActionStart);
    //upload the file to firebase storage
    let uploadedFile = await firebase.uploadFile(basePath, file, null, options);
    //get the url of the image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
    //add the image to firestore
    if (tour.tour_media) {
      let tour_media = [
        ...tour.tour_media,
        {
          name: imageName,
          url: downloadURL,
          type: file.type,
        },
      ];
      tour = {
        ...tour,
        tour_media,
      };
    } else {
      let tour_media = [
        {
          name: imageName,
          url: downloadURL,
          type: file.type,
        },
      ];
      tour = {
        ...tour,
        tour_media,
        profile_pic: {
          name: imageName,
          url: downloadURL,
          type: file.type,
        },
      };
    }

    await firestore.update(`tours/${tour.id}`, tour);
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    toastr.error("Opss", "File upload faild. Try agian");
  }
};

export const uploadAudio = (file, basePath, tour, audioTitle) => async (
  dispatch,
  setState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const audioName = cuid();
  const options = {
    name: audioName,
  };
  try {
    dispatch(asyncActionStart);
    let uploadedAudio = await firebase.uploadFile(
      basePath + "/audio",
      file,
      null,
      options
    );
    let downloadURL = await uploadedAudio.uploadTaskSnapshot.ref.getDownloadURL();

    if (tour.tour_media) {
      let tour_media = [
        ...tour.tour_media,
        {
          name: audioName,
          url: downloadURL,
          title: audioTitle,
          type: file.type,
        },
      ];
      tour = {
        ...tour,
        tour_media,
      };
    } else {
      let tour_media = [
        {
          name: audioName,
          url: downloadURL,
          title: audioTitle,
          type: file.type,
        },
      ];
      tour = {
        ...tour,
        tour_media,
      };
    }
    await firestore.update(`tours/${tour.id}`, tour);
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Audio upload faild. Please try agian");
  }
};

export const uploadVideo = (file, basePath, tour, poster) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const videoName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const options = {
    name: videoName,
  };

  try {
    dispatch(asyncActionStart);
    let uploadedVideo = await firebase.uploadFile(
      basePath + "/videos",
      file,
      null,
      options
    );
    let downloadURL = await uploadedVideo.uploadTaskSnapshot.ref.getDownloadURL();
    let uploadedPoster = await firebase.uploadFile(
      basePath + "pictures",
      poster,
      null,
      options
    );
    let posterURL = await uploadedPoster.uploadTaskSnapshot.ref.getDownloadURL();

    if (tour.tour_media) {
      let tour_media = [
        ...tour.tour_media,
        {
          name: videoName,
          url: downloadURL,
          poster: posterURL,
          type: file.type,
        },
      ];
      tour = {
        ...tour,
        tour_media,
      };
    } else {
      let tour_media = [
        {
          name: videoName,
          url: downloadURL,
          poster: posterURL,
          type: tour.type,
        },
      ];
      tour = {
        ...tour,
        tour_media,
        profile_pic: {
          name: videoName,
          url: downloadURL,
          type: "video",
          poster_Img: posterURL,
        },
      };
    }
    await firestore.update(`tours/${tour.id}`, tour);
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log("error", error);
    toastr.error("Oops", "File upload failed, plese try agian.");
  }
};

export const deleteVideo = (video, tour) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const updated_media = tour.tour_media.filter(
    (media) => media.name !== video.name
  );
  let updated_tour = {
    ...tour,
    tour_media: updated_media,
  };
  try {
    await firebase.deleteFile(`${tour.id}/mediaTour/videos/${video.name}`);
    await firebase.deleteFile(`${tour.id}/mediaTour/pictures/${video.name}`);
    await firestore.update(`tours/${tour.id}`, updated_tour);
  } catch (error) {
    console.log(error);
    throw new Error("Problem deleting the video");
  }
};
export const deletePhoto = (photo, tour) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  let updated_media = tour.tour_media.filter(
    (media) => media.name !== photo.name
  );
  let updated_tour = {
    ...tour,
    tour_media: updated_media,
  };
  try {
    await firebase.deleteFile(`${tour.id}/mediaTour/${photo.name}`);
    await firestore.update(`tours/${tour.id}`, updated_tour);
    //await firestore.delete(`tours/${tour.id}/all_media/`)
  } catch (error) {
    console.log(error);
    throw new Error("Problem deleting the photo");
  }
};

export const setMainPhoto = (photo, tour) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  try {
    let updated_tour = {
      ...tour,
      profile_pic: {
        name: photo.name,
        url: photo.url,
        type: "photo",
      },
    };
    await firestore.update(`tours/${tour.id}`, updated_tour);
  } catch (error) {
    console.log(error);
    throw new Error("Problem setting main photo");
  }
};

export const createTour = (tour) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const newTour = createNewTour(user, tour);
    try {
      let createdTour = await firestore.add("tours", newTour);
      toastr.success("Success!", "Tour has been created");
      return createdTour;
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Somthing went wrong!");
    }
  };
};

export const updateTour = (tour) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let update_tour = {
      ...tour,
      last_update: new Date(),
    };
    try {
      dispatch(asyncActionStart());
      await firestore.update(`tours/${tour.id}`, update_tour);
      toastr.success("Success!", "Tour has been updated");
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Somthing went wrong!");
      dispatch(asyncActionError());
    }
  };
};

export const cancelToggle = (cancelled, tourId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? "Are you sure you want to cancel the tour?"
    : "This will reactivate the tour, are you sure?";

  try {
    toastr.confirm(message, {
      onOk: async () =>
        await firestore.update(`tours/${tourId}`, {
          cancelled: cancelled,
        }),
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTour = (tourId) => {
  return {
    type: DELETE_TOUR,
    payload: {
      tourId,
    },
  };
};

export const loadTour = () => {
  return async (dispatch) => {
    try {
      dispatch(asyncActionStart());
      const tours = await fetchSampleData();
      dispatch({ type: FETCH_TOUR, payload: { tours } });
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

export const approveTour = (tour) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();

  let dateHash = new Date().getMilliseconds() / 100 - 1;
  let update_tour = {
    ...tour,
    approval_time: new Date(),
    approval_index: dateHash,
  };
  console.log("Before hash", update_tour);
  try {
    dispatch(asyncActionStart());
    //await firestore.add("approval_tours", update_tour);
    await firestore.set(
      `approval_tours/${tour.id}`,
      { ...update_tour }
      //{ merge: true }
    );

    //await firestore.set(`approval_tours/${tour.id}`, update_tour);
    toastr.success("Success!", "Tour has been updated");
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Somthing went wrong!");
    dispatch(asyncActionError());
  }
};
