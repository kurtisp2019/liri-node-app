/**
 * 
 *      This is the liri.js file
 * 
 */

// reqquires
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var fs = require("fs");

//var spotify = new Spotify(keys.spotify);

// Value passed in by the user to search with
var searchQuery = process.argv.splice(3).join(" ");

/************************************************************************* */
/**     Check to see what action the user wants to perform                */
/************************************************************************* */
if (process.argv[2] === "concert-this") {
    findABand(searchQuery);

}
else if (process.argv[2] === "spotify-this-song") {
    findASong(searchQuery);
}
else if (process.argv[2] === "movie-this") {
    findAMovie(searchQuery);

}
else if (process.argv[2] === "do-what-it-says") {

    fs.readFile("random.txt", "utf-8", function (error, data) {
        var contents = data.split(',');

        for (var i = 0; i < contents.length-1; ++i) {

            if (contents[i] === "concert-this") {
                findABand(contents[i + 1]);
            }
            else if (contents[i] === "spotify-this-song") {
                findASong(contents[i + 1]);
            }
            else if (contents[i] === "movie-this") {
                findAMovie(contents[i + 1]);
            }
        }
    });
}



/************************************************************************* */
/**     name:       findABand                                              */
/*                                                                         */
/**     parameters: _artistName, used to search for an artist or band      */
/*                  by their name.                                         */
/*                                                                         */ 
/*      return:     none.                                                  */
/*                                                                         */      
/*      purpose:    query the bands in town website for data by band       */
/*                  name or artist name.                                   */                                                                     
/************************************************************************* */
function findABand(_artistName) {
    
    // create the bands in town query string
    var bandsInTownQS = "https://rest.bandsintown.com/artists/" + _artistName + "/events?app_id=codingbootcamp";

    // use axios to get data from the bandsintown website based on an artist name
    axios.get(bandsInTownQS).then(function (_response) {
        

        // loop through the repsonses data and display the data to the console
        for (var i = 0; i < _response.data.length; ++i) {
          
            console.log("---------------------------------------------------------------------------");
          
            //  Name of the venue
            console.log("Name of the venue:\t" + _response.data[i].venue.name);

            //  Venue location
            console.log("Location of the venue:\t" + _response.data[i].venue.city);

            //  Date of the Event (use moment to format this as "MM/DD/YYYY")
            var dateArr = _response.data[i].datetime.split("T");
            var date = dateArr[0].split('-');
            console.log("Date of the event:\t" + date[1] + '-' + date[2] + '-' + date[0]);
            console.log("---------------------------------------------------------------------------");
                
        }

        
    }).catch(function (e) {
        console.log(e);
    });



}

/************************************************************************* */
/*      name:       findASong                                              */
/*                                                                         */
/*      parameters: _songName, used to search for an song by name.         */
/*                                                                         */ 
/*      return:     none.                                                  */
/*                                                                         */      
/*      purpose:    query spotify for data based on a song name.           */ 
/************************************************************************* */
function findASong(_songName) {

    // if the _songName is null or is not set to anything
    //  default to The Sign
    if (_songName === null || _songName === "")
        _songName = "The Sign";
    
    // search spotify for data based on the song passed in (_songName)
    spotify.search(
        {
            type: 'track',
            query: _songName
        }).then(function (data) {

            console.log("---------------------------------------------------------------------------");
            //   Artist(s)
            for (var i = 0; i < data.tracks.items[0].artists.length; ++i)
                console.log("Artist(s):\t\t" + data.tracks.items[0].artists[i].name);

            // The song's name
            console.log("Name of the song:\t" + data.tracks.items[0].name);

            // A preview link of the song from Spotify
            console.log("Preview url:\t\t" + data.tracks.items[0].preview_url);

            // The album that the song is from
            console.log("Album:\t\t\t" + data.tracks.items[0].album.name);
            //console.log(data.tracks.items[0]);
            console.log("---------------------------------------------------------------------------");
           

    // if something goes wrong, the program will be thrown to here
    }).catch(function (e) {
        console.log("An error occured in findABand");
    });
}
    
        
  
    
/************************************************************************* */
/*      name:       findAMovie                                              */
/*                                                                         */
/*      parameters: _movieName, used to search for an movie by name.       */
/*                                                                         */ 
/*      return:     none.                                                  */
/*                                                                         */      
/*      purpose:    query omdb for movie data based on a movie name        */
/************************************************************************* */
function findAMovie(_movieName) {

    // if the _moviename is null or is not set to anything
    //  default to Mr.Nobody
    if (_movieName === null || _movieName === "")
        _movieName = "Mr. Nobody";
    
    // create the query string
    var omdbQS = "https://www.omdbapi.com/?t=" + _movieName + "&tomatoes=true&plot=short&apikey=trilogy";

    // query omdb for movie data
    axios.get(omdbQS).then(function (_response) {
        console.log("---------------------------------------------------------------------------");
            
        //console.log(_response);
        // * Title of the movie.
        console.log('\n' + "Movie Title:\t\t\t" + _response.data.Title);

        // * Year the movie came out.
        console.log("Movie Release Date:\t\t" + _response.data.Released);

        // * IMDB Rating of the movie.
        console.log("IMDB Rating:\t\t\t" + _response.data.imdbRating);

        // * Rotten Tomatoes Rating of the movie.
        console.log("Rotten Tomatoes:\t\t" + _response.data.tomatoRating);

        // * Country where the movie was produced.
        console.log("Country movie was produced in:\t" + _response.data.Country);

        // * Language of the movie.
        console.log("Language:\t\t\t" + _response.data.Language);

        // * Actors in the movie.
        console.log("Movie Actors:\t\t\t" + _response.data.Actors + '\n');

        // * Plot of the movie.
        console.log("Movie Plot:\t\t\t" + _response.data.Plot + '\n');
        console.log("---------------------------------------------------------------------------");
             
    });



}





