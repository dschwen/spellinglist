/**
 * Script funtions to manage the actual spelling test
 */

function shuffle(array)
{
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// input box
var word = document.getElementById("word");
// check button
var button = document.getElementById("check");
// progress bar
var bar = document.getElementById("progressbar");

function say(text, rate)
{
  var msg = new SpeechSynthesisUtterance(text);
  msg.lang = 'en-US';
  msg.rate = rate || 1.0;
  window.speechSynthesis.speak(msg);
}

function sayWord()
{
  if (todo.length > 0) {
    say(todo[0], 0.75);
  }
  word.focus();
}

function analyze(guess, target)
{
  // check if a letter was added
  if (target.length + 1 == guess.length)
    for (var i = 0; i < guess.length; ++i)
      if ((guess.substr(0,i) + guess.substr(i+1)) === target)
        return 'You have an extra letter in there!';

  // check if a letter was left out
  if (guess.length + 1 == target.length)
    for (var i = 0; i < target.length; ++i)
      if ((target.substr(0,i) + target.substr(i+1)) === guess)
        return 'You left out a letter!';

  // count the different letters
  var diff = 0;
  if (target.length == guess.length)
    for (var i = 0; i < guess.length; ++i)
      if (guess[i] != target[i])
        diff++;
  if (diff == 1)
    return 'One of your letters is wrong!';

  return 'Sorry, that was not quite right. Please try again!';
}


function check()
{
  var guess = word.value;
  word.value = '';
  word.focus();

  if (todo.length > 0 && guess !== '')
  {
    if (guess === todo[0])
    {
      todo.splice(0,1)
      bar.style.width = (100.0 * todo.length / list.length) + '%';
      sayWord();
    }
    else
    {
      // generate a specific error message
      say(analyze(guess, todo[0]));

      // append the wrong word
      // todo.push(todo.splice(0,1)[0])
    }
  }

  if (todo.length == 0)
  {
    button.disabled = true;
    say("Congratulations, you are done for today!");
  }
}

word.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    check();
  }
});

// vocabulary list
//var list = ['strange', 'shrink', 'square', 'scrape', 'string', 'shrimp', 'squint', 'scratch', 'strong', 'shrunk', 'squeeze', 'screen', 'strict', 'shrug', 'squirt', 'scrap', 'squash'];
var list = ['gym', 'frog', 'giant', 'twig', 'germ', 'flag', 'gem', 'gone', 'orange', 'golf', 'gulp', 'gust'];
// var list = ['catch', 'lunch', 'teach', 'patch', 'bunch', 'reach', 'match', 'bench', 'beach', 'ditch', 'pinch', 'peach', 'mulch', 'coach', 'witch', 'march', 'speech', 'fetch', 'stretch'];

// shuffle the list
var todo = list.slice();
shuffle(todo);

// say the first word
sayWord();
