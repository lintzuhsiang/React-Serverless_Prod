import React, {Component} from 'react';
import {PageHeader,ListGroup,ListGroupItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import "./Home.css";

import { API } from 'aws-amplify';
export default class Home extends Component{
    constructor(props){
    
        super(props);
        this.state = {
            isLoading:false,
            notes:[]
        }
    }

    async componentDidMount(){
        if(!this.props.isAuthenticated){
            return;
        }
        try{
            const notes = await this.getnotes();
            this.setState({notes})
        }catch(e){
            alert(e)
        }
    }
    getnotes(){
        return API.get("notes","/notes")
    }

    renderLander(){
        return(
            <div className="Home">
                <div className="lander">
                    <h1>Scartch</h1>
                    <p>A simple note taking app</p>
                </div>
            </div>
        )
    }
    
    renderNotesList(notes){
        return [{}].concat(notes).map(
            (note,i)=>
            i !==0
            ?<LinkContainer 
                key={note.noteId}
                to={'/notes/${note.noteId}'}
                >
                    <ListGroupItem header={note.content.trim()}>
                        {"Created: "+new Date(note.createdAt).toLocaleString()}
                    </ListGroupItem>
                </LinkContainer>
            :<LinkContainer
                key="new"
                to={"/notes/new"}
                >
                    <ListGroupItem>
                        <h4>
                            <b>{"\uFF0B"}</b>Create a new note
                        </h4>
                    </ListGroupItem>
                </LinkContainer>
        )
    }

    renderNote(){
        return(
            <div className="notes">
                <PageHeader>Your Notes</PageHeader>
                <ListGroup>
                    {!this.state.isLoading&&this.renderNotesList(this.state.notes)}
                </ListGroup>
            </div>
        )
    }
    render(){
       return(
           <div className="Home">
               {this.props.isAuthenticated? this.renderNote(): this.renderLander()}
           </div>
       )
    };
}