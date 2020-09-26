import React, {useState, useEffect} from 'react';
import axios from 'axios';
//  import { ConsoleWriter } from 'istanbul-lib-report';

const Search = ()=>{
    const [term, setTerm ] = useState('programming');
    const [results, setResults] = useState([]);
    // console.log("I RUN WITH EVERY RENDER")
    //in useEffect the first argument always going to be arrow functions.
    //we have to configure use effect to when want to execute it. with one of 
    //the 3 ways i showed the diagram in the drive. This will be set in second argument
    //the 3 options for the second argument can be 
    //1. [], (run at inital render)
    //2.[term] (array with one or more elements inside of it ) (run at initial render and run after every rerender if data has chnaged)
    //3. no array, nothing (run at inital render and after every rerender)

    // useEffect(()=>{
    //     console.log("I ONLY RUN ONCE");
    // }, []);
    // useEffect(()=>{
    //     console.log("I RUN AFTER EVERY RENDER AND AT INITIAL RENDER");
    // });
    //can add more term to the [] and the function will execute when eithe of those
    //terms have changed.
    // useEffect(()=>{
    //     console.log("I RUN AFTER EVERY RENDER if term changes AND AT INITIAL RENDER");
    // }, [term]);

    //whenever rerender comoonent and term has changed run arrow function. Also
    //means run the arrow funcrion when component first time rendering.
    //dowmside with useEffect is that the fucntion fro the first argument we cant use 
    //async and await. can define a function inside of useEffect fucntion and mark that as async
    //like below

    // useEffect(()=>{
    //     const search = async () => {
    //         await axios.get('asjdkahs');
    //     };
    //     search();
    // }, [term]);

    //or method 2: this will still invoke the function. it defines the function and then 
    //edmitally invokes it. 
    // useEffect(()=>{
    //     (async () => {
    //         await axios.get('asjdkahs');
    //     })();
        
    // }, [term]);

    // method 3: using normal promises

    // useEffect(()=>{
    //    axios.get('dkhcldshfk')
    //       .then((response) => {
    //             console.log(response.data);
    //    });
        
    // }, [term]);

    // console.log(results);

     useEffect(() => {
        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params:{
                    action:'query',
                    list:'search',
                    origin:'*',
                    format:'json',
                    srsearch: term,
                },
            });
            setResults(data.query.search);
        };

        //the first time rendereing component want to search right away 
        //no results yet.
        if(term && !results.length){
            search();
        }else{

            //set a 500 milosecond timer . setTimeout is a javascript fucntion
            const timeoutId = setTimeout(()=>{
                //make sure term isnt an empty string. 
                if(term){
                    search();
                }
            },500);
            
            //going to use a default search term instead so dont need to worry
            // search()
            //this is the cleanup fucntion explained more below. will be executed after this fucntion gets
            //callled again. 
            return ()=> {
                clearTimeout(timeoutId);
            };
        }
       
        
    }, [term]);

    //the clean up function is the key of how we will cancell the previous timer. 
    //there is only one type of value allowed to return from the first function 
    //argument and that is a function. 
    //when time to call the arrow function again react will call the 
    //cleanup function first
    // useEffect(()=>{
    //     console.log("initial render or term was changed");
    //     return ()=> {
    //         console.log('CLEANUP');
    //     };
    // }, [term]);

    //need to get rid of the spans beacsue give back html as the result.snippet
    //can look thought paragraph and get rid of them or can take it and render it 
    //as html inside our app.
    //string want to turn to JSX 
    const renderedResults = results.map((result) => {
        return (
            <div key = {result.pageid} className = "item">
                <div className = "right floated content">
                    <a 
                        className = "ui button"
                        href = {`https://en.wikipedia.org?curid=${result.pageid}`}
                    >
                        Go
                    </a>
                </div>
                <div className = "content">
                    <div className = "header">
                        {result.title}
                    </div>
                    {/* string want to turn to JSX */}
                    {/* this is dangerous to do beacsuse when get from get bad html with embedding javascript code */}
                    {/* cross side scripting */}
                    {/* when use this have to be confident that whoever providing this html someone can trust  */}
                    <span dangerouslySetInnerHTML= {{ __html: result.snippet}}></span>
                     {/* {result.snippet} */}
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className = "ui form">
                <div className = "field">
                    <label>Enter Search Term</label>
                    <input 
                        value = {term}
                        onChange ={e => setTerm(e.target.value)} 
                        className = "input"
                    />
                </div>
            </div>
            <div className = "ui celled list">
                {renderedResults}
            </div>
        </div>
    );
};

export default Search;