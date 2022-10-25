import './App.css';
import { PaperCard } from './HelperComponents.js';
import classPapers from './data.json';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Lit Review Tool (rename later)</h1>
        <div className="papers-wrapper">
          <PaperCard data={classPapers}/>
        </div>
      </header>
    </div>
  );
}

export default App;
