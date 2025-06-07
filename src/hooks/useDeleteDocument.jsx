import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/Config";

import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null
};

const deleteReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {loading: true, error: null};
        case "DELETED_DOC":
            return {loading: false, error: null};
        case "ERROR":
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const useDeleteDocument = (docColletion) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState);
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled) return;
        else dispatch(action);
    };

    const deleteDocument = async(id) => {
        checkCancelBeforeDispatch({type: "LOADING"});

        try {
            const deleteDocument = await deleteDoc(doc(db, docColletion, id));

            checkCancelBeforeDispatch({type: "DELETED_DOC", payload: deleteDocument});
        } catch(error) {
            checkCancelBeforeDispatch({type: "ERROR", payload: error.message});
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { deleteDocument, response };
};
