import './App.css';
import { PaperCard, SlidingCard } from './HelperComponents.js';
import classPapers from './data.json';
import papersEnhanced from './papers.json';
import Accordion from 'react-bootstrap/Accordion';


function App() {
  let topics = {"Introduction & History": [], "Explorable Explanations": [], "Computational Notebooks": [], "Authoring Tools": [], "Augmented Reading": [], "Literature Review": [], "Collaboration & Annotation": [], "Citation": [], "Scientometrics": [], "Automating Discovery": [], "Information Extraction": [], "Accessibility": [], "Figures & Tables": [], "Layouts & Formats": [], "Open Access & Open Science": [], "Libraries & Course Review": []};
  let topicNames = Object.keys(topics);
  
  for (let i = 0; i < topicNames.length; i++) {
    for (let j = 0; j < Object.values(papersEnhanced).length; j++) {

      console.log(classPapers.length - Object.values(papersEnhanced).length);
      let topic = topicNames[i];
      let paper = Object.values(papersEnhanced)[j];
      if (paper.topic === topic) {
        topics[topic].push(classPapers[j]);
      }
    }
  }

  console.log(topics["Explorable Explanations"]);

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
          <div className="about col">
            <h5>About AuthorLens</h5>
            <br></br>
            <p>AuthorLens allows you to explore other relevant works by your authors of interest.</p>
            <p>Start by expanding one of the class topics on the left to browse papers. Once you see a paper you're interested in, you can click on one of the paper's authors to see more information about them and other potentially relevant papers they wrote. </p>
            <p>Relevance is determined by a <a href="https://en.wikipedia.org/wiki/Tf%E2%80%93idf">TF-IDF</a> score between the abstract of the origin paper (the paper on which you clicked on the author) and the destination paper (some other paper by the author). The results are sorted by relevance.  </p>
          </div>
        </div>
        
        
      </header>
    </div>
  );
}

export default App;
