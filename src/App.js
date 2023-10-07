import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import FindEpisode from "../src/components/FindEpisode";
import EpisodeList from "../src/components/EpisodeList";
import "./styles.css";
import CharacterDisplay from "./components/CharacterDisplay";

/*Author
@Neel Shah
email - neelshah19989@gmail.com
github - https://github.com/Neel630
*/

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={EpisodeList} />
          <Route exact path="/findbyname" component={FindEpisode} />
          <Route exact path="/findCharacter" component={CharacterDisplay} />
        </Switch>
      </Router>
    </div>
  );
}
