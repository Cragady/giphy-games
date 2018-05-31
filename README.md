<h1>Main Purpose<h1>

The main purpose of this assignment was to utilize api's to pull gifs from giphy. This project shows understanding on basic uses of api's. 

The user clicks on a button, which sends them gifs according to how the button is labeled. The user has an option to add another button for a topic of their choosing. I went with the topic of video games for most of the buttons, but if the user does not want to use video games as a topic they can input any other topic of their choosing.


<h1>Some of the Functions<h1>

**newTopic**<hr>

The `newTopic` function is what allows the user to add a new button with a new topic. It has an if statement that prevents a new button from being added if it is already an available topic. The weakness this function has is that it doesn't prevent a topic being put in if it is spelled incorrectly or differently. New topic calls `toLower` which puts the entire topics array into the `topicsChecker` array, which then checks it against userInput. 

`newTopic` is called in the `$(document).ready` function.

**gifyGo**<hr>

`gifyGo` is responsible for playing and pausing gifs by checking and changing the `play-status` in the html, and updates the `src` appropriately to play the gif or pause it.

**clicketyClack**<hr>

This function is responsible for laying down the related gifs for the chosen topic on the button click it's associated with. The button click will reassign the value of `topReq`, which is used in the url, so that the ajax can make the appropriate request. 

after the gifs are requested, the promise uses a for loop to display the ten gifs using a for loop, in the for loop the gifs are put in elements with the appropriate classes for sizing and placements.

Since ajax is ran asynchonously, `gifyGo` is called in the promise portion to ensure that after each new set of gifs are loaded, they are still able to be played and paused at the user's discretion.

**btnLayout**<hr>

`btnLayout` lays out all of the buttons with the corresponding topics, the initial topics and the newly added topics given by the user. `clicketyClack` is called here to keep the function on call when a new topic is added, and when `btnLayout` is called in the `$(document).ready` portion.