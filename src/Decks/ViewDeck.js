import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../utils/api";

export function ViewDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({
    id: 0,
    name: "",
    cards: [],
  });

  useEffect(() => {
    async function loadDecks() {
      const loaded = await readDeck(deckId);
      setDeck(loaded);
    }
    loadDecks();
  }, [deckId]);

  if (!deck) {
    return <p>Loading...</p>;
  }

  function deleteCardHandler(cardId) {
    if (window.confirm("Delete Card? This action can not be undone")) {
      deleteCard(cardId).then((output) => history.go(0));
    }
  }

  function deleteDeckHandler(deckId) {
    if (window.confirm("Delete Deck? This action can not be undone")) {
      deleteDeck(deckId);
      history.push("/");
    }
  }

  const cardList = deck.cards.map((card) => (
    <div className="card w-100" key={card.id}>
      <div className="card-body">
        <h5 className="card-title">{card.name}</h5>
        <h6 className="text-muted">Front</h6>
        <p className="card-text w-40">{card.front}</p>
        <hr />
        <h6 className="text-muted">Back</h6>
        <p className="card-text w-40">{card.back}</p>
        <div className="d-flex flex-row-reverse">
          <button
            className="btn btn-danger mx-1"
            onClick={() => deleteCardHandler(card.id)}
          >
            Delete
          </button>
          <Link
            className="btn btn-secondary mx-1"
            to={`/decks/${deck.id}/cards/${card.id}/edit`}
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <h4>{deck.name}</h4>
      <p>{deck.description}</p>
      <div className="row mb-4">
        <div className="d-flex flex-row col-8">
          <Link
            className="btn btn-secondary mx-1"
            to={`/decks/${deck.id}/edit`}
          >
            Edit
          </Link>
          <Link className="btn btn-primary mx-1" to={`/decks/${deck.id}/study`}>
            Study
          </Link>
          <Link
            className="btn btn-primary mx-1"
            to={`/decks/${deck.id}/cards/new`}
          >
            Add Cards
          </Link>
        </div>
        <div className="d-flex flex-row-reverse col-4">
          <button
            className="btn btn-danger"
            onClick={() => deleteDeckHandler(deck.id)}
          >
            Delete Deck
          </button>
        </div>
      </div>
      <div className="card-list">{cardList}</div>
    </div>
  );
}
