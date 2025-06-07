import { useState, useEffect } from "react";
import { db } from "../firebase/Config";

import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {

        async function loadData() {
            if(cancelled) return;
            setIsLoading(true);

            const collectionRef = await collection(db, docCollection);
            try {
                let _query;
                if (search) {
                    _query = await query(collectionRef, where("tagsArray", "array-contains", search), orderBy("createdAt", "desc"));
                } else if (uid) {
                    _query = await query(collectionRef, where("uid", "==", uid), orderBy("createdAt", "desc"));
                } else {
                    _query = await query(collectionRef, orderBy("createdAt", "desc"));
                }

                await onSnapshot(_query, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                        }))
                    );
                });

                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setError(error.message);

                setIsLoading(true);
            }
        };

        loadData();
    }, [docCollection, search, uid, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return { documents, isLoading, error };
};
