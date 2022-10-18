import React, { useState } from "react";
import QuoteDisplay from "./QuoteDisplay";

const randomQuoteUrl = "https://inspo-quotes-api.herokuapp.com/quotes/random";

function QuoteApp() {
  const [isDisplay, setIsDisplay] = useState(false);
  const [quote, setQuote] = useState({"text": "", "author": ""});

  function toggleDisplay() {
    let display = !isDisplay;
    setIsDisplay(display);
    //solution1: async function toggleDisplay(){await getQuote();}
    //solution2: getQuote2(); no async and await
    getQuote2();
  }

  async function getQuote() {
    let response = await fetch(randomQuoteUrl);
    let newQuote = await response.json();
    console.log("newQuote*********", newQuote);
    setQuote(quote => ({...newQuote.quote}));
  }

  function getQuote2() {
    fetch(randomQuoteUrl).then((response) =>{
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    }).then((data) => {
      setQuote(quote => ({...data.quote}))
    }).catch((error) => {
      console.log("Error:", error);
    });
  }

  return (
    <>
      {
        isDisplay
          ? <div>
            <QuoteDisplay quote={quote} />
            <button onClick={getQuote2}>Nü quote</button>
          </div>
          : <button onClick={toggleDisplay}>Click here for an inspirational quote!</button>
      }
    </>);
}

export default QuoteApp;