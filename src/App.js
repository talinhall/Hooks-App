import React, {useState} from 'react';
import Accodion from './components/Accordion';
import Search from "./components/Search";
import Dropdown from "./components/Dropdown";
import Translate from "./components/Translate";
import Route from './components/Route';
import Header from './components/Header';

const items = [
    {
        title: 'What is React?',
        content: 'React is a front end javascript framework'
    },
    {
        title: 'Why use React?',
        content: 'React is a fravorite JS library among engineers'

    },
    {
        title: 'How do you use React',
        content: 'You use React by creating compoents'
    }

];
//doesn't matter if put this inside the component or outside because it is 
//a static array of objects that is not going to change. 
const options = [
    {
        label: "The Color Red",
        value: "red"
    },
    {
        label: "The Color Green",
        value: "green"

    },
    {
        label: "The Shade of Blue",
        value: "blue"
    }
];

const showAccordion = () => {
    if(window.location.pathname === '/'){
        return <Accodion items= {items}/>;
    }
};

const showList = () => {
    if(window.location.pathname === '/list'){
        return <Search />;
    }
};

const showDropdown = () => {
    if(window.location.pathname === '/dropdown'){
        return <Dropdown/>;
    }
};

const showTranslate = () => {
    if(window.location.pathname === '/translate'){
        return <Translate/>;
    }
}

//the above is repetivtive can do a stand alone function like below. 
//or can do a react solution 
const showComponent = (route, component) => {
    return window.location.pathname === route
        ? component
        : null;
};
// we can make a component that shows other components based on the current pathname
//so will do route.js



export default () => {
    const [selected, setSelected] = useState(options[0]);
    // const [showDropdown, setShowDropdown] = useState(true);
    return (
        <div>
            <Header/>
            {/* to tell the route which component to show will 
            proved the component inside. the inner element is 
            provided to the outer one as a prop called children */}
            <Route path = "/" >
                <Accodion items={items}/>
            </Route>
            <Route path = "/list">
                <Search />
            </Route>
            <Route path = "/dropdown">
                <Dropdown 
                    label = "Select a color"
                    options = {options}
                    selected = {selected}
                    onSelectedChange = {setSelected}
                />
            </Route>
            <Route path= "/translate">
                <Translate />
            </Route>
            {/* {showAccordion()}
            {showList()}
            {showDropdown()}
            {showTranslate()} */}
            {/* <Translate/> */}
            {/* toggling the visiblity of the dropdown */}
            {/* at some point when remove tje dropdown the ref.current property gets assigned to null inside of dropdown.js */}
            {/*  have to make sure that whenever remove the dropdown compoent from DOM need to turn off the eventListener*/}
            {/* fixed is in useEffetc in dropdown compoennt with clean up fucntion */}
            {/* <button onClick = {() => setShowDropdown(!showDropdown)}>Toggle Dropdown</button>
            {showDropdown ?
             <Dropdown 
                onSelectedChange = {setSelected}
                selected = {selected} 
                options= {options}
             /> : null
            } */}
            {/* <Search/> */}
            {/* <Accodion items = {items}/> */}
        </div>
    );
    
};