import React from "react";
import Loader from "../Common/Preloader/Loader";

export const withSuspense = (Component) => {

    return (props) => {
        return <React.Suspense fallback={<Loader/>}>
            <Component {...props} />
        </React.Suspense>
    }
}