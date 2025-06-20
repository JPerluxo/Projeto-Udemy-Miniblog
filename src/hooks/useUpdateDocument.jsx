import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/Config";

import { updateDoc, doc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
};

const updateReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {loading: true, error: null};
        case "UPDATED_DOC":
            return {loading: false, error: null};
        case "ERROR":
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const useUpdateDocument = (docColletion) => {
    const [response, dispatch] = useReducer(updateReducer, initialState);
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled) return;
        else dispatch(action);
    };

    const updateDocument = async(id, data) => {
        checkCancelBeforeDispatch({type: "LOADING"});

        try {
            const docRef = await doc(db, docColletion, id);

            const updatedDoc = await updateDoc(docRef, data);

            checkCancelBeforeDispatch({type: "UPDATED_DOC", payload: updatedDoc});
        } catch(error) {
            checkCancelBeforeDispatch({type: "ERROR", payload: error.message});
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { updateDocument, response };
};
