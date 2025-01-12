import { useEffect, useRef } from "react";

export default function useOutsideClick(handler, listenCapturing = true) {
    const ref = useRef();

    useEffect(() => {

        document.addEventListener("click", handleClick, listenCapturing);

        function handleClick(e) {

            // console.log(ref?.current?.contains(e.target))
            if (ref?.current && !ref?.current?.contains(e.target)) {
                handler();
            }
        }



        return () =>
            document.removeEventListener("click", handleClick, listenCapturing);
    }, [handler, listenCapturing]);


    return ref;
}
