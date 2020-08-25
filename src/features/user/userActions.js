import { toastr } from "react-redux-toastr";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../async/asyncActions";
import cuid from "cuid";

export const updateProfile = (user) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const { isLoaded, isEmpty, ...updatedUser } = user;
  const questions = [
    { question: "When do you start to guide an why?", answer: user.question1 },
    {
      question: "What do you like about being a guide?",
      answer: user.question2,
    },
    { question: "Quete from a favorite movie\book?", answer: user.question3 },
    {
      question: "What historical period would you like to return to?",
      answer: user.question4,
    },
    {
      question:
        "If you could choose one person to have dinner with, who would it be?",
      answer: user.question5,
    },
    {
      question: "What in your life are you grateful for?",
      answer: user.question6,
    },
    {
      question:
        "If you could wake up tomorrow with a new feature or ability, what would it be?",
      answer: user.question7,
    },
    {
      question:
        "If you could wake up tomorrow with a new feature or ability, what would it be?",
      answer: user.question7,
    },
    {
      question: "Sweet or salty?",
      answer: user.question8,
    },
  ];
  let saveUser = {
    ...updatedUser,
    questionAndUser: questions,
  };
  try {
    await firebase.updateProfile(saveUser);
    toastr.success("Success", "Your profile has been updated");
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfileImage = (file, user) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  //const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images`;
  const options = {
    name: imageName,
  };

  try {
    dispatch(asyncActionStart());
    //upload the file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    //get the url of the image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

    await firestore.set(`users/${user.uid}`, {
      ...user,
      imageUrl: downloadURL,
    });
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const deletePhoto = (photo) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: "users",
      doc: user.uid,
      subcollections: [
        {
          collection: "photos",
          doc: photo.id,
        },
      ],
    });
  } catch (error) {
    console.log(error);
    throw new Error("Problem deleting the photo");
  }
};

export const setMainPhoto = (photo) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  try {
    return await firebase.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Problem setting main photo");
  }
};
