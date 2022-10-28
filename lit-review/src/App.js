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
        <h1>Lit Review Tool (rename later)</h1>
        
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
      </header>
    </div>
  );
}

export default App;
