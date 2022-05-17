import React from "react";
import { useHistory } from "react-router-dom";

export function CreateButton() {
  const history = useHistory();

  return (
    <button
      className="btn btn-secondary btn-large btn-block col-3 my-2"
      type="button"
      onClick={() => history.push("/decks/new")}
    >
      Create New Deck
    </button>
  );
}
