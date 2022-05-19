import React from "react";
import { useHistory } from "react-router-dom";

export function DeckForm({
  submitFunction,
  deck = {},
  changeName,
  changeDescription,
}) {
  const history = useHistory();

  //for name value
  function deckName() {
    return deck.name ? deck.name : "";
  }

  //for description value
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
          required={true}
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
          required={true}
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
