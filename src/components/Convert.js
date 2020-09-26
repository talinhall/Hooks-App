import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Convert = ({language, text}) => {
    const [translated, setTranslated] = useState('');
    const [debouncedText, setDebouncedText] = useState(text);
    //anytime get new language or text will run the function in useEffect
    //whenever user types in input dont want to make request for every single key press. want to wait 500ms 
    //set up timer and cancel it with cleanup function untill wait 500ms then update debounced text in second useEffect
    // useEffect(()=>{
       
    //     //going to leave second argument as a empty object to say we dont want to 
    //     //send any information in the body of the request. instead we want to
    //     //provide a third argument  inside going to be params property with all of our query string parameters. 
    //     const doTranslation = async () => {
    //         //out of responce get data property so can destructure out data
    //         // const res = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
    //         const {data} = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
    //             params:{
    //                 q: text,
    //                 target: language.value,
    //                 key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
    //             },
    //         });
    //         setTranslated(data.data.translations[0].translatedText);
    //     };
    //     doTranslation();
    //     // console.log("new language or text");
    // }, [language, text]);

    /// using the method or debouncing can be better explained in optional video
    //this useEffect # 1
    useEffect(()=>{
        const timerId = setTimeout(() =>{
            setDebouncedText(text);
        }, 500);
        return () => {
            clearTimeout(timerId);
        };
    }, [text]);
    //this useEffect # 2
    useEffect(()=>{
       
        //going to leave second argument as a empty object to say we dont want to 
        //send any information in the body of the request. instead we want to
        //provide a third argument  inside going to be params property with all of our query string parameters. 
        const doTranslation = async () => {
            //out of responce get data property so can destructure out data
            // const res = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
            const {data} = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
                params:{
                    q: debouncedText,
                    target: language.value,
                    key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
                },
            });
            setTranslated(data.data.translations[0].translatedText);
        };
        doTranslation();
        // console.log("new language or text");
    }, [language, debouncedText]);

    return (
        <div>
            <h1 className = "ui header" > {translated}</h1>
        </div>
    );
};

export default Convert;