// <<the client-side code>> //

// Create a new date instance dynamically with JS
//to add the full date in the app
const d = new Date();
const newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

//Use credentials and the base url(base url & apiKey)
//to get the weather info by ZIP code city from ->openweathermap
const baseAPIURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
    //this is a personal API key from openweathermap.org ,
    //add (&units=metric) to get temperature in Celsius
const apiKey = '&appid=1f310812a7e45a6b40d56c54e677bd44&units=metric';

//creat (EventListener) to the Button
//generatPAction callbake function by the EventListener
document.getElementById('generate').addEventListener('click', generatPAction);
//creat 2 const call the id of error from HTML, to display an error message to the user
//learn it from Tutorial website  
const errorElmF = document.getElementById('errorF')
const errorElmZ = document.getElementById('errorZ')

//callbak function to get the data after user click the 'generate' button(POST data to API)
function generatPAction() {
    //'.value' takes the data (zip & feeling) from user inpout
    //call id 'zip' & 'feelings' from HTML
    const cityZipCode = document.getElementById('zip').value;
    const userFeeling = document.getElementById('feelings').value;
    //creat array to push the error Messages to it and display to user
    const errorMessageZ = []
    const errorMessageF = []
        //if condition run if the user didn't enter the zip code or if the zip code < 9000 it invalid,  Because it's always bigger than that number.
    if (cityZipCode === '' || cityZipCode === null || cityZipCode < 9000) {
        //the error Messages display to user
        errorMessageZ.push('Please: Remember to add your api key! ...' + '\n' + 'Or ZIP code invalid ...')
            //use setTimeout to make the error message disappear automatically after 3 seconds
            // learn it from -> sitepoint.com
        setTimeout(_ => errorElmZ.innerHTML = '', 3000)
    }
    if (errorMessageZ.length <= 6) {
        errorElmZ.innerText = errorMessageZ.join()
    }
    //if condition run if the user didn't enter the feeling
    if (userFeeling === '' || userFeeling === null) {
        //the error Messages display to user
        errorMessageF.push('Please: Enter your feeling ...')
            //use setTimeout to make the error message disappear automatically after 3 seconds
        setTimeout(_ => errorElmF.innerHTML = '', 3000)
    }
    if (errorMessageF.length <= 6) {
        errorElmF.innerText = errorMessageF.join()
    }
    //getWeatherInfo , to retern the promise of data from getWeatherInfo function 
    getWeatherInfo(baseAPIURL, cityZipCode, apiKey)
        //POST data to API .get of zip code info
        .then((data) => {
            console.log(data); //print the data in console
            //Post the data (date, temp, feeling)
            //object take the data from app then send it to the server
            postTheData('/addPoData', { date: newDate, temp: data.main.temp, feel: userFeeling })
            updateTheUI(); //function to update the UI
        }); //end .then
};
//POst dada of Zip code from API key, using 
//getWeatherInfo async function, is declared with the async keyword, and the await keyword is permitted within The async and await 
const getWeatherInfo = async(baseAPIURL, cityZipCode, apiKey) => {
        //await , Wait for the data
        //fetch() method  provides logical way to fetch resources asynchronously across the network.
        const res = await fetch(baseAPIURL + cityZipCode + apiKey)
        try {
            const data = await res.json();
            console.log(data) //print data in console
            return data;
        } catch (Error) { //catch any error,appropriately handle the error
            console.log("Error!!", Error); //print the error in console
            // appropriately handle the error
        }
    }
    //we have set up a POST route in the file server.js and save it
    //the code we could use to make a POST request to our 
    //POST data by postTheData async function
const postTheData = async(url = '', data = {}) => {
        console.log(data); //print the data in console
        const res = await fetch(url, {
            //HTTP POST method sends data to the server.
            method: 'POST', //because we are accessing the POST route we setup in server.js
            credentials: 'same-origin', //include, same-origin, omit
            headers: {
                // type of the body of the request is indicated by the Content-Type header
                'Content-Type': 'application/json',
            },
            // Body data type must match "Content-Type" header        
            body: JSON.stringify(data),
            /*convert a JavaScript object into
                     a string using the JavaScript method JSON.stringify(),
                     which turns JavaScript objects and JSON data into a string 
                     for our server to receive the information. 
                     turning the JavaScript object passed in the data parameter into a string.*/
        });
        try {
            const newData = await res.json();
            console.log(newData); ////print the new data in console
            return newData;
        } catch (Error) { //catch any error,appropriately handle the error
            console.log("Error!!", Error); //print the error in console
        }
    }
    // Call async Function, this function to get data 
    //update the UI here
const updateTheUI = async(url = '') => {
    //Fetch API with my credentials and user input to get dynamic data into my app routes
    const req = await fetch('/allGtData');
    try {
        // Transform into JSON
        //data is JSON , retern it to object
        const allData = await req.json();
        //the same object that we put in the server
        //call id of div 'date','temp','content' from HTML
        document.getElementById('date').innerHTML = `Date Today : ${allData.date}`;
        //add &degC; to encode Degree Celsius symbol
        document.getElementById('temp').innerHTML = `Temperature : ${allData.temp}` + ` &degC`;
        document.getElementById('content').innerHTML = `Your Feeling is : ${allData.feel}`;

    } catch (Error) { //catch any error,appropriately handle the error
        console.log("Error!!", Error); //print the error in console
    }
}