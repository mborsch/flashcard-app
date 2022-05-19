import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import { NeedMoreCards } from "./Cards/NeedMoreCards";

export function Study({ decks }) {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  const [studyState, setStudyState] = useState({
    cards: [],
    currentCard: 0,
    cardMax: 0,
    front: true,
    flipped: false,
  });

  //updates deck state with deckId changes and sets the study state
  useEffect(() => {
    async function loadDecks() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
      setStudyState({
        currentCard: 0,
        front: true,
        flipped: false,
        cards: loadedDeck.cards,
        cardMax: loadedDeck.cards.length,
      });
    }
    loadDecks();
  }, [deckId]);

  //loading screen in case deck doesn't load
  if (!deck) {
    return <p>Loading...</p>;
  }

  //validates the deck has at least 3 cards
  if (studyState.cards.length < 3) {
    return <NeedMoreCards deck={deck} />;
  }

  function controlFlip() {
    setStudyState({
      ...studyState,
      front: !studyState.front, //change front to true or false based on current
      flipped: true, // always turns flipped to true, activates next button
    });
  }

  //if front is true, show front, otherwise show back
  function determineSide() {
    return studyState.front
      ? studyState.cards[studyState.currentCard].front
      : studyState.cards[studyState.currentCard].back;
  }

  //shows how many cards are left
  function numberOfCardsLeft() {
    return `${studyState.currentCard + 1} of ${studyState.cardMax}`;
  }

  //next button shows up after card has been flipped
  function ifNextButton() {
    return studyState.flipped ? (
      <button className="btn btn-primary" onClick={nextCard}>
        Next
      </button>
    ) : null;
  }

  //determines if on the last card of the study session
  function atMax() {
    return studyState.currentCard >= studyState.cardMax - 1;
  }

  //if on last card, window.confirm to start over, bringing studyState back to beginning,
  //if not last card, move onto the next card
  function nextCard() {
    if (atMax()) {
      if (window.confirm("Start Over?")) {
        setStudyState({
          ...studyState,
          currentCard: 0,
          flipped: false,
          front: true,
        });
      } else {
        history.push("/");
      }
    } else {
      setStudyState({
        ...studyState,
        currentCard: studyState.currentCard + 1,
        flipped: false,
        front: true,
      });
    }
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h4>Study: {deck.name}</h4>
      <div className="card w-100">
        <div className="card-body">
          <h6>Card {numberOfCardsLeft()}</h6>
          <p className="card-text">{determineSide()}</p>
          <button className="btn btn-secondary" onClick={controlFlip}>
            Flip
          </button>
          {ifNextButton()}
        </div>
      </div>
    </div>
  );
}
