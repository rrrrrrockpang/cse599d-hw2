import React from 'react';
import './App.css';
import { People, Book, Clock, Quote, TextLeft, Link45deg } from 'react-bootstrap-icons';

export function PaperCard(props) {
    const papers = props.data;

    return (
        <div>
        {papers.map((paper) => (
            <div class="paper-card">
                {paper.s2data ?
                <div key={paper.s2data.paperId}>
                    <h5>{paper.s2data.title}</h5>
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
                    <h5>{paper.csl.title}</h5>
                    <p><Link45deg /> {paper.csl.URL}</p>
                </div>
                }
                <hr style={{marginTop: '2rem'}}></hr>
            </div>
           
        ))}
        </div>
        
        
    );
}