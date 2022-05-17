import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import { Homepage } from "../Homepage/Index";
import { listDecks } from "../utils/api";
import { Decks } from "../Decks/Decks";

function Layout() {
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    async function loadDecks() {
      const loaded = await listDecks();
      setDecks(loaded);
    }
    loadDecks();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Homepage decks={decks} />
          </Route>
          <Route path="/decks">
            <Decks decks={decks} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
