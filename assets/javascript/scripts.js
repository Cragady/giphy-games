//api key for hw: GhK5NbgIlLn6AVToOnwOLl3clsoaBEdR
//create buttons for user to press, these buttons will be of different
//video games
/*create ajax call for the different buttons, and maybe include
a custom bar where a user can create a button for a game they want to see gifs
of and have the button appended and created*/
var topics = ["Dark Souls", "Kingdom Hearts", "Super Smash Brothers", "Metroid", "Final Fantasy", "Gravity Rush", "Persona 4", "Persona 3", "The Legend of Zelda", "Paper Mario", "Longboarding", "Biking", "Anime", "Walking"];
var topReq;
//var topReq = $(this).attr("id");

function newTopic(){
    $("#add-new-game").click(function(){
        event.preventDefault();
        userInput = $("#new-game").val();
        if(!topics.includes(userInput)){
            topics.push(userInput);
            btnLayout();
        }
    });
};

function gifyGo(){
    $("img").click(function(){
        statusGetter = $(this).attr("play-status");
        movingGif = $(this).attr("moved-url");
        stillGif = $(this).attr("still-url");
        if(statusGetter === "still"){
            $(this).attr("play-status", "moving");
            $(this).attr("src", movingGif);
        }
        if(statusGetter === "moving"){
            $(this).attr("play-status", "still");
            $(this).attr("src", stillGif);
        }
    });
};

function clicketyClack(){
    $("button").click(function(){
        topReq = $(this).text();
        var topicUrl = "https://api.giphy.com/v1/gifs/search?q=" + topReq + "&api_key=GhK5NbgIlLn6AVToOnwOLl3clsoaBEdR&limit=10";
        $("#gifs-galore").empty();
        $.ajax({
            url: topicUrl,
            method: "GET"
        }).then(function(response){
            console.log(response);
            console.log(response.data["2"]);
            var q = 3;
            console.log(response.data[q]);
            console.log(response.data.length);
            for (i = 0; i < response.data.length; i ++){
                gifUrl = response.data[i].images.original_still.url;
                newGif = $("<img>");
                newDiv = $("<div>");
                newGif.attr("src", gifUrl);
                newGif.attr("alt", topReq);
                newGif.attr("play-status", "still");
                newGif.attr("still-url", gifUrl);
                newGif.attr("moved-url", response.data[i].images.original.url);
                newDiv.prepend(newGif);
                newDiv.prepend($("<p>").text(response.data[i].rating));
                $("#gifs-galore").prepend(newDiv);
            }
            gifyGo();
        }); 
    });
};

function btnLayout(){
    $("#buttons-galore").empty();
    for (i = 0; i < topics.length; i++){
        newBtn = $("<button>");
        newBtn.text(topics[i]);
        newBtn.attr("id", ("topics-" + (i + 1)));
        $("#buttons-galore").append(newBtn);
    };
    clicketyClack();
};

$(document).ready(function(){
    btnLayout();
    newTopic();
});

