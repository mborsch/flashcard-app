import React from "react";
import { useHistory } from "react-router-dom";

export function DeckForm({
  submitFunction,
  deck = {},
  changeName,
  changeDescription,
}) {
  const history = useHistory();

  function deckName() {
    return deck.name ? deck.name : "";
  }

  function deckDescription() {
    return deck.description ? deck.description : "";
  }

  return (
    <form>
      <div className="form-group">
        <label htmlFor="name">Deck Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={deckName()}
          onChange={changeName}
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="description">Deck description</label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          value={deckDescription()}
          onChange={changeDescription}
        ></textarea>
      </div>
      <button
        className="btn btn-secondary"
        type="button"
        onClick={() => history.go(-1)}
      >
        Cancel
      </button>
      <button
        className="btn btn-primary"
        type="submit"
        onClick={submitFunction}
      >
        Submit
      </button>
    </form>
  );
}
