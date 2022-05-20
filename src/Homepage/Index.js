import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Decks } from "../Decks/Decks";
import { CreateButton } from "./CreateButton";
import { DeckList } from "./DeckList";

//homepage routing
export function Homepage({ decks }) {
  return (
    <div>
      <CreateButton />
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <DeckList decks={decks} />
          </Route>
          <Route path="/decks">
            <Decks decks={decks} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
