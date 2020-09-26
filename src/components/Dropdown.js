import React, {useState, useEffect, useRef} from 'react';

//destructure options, and selected, and onSelectedChange out of props object
const Dropdown = ({label, options, selected, onSelectedChange})=> {
    //used to toggled classNames for dropdown being open or not.
    //default to being closed first.
    const [open,setOpen] = useState(false);

    const ref = useRef();

    //want this to only run once. 
    //whenver componet first rendered on screen 
    // set up event listener to listen to that body element
     //this fixed it when click outside the dropdown it closes, 
            //but now when click on element in the dropdown it doesnt close. 
            //that is beacus of the order of the event listeners being called. 
            //addeventListerner gets called first then react event listeners with the most child 
            //up to parents. 
            //so set to false firts then at dropdown clicked will change it to true. 
            //so when the itme element clicked dont want the addeventlistener to change the state.
            //going to make use of the useRef for hooks similar to react.creat ref.
            //useRef allow us ot get the reference of a DOM element.
            //going to get refernce to div with className ui form goin to see wheathe or not elemnent clicked
            //on was inside of that .
            //put ref = {ref } on the most parent div of this componetn 
            //if want get reference to that div by making use of ref.current 
            //if the element is in the dropdown compoenne then don't do anything.
            //  have to make sure that whenever remove the dropdown compoent from DOM need to turn off the eventListener,
            //so make use of the clean up fucntion in useEfffect. going to be invoked the next time this useEffect called. 
            //another time this clean up function invoked is whenever we are going to remove the dropdown component entirly.
    useEffect(()=>{
        // document.body.addEventListener('click', (event)=>{
        //     if(ref.current.contains(event.target)){
        //         return;
        //     }
        //     console.log('body click');
        //     // console.log(event.target);
        //     setOpen(false);
        // });
        const onBodyClick = (event) =>{
            if(ref.current.contains(event.target)){
                return;
            }
            setOpen(false);
        }
        document.body.addEventListener('click', onBodyClick);

        //this is the clean up function 
        return () =>{
            document.body.removeEventListener('click',onBodyClick);
        };
    }, []);

    const renderedOptions = options.map((option) =>{
        //this is so the selected option doesnt show up in the dropdown
        //menu since it is already selected
        if(option.value === selected.value){
            //null in react means don't render anyrhing. 
            return null;
        }
        return(
            // onSelectedChnage from the app.js file is the setSelected funciton that is
            //going to update the selected state which will cause the app to the app to render 
            <div 
                key = {option.value} 
                className = "item"
                onClick = {() => {
                    // console.log('item clicked');
                    onSelectedChange(option)
                }}

            >
                {option.label}
            </div>
        );
    });
    //want to be able to open and close dropdown. by default the dropdown should be closed. 
    //when person clicks individual item want to close the dropdown too with new option choicen. 
    //the way to close dropdown is to get rid of the className visible active and 
    //visible transition. to have the dropdown you add it in. so toggle those two places.
    //want to close the dropdown when click outside of it too. 
    // Trying to click on some element not created by the dropdown component. 
    //event handlers doesnt do this. 

 
    return (
        <div ref = {ref} className = "ui form">
            <div className = "field">
                <label className = "label">
                    {/* Select a Color */}
                    {label}
                </label>
                <div 
                    onClick = {()=> {
                        // console.log('dropdown clicked');
                        setOpen(!open)} 
                    }
                    // className= "ui selection dropdown visible active"
                    //going to use string templeting
                    className = {`ui selection dropdown ${open? 'visible active': ''}`}
                >
                    <i className = "dropdown icon"></i>
                    <div className = "text"> {selected.label}</div>
                    {/* <div className = "menu visible transition"> */}
                    <div className = {`menu ${open ? 'visible transition' : ''}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;