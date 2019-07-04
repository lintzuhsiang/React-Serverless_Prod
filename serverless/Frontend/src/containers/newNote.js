import React,{Component} from 'react';
import {FormGroup,FormControl} from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton.js';
import config from '../config';
import {API} from 'aws-amplify';
import s3Upload from '../lib/awsLib';

class newNote extends Component{
    constructor(props){
        super(props)
    this.file = null;
    this.state = {
        isLoading: false,
        content:''
        }
    }
    validationForm(){
        return this.state.content.length > 0;
    }
    handleChange=(e) =>{
        // console.log(e.target)
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    handleFileChange=(e)=>{
        // console.log(e.target)
        this.file = e.target.files[0]
    }
    handleSubmit=async e=>{
        e.preventDefault();
        if(this.file && this.file.size>config.MAX_FILE){
            alert('Please pick a smaller file than ${config.MAX_FILE/1000000} MB');
            return
        }
        this.setState({
            isLoading:true
        })

        try{
            const attachment = this.file
            ? await s3Upload(this.file)
            : null

            await this.createNote({
                attachment,
                content:this.state.content
            })
            this.props.history.push('/');
        }catch(e){
            console.log(e);
            // alert(e)
            this.setState({isLoading:false})
        };

       
    }

    createNote(note){
        return API.post("notes","/notes",{
            body:note
        });
    }
    render(){
        return(
            <div className="newNote">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="content">
                        <FormControl autoFocus onChange={this.handleChange} value={this.state.content} componentClass="textarea" />
                    </FormGroup>
                    <FormGroup controlId="file">
                        <FormControl onChange={this.handleFileChange} type="file" />
                    </FormGroup>
                    <LoaderButton
                    isLoading={this.state.isLoading}
                    text="Create"
                    block
                    disabled={!this.validationForm()}
                    loadingText="Creating Note" 
                    type="submit"
                    />
                </form>
            </div>
        )
    }
}

export default newNote;
