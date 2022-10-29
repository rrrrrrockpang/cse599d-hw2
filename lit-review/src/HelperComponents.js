import React, { useState } from 'react';
import './App.css';
import { People, Book, Clock, Quote, TextLeft, Link45deg, XLg, GraphUp, Building, Fire } from 'react-bootstrap-icons';
// import SlidingPanel from 'react-sliding-side-panel';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import classPapers from './data.json';
import authorDataS2 from './authors.json';
import relevant from './relevant.json';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


function SubtitleFormatter(author) {
  return (
    <div>
        <div>
            {author.affiliations.length > 0 ? <span style={{marginRight: "1rem"}}> <Building /> {author.affiliations.join(", ")}</span> : null}
            {author.homepage ? <span><Link45deg /> <a target="_blank" href={author.homepage}>{author.homepage}</a></span> : null}
        </div>
        <span style={{marginRight: "1rem"}}><Quote /> {author.citationCount} citations</span>
        <span style={{marginRight: "1rem"}}><GraphUp /> h-index: {author.hIndex}</span>
        <span><Book /> {author.paperCount} papers</span>
    </div>
  );
}

export function SlidingCard(author) {
    const [state, setState] = useState({isPaneOpen: false});
    // update the author info with S2 enhanced data
    let authorData = authorDataS2[author.authorId]
    return (
        
        <span>
            <a onClick={() => {setState({ isPaneOpen: true })}} href="#!">
                <Button variant="primary" size="sm">{author.name}</Button>
            </a>
            <SlidingPane
                className="some-custom-class"
                overlayClassName="some-custom-overlay-class"
                isOpen={state.isPaneOpen}
                title={<h2>{author.name}</h2>}
                subtitle={
                    <SubtitleFormatter {...authorData} />
                }
                onRequestClose={() => {
                // triggered on "<" on left top click or on outside click
                setState({ isPaneOpen: false });
                }}
                closeIcon={<div><XLg style={{width: "50px"}}/></div>}
                width="50%"
            >
            <h5>{author.name}'s Other Papers You May Find Relevant to</h5>
            <div style={{marginBottom: "1rem"}}><span>"{author.prevTitle}," from Semantic Scholar</span></div>
            <hr />
            <PaperCardLeaf id={author.prevPaperId} authorId={author.authorId} />
            </SlidingPane>
        </span>
    );
}

export function PaperCard(props) {
    const papers = props.data;

    return (
        <div>
        {papers.map((paper) => (
            <div className="paper-card">
                {paper.s2data ?
                <div key={paper.s2data.paperId}>
                    <h5><a className="title-link" href={`https://doi.org/${paper.doi}`} target="_blank">{paper.s2data.title}</a></h5>
                    <div className="info-wrapper"> 
                        <People /> &nbsp;
                        {
                            paper.s2data.authors.map((author, index) => (
                                <span>{index === paper.s2data.authors.length - 1 ? 
                                    <span><SlidingCard {...author} prevTitle={paper.s2data.title} prevPaperId={paper.s2id} /> </span>: 
                                    <span><SlidingCard {...author} prevTitle={paper.s2data.title} prevPaperId={paper.s2id} />, </span>}
                                </span>
                            ))
                        }
                    </div>
                    <div className="info-wrapper">
                        {paper.s2data.venue ? <span style={{marginRight: '1rem'}}><Book /> {paper.s2data.venue}</span> : null}
                        <span style={{marginRight: '1rem'}}><Clock /> {paper.s2data.year}</span>
                        <span><Quote /> {paper.s2data.citationCount} citations</span>
                    </div>
                    {paper.s2data.tldr ? <p><TextLeft /> TLDR: {paper.s2data.tldr.text}</p> : null}
                </div> :
                <div key={paper.csl.id}>
                    <h5><a className="title-link" href={`https://doi.org/${paper.doi}`} target="_blank">{paper.csl.title}</a></h5>
                    <div className="info-wrapper">
                        <Book /> {paper.csl.publisher}
                    </div>
                    <span><Link45deg /> {paper.csl.URL}</span>
                </div>
                }
                <hr style={{marginTop: '2rem'}}></hr>
            </div>
           
        ))}
        </div>
        
        
    );
}

export function PaperCardLeaf({id, authorId}) {
    const paperLimit = 10;
    let allRelvantPapers = relevant[id][authorId];
    let keys = Object.keys(allRelvantPapers);

    let topArray = [];

    for (let i = 0; i < keys.length; i++) {
        if (i > paperLimit - 1) { break; } 
        topArray.push(allRelvantPapers[i]);
    }

    const papers = topArray.map((paper, index) => {return topArray[index]});

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          That paper seems to be quite relevant to the paper you are currently reading.
        </Tooltip>
      );

    return (
        <div>
        {papers.map((paper) => (
            <div className="paper-card">

                <div key={paper.paperId}>
                    <h5><a className="title-link" href={paper.url} target="_blank">{paper.title}</a></h5>
                    <div className="info-wrapper"> <People /> {paper.authors.map((author, index) => (<span>
                        {index === paper.authors.length - 1 ? <span>{author.name}</span> : <span>{author.name}, </span>}
                        </span>))}
                    </div>
                    <div className="info-wrapper">
                        {paper.venue ? <span style={{marginRight: '1rem'}}><Book /> {paper.venue}</span> : null}
                        <span style={{marginRight: '1rem'}}><Clock /> {paper.year}</span>
                        {paper.score > 0.09 ? 
                        <span class="similarity-score">
                            <OverlayTrigger placement="right"
                                delay={{ show: 100, hide: 200 }}
                                overlay={renderTooltip}>
                                    <Fire />
                            </OverlayTrigger>
                        </span> : null}
                        {/* <span><Quote /> {paper.s2data.citationCount} citations</span> */}
                    </div>
                    {paper.tldr ? <p><TextLeft /> TLDR: {paper.tldr.text}</p> : null}
                </div>
                
                <hr style={{marginTop: '2rem'}}></hr>
            </div>
           
        ))}
        </div>
        
        
    );
}

