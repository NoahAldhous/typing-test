import { useState, useEffect } from "react";
import "./App.css";

import Input from "../Input/index.js";
import Button from "../Button/index.js";
import Header from "../Header/index.js";

function App() {
  //set default state of word and input box
  const [word, setWord] = useState("");
  const [userInput, setUserInput] = useState("");
  //const [listOfWords, setListOfWords] = useState([]);
  const [wordCounter, setWordCounter] = useState(0);

  // (REFACTOR FOR MULTIPLE WORDS)
  async function fetchData() {
    const source = "https://random-word-api.herokuapp.com/word";
    const response = await fetch(source);
    const data = await response.json();
    console.log(data);
    //'data' returns as an array of 1, so setting the word
    //here as data[0] saves confusion down the line
    setWord(data[0]);
  }

  //useEffect hook stops error messages regarding promises being returned
  useEffect(() => {
    fetchData();
  }, []);

  //gets one random word
  function getWord() {
    fetchData();
  }

  //function that is called onKeyDown in Input component
  function handleKey(e) {
    //if key pressed is the enter key and user inputted word
    //matches the random word-
    if (e.key === "Enter" && userInput === word) {
      //fetch a new word
      getWord();
      //reset the user input state
      setUserInput("");
      //increase wordCounter by one
      setWordCounter(wordCounter + 1);
      //and reset the text in the input field
      document.querySelector("input").value = "";
    }
  }

  //function that is called whenever input field value changes (i.e as user types)
  function handleChange(e) {
    //as user types, the UserInput state is updated to what they've typed
    setUserInput(e.target.value);
    //and that state is checked against the current random word state
    if (userInput === word) {
      //if they match, get a new random word-
      getWord();
      //reset the text in the input field
      e.target.value = "";
      //increase wordCounter by one
      setWordCounter(wordCounter + 1);
      //and reset the input state
      setUserInput("");
    }
    //If user types a string that is not included in the word, turns the word red
    //to tell user they have made a mistake
    if (word.includes(userInput) === false) {
      document.querySelector(".Word").setAttribute("style", "color: red");
    }
    //if user corrects this mistake, turns the word black to show they are back on track.
    if (word.includes(userInput)) {
      document.querySelector(".Word").setAttribute("style", "color: black");
    }
  }

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#EDDFEF",
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#696D7D",
          minHeight: "40%",
          minWidth: "45%",
          borderRadius: "1%",
          paddingLeft: "3%",
          paddingRight: "2%"
        }}
      >
        <div
          style={{
            paddingTop: "3%",
            
          }}
        >
          <Header word={word} />
        </div>
        <Input handleChange={handleChange} handleKey={handleKey} />
        <h3>{wordCounter}</h3>
        <form
          style={{
            display: "flex",
            marginTop: "5%",
            justifyContent: "space-evenly",
          }}
        >
          <Button getWord={getWord} text={"Get 1 Word"} number={1} />
          <Button getWord={getWord} text={"Get 5 Words"} number={5} />
          <Button getWord={getWord} text={"Get 10 Words"} number={10} />
        </form>
      </div>
    </main>
  );
}

export default App;