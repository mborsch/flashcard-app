import React from "react";
import { Switch, Route } from "react-router-dom";
import { NewDeck } from "./NewDeck";
import { EditDeck } from "./EditDeck";
import { Study } from "./Study";
import { ViewDeck } from "./ViewDeck";
import { Cards } from "./Cards";

//routes for decks
export function Decks({ decks }) {
  return (
    <div>
      <Switch>
        <Route path="/decks/new">
          <NewDeck />
        </Route>
        <Route path="/decks/:deckId/study">
          <Study />
        </Route>
        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route path="/decks/:deckId/cards">
          <Cards />
        </Route>
        <Route path="/decks/:deckId">
          <ViewDeck />
        </Route>
      </Switch>
    </div>
  );
}
