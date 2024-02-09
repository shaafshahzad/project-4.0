// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

const provider = new GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/calendar');
provider.addScope('https://www.googleapis.com/auth/calendar.events');

export const auth = getAuth();

export const signInWithGoogle = () => {
    return new Promise<any>((resolve, reject) => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;

                if (token) {
                    const userRef = doc(db, "users", user.uid);

                    await setDoc(userRef, { googleAccessToken: token }, { merge: true });
                }

                resolve(result);
            }).catch((error) => {
                reject(error);
            });
    });
};

export const userSignOut = () => {
	return new Promise<void>((resolve, reject) => {
		signOut(auth)
			.then(() => {
				resolve();
			})
			.catch((error) => {
				reject(error);
			});
	});
};
