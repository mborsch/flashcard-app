import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import { DeckForm } from "./DeckForm";

export function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({
    id: 0,
    name: "",
    description: "",
  });

  //updates deck state when deckId changes
  useEffect(() => {
    async function loadDecks() {
      const loaded = await readDeck(deckId);
      setDeck(loaded);
    }
    loadDecks();
  }, [deckId]);

  //submit handler to update the deck
  function submitHandler(event) {
    event.preventDefault();
    updateDeck(deck).then((output) => history.push(`/decks/${output.id}`));
  }

  //changes name
  function changeName(event) {
    setDeck({ ...deck, name: event.target.value });
  }

  //changes description
  function changeDescription(event) {
    setDeck({ ...deck, description: event.target.value });
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h3>Edit Deck</h3>
      <DeckForm
        submitFunction={submitHandler}
        deck={deck}
        changeName={changeName}
        changeDescription={changeDescription}
      />
    </div>
  );
}
