// src/components/ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // हर बार जब राउट बदले, तो स्क्रॉल टॉप पर जाए
    window.scrollTo(0, 0);
  }, [pathname]); // pathname बदलने पर ही चले

  return null; // कुछ भी रेंडर नहीं करता
};

export default ScrollToTop;