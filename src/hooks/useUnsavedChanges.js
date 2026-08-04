import { useEffect } from "react";

export default function useUnsavedChanges(isDirty) {

    useEffect(() => {

        const handleBeforeUnload = (event) => {

            if (!isDirty) return;

            event.preventDefault();

            event.returnValue = "";

        };

        window.addEventListener(
            "beforeunload",
            handleBeforeUnload
        );

        return () =>

            window.removeEventListener(
                "beforeunload",
                handleBeforeUnload
            );

    }, [isDirty]);

}