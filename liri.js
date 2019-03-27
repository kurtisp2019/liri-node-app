/**
 * 
 *      This is the liri.js file
 * 
 */


require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var fs = require("fs");

//var spotify = new Spotify(keys.spotify);
var searchQuery = process.argv[3];


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

        debugger
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

function findABand(_artistName) {
    debugger
    var bandsInTownQS = "https://rest.bandsintown.com/artists/" + _artistName + "/events?app_id=codingbootcamp";

    axios.get(bandsInTownQS).then(function (_response) {
        

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

        debugger
    }).catch(function (e) {
        console.log(e);
    });



}

function findASong(_songName) {

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
           

    }).catch(function (e) {
        console.log("An error occured in findABand");
    });
}
    
        
        // almost had it working without the API lololololololololololoolololool
        // var request = require('request'); // "Request" library

        // var client_id = 'CLIENT_ID'; // Your client id
        // var client_secret = 'CLIENT_SECRET'; // Your secret

        // // your application requests authorization
        // var authOptions = {
        //     url: 'https://accounts.spotify.com/api/token',
        //     headers: {
        //         'Authorization': 'Basic ' + (new Buffer(keys.spotify.id + ':' + keys.spotify.secret).toString('base64'))
        //     },
        //     form: {
        //         grant_type: 'client_credentials'
        //     },
        //     json: true
        // };

        // request.post(authOptions, function (error, response, body) {
        
        //     console.log(keys.spotify.id);
        //     console.log(keys.spotify.secret);
        //     if (!error && response.statusCode === 200) {

            
        //         // use the access token to access the Spotify Web API
        //         var token = body.access_token;
            
        //         var options = {
        //             url: 'https://api.spotify.com/v1/tracks/vibyl',
        //             headers: {
        //                 'Authorization': 'Bearer ' + token
        //             },
        //             json: true
        //         };
        //         request.get(options, function (error, response, body) {
        //             console.log(body);
        //         });
        //     }
        // });
    
        // authorize the user/client
        // const authEndpoint = "https://accounts.spotify.com/api/token";

        // var authOptions = {
        //       authorization: 'Basic ' + (keys.spotify.id + ':' + keys.spotify.secret).toString() ,    
        //       grant_type: 'client_credentials'

        // };
    
        // axios.post(authEndpoint, authOptions).then(function () {
        //     console.log(accessToken);
        //     console.log("ok");
        // }).catch(function (e) {
        //     console.log(e);
        //     console.log("something went wrong");
        // });

        // var spotifyQS = "https://api.spotify.com/v1/search?q="+ _songName +"&type=artist";
        // axios.get(spotifyQS).then(function (_response) { 
        //     console.log(_response.data[0]);
        
        // }).catch(function (e) {
       
        //     console.log(e);
        // });

    

function findAMovie(_movieName) {
    var omdbQS = "https://www.omdbapi.com/?t=" + _movieName + "&tomatoes=true&plot=short&apikey=trilogy";

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





