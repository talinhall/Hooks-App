import React from 'react';
import Link from './Link';

const Header = () => {
    //everytime click on get a wide verity of requests. Not exacty
    //what we want. 
    //How an HTML based web application is done. Not react. When click links
    // we reload the entire index.html file inside of our project and reload all of the js and css
    // as well.That is not ideal inside of a react application. We have already when we first come to our application 
    //loaded up index.html file all the js and css. 
    //There is no reason for a react app for us to do a hard reload of page and reload. What would be ideal is if
    // we click on the navigation links update the url but not do a full page reload
    //when user clicks on the ancers we are goign to build a navigation event that will communicate 
    //with the rest of the application that the url has chnaged. 
    return(
        <div className = "ui secondary pointing menu">
             <Link href= "/" className = "item">
                Accordion
            </Link>
            <Link href= "/list" className = "item">
                Search
            </Link>
            <Link href= "/dropdown" className = "item">
                Dropdown
            </Link>
            <Link href= "/translate" className = "item">
                Translate
            </Link>
            {/* <a href= "/" className = "item">
                Accordion
            </a>
            <a href= "/list" className = "item">
                Search
            </a>
            <a href= "/dropdown" className = "item">
                Dropdown
            </a>
            <a href= "/translate" className = "item">
                Translate 
            </a> */}
        </div>
    );
};

export default Header;