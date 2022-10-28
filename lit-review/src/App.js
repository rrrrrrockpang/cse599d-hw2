import './App.css';
import { PaperCard, SlidingCard } from './HelperComponents.js';
import classPapers from './data.json';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SlidingCard text="hello"/>
        <h1>Lit Review Tool (rename later)</h1>
        
        <div className="papers-wrapper col-lg-6">
          <PaperCard data={classPapers}/>
        </div>
      </header>
    </div>
  );
}

export default App;
