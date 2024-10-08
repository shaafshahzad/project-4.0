import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { getUserData } from "@/lib/get-user-data";
import type { DocumentData } from "firebase/firestore";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function useAuth(
	router: AppRouterInstance,
) {
	const [userData, setUserData] = useState<DocumentData | undefined>(
		undefined
	);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const userData = await getUserData(user.uid);
				setUserData(userData);
			} else {
				setUserData(undefined);
				router.push("/");
			}
		});

		return () => unsubscribe();
	}, [router]);

	return userData;
}
