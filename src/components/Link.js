import React from 'react';

const Link = ({className, href, children}) => {
    const onClick = (event) => {
        //taking care of cmd clikc and open new tab with taht link
        if(event.metaKey || event.ctrlKey){
            return;
        }
        //this will prevent a full page reload.
        //which is the normal behavior of the borwser.
        event.preventDefault();
        //now change url but not do full refresh 
        //use function build directly in browser
        window.history.pushState({}, '', href);
        //now whenever change url want different route component that url chnaged 
        //goign to use navigation event 
        //belwo will communicate to route components taht the url has just changed
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };
    return (
        <a  onClick = {onClick} className = {className} href= {href}> 
            {children} 
        </a>
    );
};

export default Link;