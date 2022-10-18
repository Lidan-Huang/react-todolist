import React, { useState } from "react";
import QuoteDisplay from "./QuoteDisplay";

const randomQuoteUrl = "https://inspo-quotes-api.herokuapp.com/quotes/random";

function QuoteApp() {
  const [isDisplay, setIsDisplay] = useState(false);
  const [quote, setQuote] = useState({"text": "", "author": ""});

  async function toggleDisplay() {
    let display = !isDisplay;
    setIsDisplay(display);
    await getQuote();
  }

  async function getQuote() {
    let response = await fetch(randomQuoteUrl);
    let newQuote = await response.json();
    console.log("newQuote*********", newQuote.quote);
    setQuote(quote => ({...newQuote.quote}));
  }

  return (
    <>
      {
        isDisplay
          ? <div>
            <QuoteDisplay quote={quote} />
            <button onClick={getQuote}>Nü quote</button>
          </div>
          : <button onClick={toggleDisplay}>Click here for an inspirational quote!</button>
      }
    </>);
}

export default QuoteApp;