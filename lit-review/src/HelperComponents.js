import React, { useState } from 'react';
import './App.css';
import { People, Book, Clock, Quote, TextLeft, Link45deg, XLg } from 'react-bootstrap-icons';
// import SlidingPanel from 'react-sliding-side-panel';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

export function PaperCard(props) {
    const papers = props.data;

    return (
        <div>
        {papers.map((paper) => (
            <div class="paper-card">
                {paper.s2data ?
                <div key={paper.s2data.paperId}>
                    <h5><a href={`https://doi.org/${paper.doi}`}>{paper.s2data.title}</a></h5>
                    <div className="info-wrapper"> <People /> {paper.s2data.authors.map((author, index) => (<span>
                        {index === paper.s2data.authors.length - 1 ? <span>{author.name}</span> : <span>{author.name}, </span>}
                        </span>))}
                    </div>
                    <div className="info-wrapper">
                        {paper.s2data.venue ? <span style={{marginRight: '1rem'}}><Book /> {paper.s2data.venue}</span> : null}
                        <span style={{marginRight: '1rem'}}><Clock /> {paper.s2data.year}</span>
                        <span><Quote /> {paper.s2data.citationCount} citations</span>
                    </div>
                    {paper.s2data.tldr ? <p><TextLeft /> TLDR: {paper.s2data.tldr.text}</p> : null}
                </div> :
                <div key={paper.csl.id}>
                    <h5><a href={`https://doi.org/${paper.doi}`}>{paper.csl.title}</a></h5>
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

export function SlidingCard(props) {
    const [state, setState] = useState({isPaneOpen: false});
    return (
        <div>
            <a onClick={() => {setState({ isPaneOpen: true })}} href="#!">
                {props.text}
            </a>
            <SlidingPane
                className="some-custom-class"
                overlayClassName="some-custom-overlay-class"
                isOpen={state.isPaneOpen}
                title="Hey, it is optional pane title.  I can be React component too."
                subtitle="Optional subtitle."
                onRequestClose={() => {
                // triggered on "<" on left top click or on outside click
                setState({ isPaneOpen: false });
                
                }}
                closeIcon={<div><XLg /></div>}
                width="50%"
            >
                <div>And I am pane content. BTW, what rocks?</div>
                <br />
            </SlidingPane>
        </div>
    );
}