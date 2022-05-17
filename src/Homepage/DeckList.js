import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

export function DeckList({ decks }) {
  const history = useHistory();

  function deleteHandler(deckId) {
    if (
      window.confirm(
        "Really delete? You won't be able to recover after confirming."
      )
    ) {
      deleteDeck(deckId).then(history.go(0));
    }
  }

  const mapDecks = decks.map((deck, index) => (
    <div className="card w-100" key={index}>
      <div className="card-body">
        <h5 className="card-title">{deck.name}</h5>
        <h6>{deck.cards.length} cards</h6>
        <p className="card-text">{deck.description}</p>

        <div className="d-flex justify-content-start">
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary m-2">
            View
          </Link>
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary m-2">
            Study
          </Link>
        </div>
        <div className="d-flex justify-content-end m-2">
          <button
            onClick={() => deleteHandler(deck.id)}
            className="btn btn-danger"
          >
            Delete Deck
          </button>
        </div>
      </div>
    </div>
  ));

  return <div className="d-flex flex-column">{mapDecks}</div>;
}
