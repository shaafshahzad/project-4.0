import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { db, signInWithGoogle } from "./firebase";
import { getUserData } from "./get-user-data";
import { doc, setDoc } from "firebase/firestore";

export async function signIn(router: AppRouterInstance) {
    await signInWithGoogle().then(async (result) => {
        const user = await getUserData(result.user.uid);
        if (result.user.uid) {
            if (user) {
                router.push("/dashboard");
            } else {
                setDoc(doc(db, "users", result.user.uid), {
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                    uid: result.user.uid,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                router.push("/dashboard");
            }
        } else {
            throw new Error("Error");
        }
    })
}