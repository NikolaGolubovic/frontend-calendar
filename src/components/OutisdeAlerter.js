import React, { useRef, useEffect } from "react";

function useOutsideAlerter(ref, props) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      console.log(event.target);
      const { setLoginOn, setSignUpOn } = props;
      if (ref.current && !ref.current.contains(event.target)) {
        setSignUpOn(false);
        setLoginOn(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props);
  return <div ref={wrapperRef}>{props.children}</div>;
}

export default OutsideAlerter;
