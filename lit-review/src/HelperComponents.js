import React from 'react';
import './App.css';
import { People, Book, Clock, Quote } from 'react-bootstrap-icons';

export function PaperCard(props) {
    const papers = props.data;

    return (
        <div>
        {papers.map((paper) => (
            <div class="paper-card">
                {paper.s2data ?
                <div key={paper.s2data.paperId}>
                    <h3>{paper.s2data.title}</h3>
                    <p> <People /> {paper.s2data.authors.map((author, index) => (<span>
                        {index === paper.s2data.authors.length - 1 ? <span>{author.name}</span> : <span>{author.name}, </span>}
                        </span>))}</p>
                    {paper.s2data.venue ? <span style={{marginRight: '1rem'}}><Book /> {paper.s2data.venue}</span> : null}
                    <span style={{marginRight: '1rem'}}><Clock /> {paper.s2data.year}</span>
                    <span><Quote /> {paper.s2data.citationCount} citations</span>
                </div> :
                <div key={paper.csl.id}>
                    <h3>{paper.csl.title}</h3>
                    <p>{paper.csl.URL}</p>
                </div>
                }
                <hr style={{marginTop: '2rem'}}></hr>
            </div>
           
        ))}
        </div>
        
        
    );
}