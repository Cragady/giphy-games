var topics = ["Dark Souls", "Kingdom Hearts", "Super Smash Brothers", "Metroid", "Final Fantasy", "Gravity Rush", "Persona 4", "Persona 3", "The Legend of Zelda", "Paper Mario", "Longboarding", "Biking", "Anime", "Walking"];
var topicsChecker = [];
var topReq;
var filtered = false;
var ratingLevel = ["g", "pg", "pg-13", "r"];

function newTopic(){
    $("#add-new-game").click(function(){
        event.preventDefault();
        userInput = $("#new-game").val().toString();
        toLower();
        if(!topicsChecker.includes(userInput)){
            topics.push(userInput);
            btnLayout();
        }
    });
};

function toLower(){
    $.each(topics, function(index){
        topicsChecker[index] = topics[index].toLowerCase(); 
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
        var topicUrl = "https://api.giphy.com/v1/gifs/search?q=" + topReq + "&api_key=GhK5NbgIlLn6AVToOnwOLl3clsoaBEdR&limit=10&rating=pg-13";
        $("#gifs-galore").empty();
        $.ajax({
            url: topicUrl,
            method: "GET"
        }).then(function(response){
            // delete response.data[9]; these two lines i'm intentionally leaving in for future reference for me
            // response.data.length--;
            for (i = 0; i < response.data.length; i ++){
                gifUrl = response.data[i].images.original_still.url;
                newGif = $("<img>");
                newDiv = $("<div>");
                newGif.attr({src: gifUrl, 
                    alt: topReq, 
                    "play-status": "still", 
                    "still-url": gifUrl, 
                    "moved-url": response.data[i].images.original.url})
                newDiv.prepend(newGif);
                newDiv.prepend($("<p>").text(response.data[i].rating));
                newDiv.attr("class", "col col-6 col-md mx-auto p-2 border border-info");
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

