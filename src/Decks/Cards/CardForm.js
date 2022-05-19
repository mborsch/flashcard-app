import React from "react";
import { useHistory } from "react-router-dom";

export function CardForm({
  submitHandler,
  card = {},
  changeFront,
  changeBack,
}) {
  const history = useHistory();

  //for front value
  function cardFront() {
    return card.front ? card.front : "";
  }

  //for back value
  function cardBack() {
    return card.back ? card.back : "";
  }

  //card's form
  return (
    <form>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          className="form-control"
          id="front"
          rows="3"
          value={cardFront()}
          onChange={changeFront}
          required={true}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          className="form-control"
          id="back"
          rows="3"
          value={cardBack()}
          onChange={changeBack}
          required={true}
        ></textarea>
      </div>
      <button
        className="btn btn-secondary"
        type="button"
        onClick={() => history.go(-1)}
      >
        Done
      </button>
      <button className="btn btn-primary" type="submit" onClick={submitHandler}>
        Save
      </button>
    </form>
  );
}
