import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import { CardForm } from "./CardForm";

export function NewCard() {
  const { deckId } = useParams();

  const initializeForm = {
    front: "",
    back: "",
    deckId,
  };
  const [card, setCard] = useState({ ...initializeForm });
  const [deck, setDeck] = useState({});

  //updates the deck when deckId changes
  useEffect(() => {
    async function loadDeck() {
      const loaded = await readDeck(deckId);
      setDeck(loaded);
    }
    loadDeck();
  }, [deckId]);

  //changes the front of the card
  function changeFront(event) {
    setCard({ ...card, front: event.target.value });
  }

  //changes the back of the card
  function changeBack(event) {
    setCard({ ...card, back: event.target.value });
  }

  //submit handler with validation and an async function to update the card data
  function submitHandler(event) {
    event.preventDefault();
    if (card.front === "" || card.back === "") {
      window.alert("please add a front and back to card");
    }
    async function updateData() {
      await createCard(deckId, card);
      setCard({ ...initializeForm });
    }
    updateData();
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
            Add Card
          </li>
        </ol>
      </nav>
      <h4>{deck.name}: Add Card</h4>
      <CardForm
        submitHandler={submitHandler}
        card={card}
        changeFront={changeFront}
        changeBack={changeBack}
      />
    </div>
  );
}
