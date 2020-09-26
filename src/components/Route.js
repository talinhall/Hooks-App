import {useState, useEffect} from 'react';
//don't need to import react because not running jsx

//take two props path, and component
const Route = ({path, children}) =>{
    const [currentPath, setCurrentPath] = useState(window.location.pathname);


    useEffect(() => {
        const onLocationChange = () => {
            // console.log('location chaneg');
            //now need route component to rerneder itself. to get window.location.pathname
            //so need a piece a state to just get the route component to rerender itself.
            setCurrentPath(window.location.pathname);
        };
        //goign to wire up an event listener
        //listen for popstate the call funciton called onLocationChange. 
        window.addEventListener('popstate', onLocationChange);
        //whnever stop using this component need to clean up the event listener.
        return () =>{
            window.removeEventListener('popstate', onLocationChange);
        };
    }, []);
    //could update the currentPath
    return window.location.pathname === path 
        ? children
        : null;
};

export default Route;