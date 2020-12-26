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
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  //const { isLoaded, isEmpty, updatedUser } = user;
  /*firebase.auth().onAuthStateChanged(function (test_user) {
    if (user) {
      // User is signed in.
      console.log("CHECK_TOKEN", test_user);
      test_user.getIdToken().then(function (idToken) {
        // <------ Check this line
        console.log("CHECK_TOKEN", idToken); // It shows the Firebase token now
      });
    } else {
      // No user is signed in.
      console.log("THERE IS NO USER");
    }
  });
*/
  const questions = [
    {
      question: "When do you start to guide and why?",
      answer: user.question1 ? user.question1 : "",
    },
    {
      question: "What do you like about being a guide?",
      answer: user.question2 ? user.question2 : "",
    },
    {
      question: "Quete from a favorite movie\book?",
      answer: user.question3 ? user.question3 : "",
    },
    {
      question: " What historical period would you like to return to?",
      answer: user.question4 ? user.question4 : "",
    },
    {
      question:
        "If you could choose one person to have dinner with, who would it be?",
      answer: user.question5 ? user.question5 : "",
    },
    {
      question: "What in your life are you grateful for?",
      answer: user.question6 ? user.question6 : "",
    },
    {
      question:
        " If you could wake up tomorrow with a new feature or ability, what would it be?",
      answer: user.question7 ? user.question7 : "",
    },
    {
      question: "Sweet or salty?",
      answer: user.question8 ? user.question8 : "",
    },
  ];
  console.log("questions", questions);
  let saveUser = {
    ...user,

    questionAndAnswer: questions,
  };
  try {
    await firebase.updateProfile(saveUser);
    await firestore.set(`/users/${user.uid}`, saveUser, { merge: true });
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

export const createSeller = (user) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();

  try {
    var request = require("request");
    console.log("send request");
    request(
      {
        method: "POST",
        url:
          "https://private-anon-29e94e4f69-paymeapi.apiary-mock.com/create-seller",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{  "payme_client_key": "dguide_f4zdA0Qo",  "seller_id": "12345",  "seller_first_name": "First",  "seller_last_name": "Last",  "seller_social_id": "9999999999",  "seller_birthdate": "06/05/1989",  "seller_social_id_issued": "01/01/2000",  "seller_gender": 0,  "seller_email": "personal@example.com",  "seller_phone": "0540123456",  "seller_contact_email": "contact@example.com",  "seller_contact_phone": "031234567",  "seller_bank_code": 54,  "seller_bank_branch": 123,  "seller_bank_account_number": "123456",  "seller_description": "An online store which specializes in rubber ducks",  "seller_site_url": "www.babyducks.com",  "seller_person_business_type": 2000,  "seller_inc": 2,  "seller_inc_code": "123456",  "seller_retail_type": 1,  "seller_merchant_name": "Baby Ducks",  "seller_address_city": "Tel Aviv",  "seller_address_street": "Rothschild",  "seller_address_street_number": "1",  "seller_address_country": "IL",  "market_fee": 5}`,
      },
      async function (error, response, body) {
        /* console.log("Status:", response.statusCode);
        console.log("Headers:", JSON.stringify(response.headers));
        console.log("Response:", typeof body, body);
        console.log("USER", user);*/
        if (response.statusCode === 200 && user.uid !== undefined) {
          const Jbody = JSON.parse(body);
          const seller_data = {
            status_code: Jbody.status_code,
            seller_payme_id: Jbody.seller_payme_id,
            seller_payme_secret: Jbody.seller_payme_secret,
            seller_id: Jbody.seller_id,
          };
          await firestore.set(
            `users/${user.uid}`,
            { seller_info: seller_data },
            { merge: true }
          );
        }
      }
    );
    console.log("after request");
  } catch (error) {
    console.log(error);
  }
};
