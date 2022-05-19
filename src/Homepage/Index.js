import React from "react";
import { Route, Switch } from "react-router-dom";
import { Decks } from "../Decks/Decks";
import { CreateButton } from "./CreateButton";
import { DeckList } from "./DeckList";

//homepage routing
export function Homepage({ decks }) {
  return (
    <div>
      <CreateButton />
      <Switch>
        <Route exact path="/">
          <DeckList decks={decks} />
        </Route>
        <Route path="/decks">
          <Decks decks={decks} />
        </Route>
      </Switch>
    </div>
  );
}
