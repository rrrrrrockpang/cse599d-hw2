import './App.css';
import { PaperCard } from './HelperComponents.js';
import classPapers from './data.json';
import papersEnhanced from './papers.json';
import Accordion from 'react-bootstrap/Accordion';
// import { VegaLite } from 'react-vega';
import BarChart from "./components/barChart.js";

function App() {
  let topics = {"Introduction & History": [], "Explorable Explanations": [], "Computational Notebooks": [], "Authoring Tools": [], "Augmented Reading": [], "Literature Review": [], "Collaboration & Annotation": [], "Citation": [], "Scientometrics": [], "Automating Discovery": [], "Information Extraction": [], "Accessibility": [], "Figures & Tables": [], "Layouts & Formats": [], "Open Access & Open Science": [], "Libraries & Course Review": []};
  let topicNames = Object.keys(topics);
  
  for (let i = 0; i < topicNames.length; i++) {
    for (let j = 0; j < Object.values(papersEnhanced).length; j++) {

      let topic = topicNames[i];
      let paper = Object.values(papersEnhanced)[j];
      if (paper.topic === topic) {
        topics[topic].push(classPapers[j]);
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>AuthorLens 🔎</h1>

        <div class="row">
          <div className="papers-wrapper col-lg-6">
            <Accordion flush>
              {topicNames.map((topicName, index) => (
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>{topicName}</Accordion.Header>
                  <Accordion.Body>
                    <PaperCard data={topics[topicName]}/>
                  </Accordion.Body>
                </Accordion.Item>
              ))}

            </Accordion>
            
          </div>
          <div className="col">
            <div class="about">
              <div id="about-text">
                <h5>About AuthorLens</h5>
                <br></br>
                <p>AuthorLens allows you to explore other relevant works by the authors of your interest.</p>
                <p>Click on one of the paper's authors to see more information about them and their parent that might be relevant to the one that you viewed. </p>
                {/* <p>Relevance is determined by a <a href="https://en.wikipedia.org/wiki/Tf%E2%80%93idf">TF-IDF</a> score between the abstract of the origin paper (the paper on which you clicked on the author) and the destination paper (some other paper by the author). The results are sorted by relevance.  </p> */}
              </div>

              <div className="container" id="about-barchart">
                <BarChart />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
