import { useEffect } from "react";
import ReactGA from "react-ga"

export default function ScrollToTop() {
    useEffect(()=>{
        ReactGA.initialize('UA-235248904-1');
    },[])        
    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        document.querySelector('body').scrollTo(0, 0)
    }, [window.location.pathname])
    return null
}