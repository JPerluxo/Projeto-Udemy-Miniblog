import { useState, useEffect } from "react";
import { db } from "../firebase/Config";

import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {

        async function loadDocument() {
            if(cancelled) return;
            setIsLoading(true);

            try {
                const docRef = await doc(db, docCollection, id);
                const docSnap = await getDoc(docRef);

                setDocument(docSnap.data());
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setError(error.message);

                setIsLoading(true);
            }
            
        };

        loadDocument();
    }, [docCollection, id, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return { document, isLoading, error };
};
