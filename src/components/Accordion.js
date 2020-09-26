// import React from 'react';
//need to get the useState function from the react library. this is a hook 
//it gived us access to a state inside a functional component. 
import React, {useState} from 'react';

//every elememnt inside a list needs to have a unique key
    //will use title beacus it is unique and consistent across renders.
     /**don't want toi return the div because semantic Ui makes it 
            so that it adds an extra line on board to going to do react fragment
            react fragment is just a containing JSX element that
            react understands and we got two divs inside of it.
            we will give each item in list an index number so know which one is being clicked 
             migth want to add a mthod to handle the onClick when the code gets too long
                easy with class bases componetns beacuse just add a method like below 

                 class Accordion extends Component{
                    ontitleClick(){
                        console.log('title was clicked');
                    }
                    render(){
                        
                    }
                } 
                inside a function component a bit more challenging to add a 
                helper function. will be shown how to do it below. compeonet will be a 
                little cluttered when write out all helper functions inside of a 
                fucniton component. 

        Now need to make use of the hooks state system to keep track of which of the elements 
        need to expanded or collapsesd. 

        using the hooks ssytems to keep track of the index state as we would do with setstate in a
        class based component.
 **/

const Accordion = ({items} ) => {
    // This syntax for the usState is called array destructing.
    //It a syntax to tell javascript that we want to get out the 
    //first element of the array useState and assign it the variable 
    //activeIndex and the the second elemnt to variable setActiveIndex. 
    //when call useState get back array with 2 elements inside of it. 
    //seActiveIndex is a fucntion call to update state This will cause
    //entire component to renrender. the activeIndex is the  state we 
    //trying to keep track it this value will change over time. 
    //the null is the initial value of the state. 
    const [activeIndex, setActiveIndex] = useState(null);
    const onTitleClick = (index) =>{
        // console.log("title clicked", index);
        setActiveIndex(index);
    };

    const renderedItems = items.map((item, index) => {
        {/* the active class names controll wheather or not the 
            individual elemnt will be expanded. if the index at is the activeIndex
        then assign active to variable active otherwise assign empty string to it */}
            const active = index === activeIndex ? 'active' : ''; 
        return (
           <React.Fragment key = {item.title}>
             {/* <div key = {item.title}> */}
             
                <div 
                    // className = "title active"
                    //can do this below 
                    // className = {"title " + active} or
                    className = {`title ${active}`}
                    // onClick = {() => console.log('title clicked', index)}
                    //the reason wrap with arrow fucntion beacuse dont want to run function right when 
                    //page is rendered.
                    onClick = {() => onTitleClick(index)}
                >
                    <i className = "dropdown icon"></i>
                    {item.title}
                </div>
                {/* <div className = "content active"> */}
                <div className = {`content ${active}`}>
                    <p>{item.content}</p>
                </div>
             {/* </div> */}
            </React.Fragment>
        );
    });
    return <div className = "ui styled accordion">
        {renderedItems}
        {/* <hi>{activeIndex}</hi> */}
    </div>
}

export default Accordion;