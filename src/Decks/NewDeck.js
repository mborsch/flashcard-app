import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import { DeckForm } from "./DeckForm";

export function NewDeck() {
  const history = useHistory();
  const [deck, setDeck] = useState({
    id: 0,
    name: "",
    description: "",
  });

  function submitHandler(event) {
    event.preventDefault();
    createDeck(deck).then((output) => history.push(`/decks/${output.id}`));
  }

  function changeName(event) {
    setDeck({ ...deck, name: event.target.value });
  }

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
            Create Deck
          </li>
        </ol>
      </nav>
      <h3>Create Deck</h3>
      <DeckForm
        submitFunction={submitHandler}
        deck={deck}
        changeName={changeName}
        changeDescription={changeDescription}
      />
    </div>
  );
}
