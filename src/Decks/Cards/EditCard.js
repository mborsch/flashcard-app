import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../utils/api";
import { CardForm } from "./CardForm";

export function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [card, setCard] = useState({
    id: cardId,
    front: "",
    back: "",
    deckId: Number(deckId),
  });
  const [deckName, setDeckName] = useState("");

  useEffect(() => {
    async function loadCard() {
      const loaded = await readCard(cardId);

      setCard({
        id: cardId,
        deckId: Number(deckId),
        front: loaded.front,
        back: loaded.back,
      });
    }
    async function loadDeckName() {
      const deck = await readDeck(deckId);
      setDeckName(deck.name);
    }
    loadCard();
    loadDeckName();
  }, [cardId, deckId]);

  function changeFront(event) {
    setCard({ ...card, front: event.target.value });
  }
  function changeBack(event) {
    setCard({ ...card, back: event.target.value });
  }
  function submitHandler(event) {
    event.preventDefault();
    updateCard(card).then((output) => history.push(`/decks/${output.deckId}`));
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card
          </li>
        </ol>
      </nav>
      <h4>Edit Deck</h4>
      <CardForm
        submitHandler={submitHandler}
        card={card}
        changeBack={changeBack}
        changeFront={changeFront}
      />
    </div>
  );
}
