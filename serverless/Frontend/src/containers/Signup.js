import React,{Component} from 'react';
import {HelpBlock,FormGroup,FormControl,ControlLabel,Button} from 'react-bootstrap';
// import LoaderButton from '../components/LoaderButton';
import "./Signup.css";
import {Auth} from 'aws-amplify';

class Signup extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            email:"",
            password:"",
            confirmPassword:"",
            confirmationCode:"",
            newUser:null
        };
    }
    validationForm(){
        return this.state.email.length >0 && this.state.password.length>0 &&this.state.password===this.state.confirmPassword
    };
    validationConfirmationForm(){
        return this.state.confirmationCode.length > 0
    }
    handleSubmit= async(e) =>{
        e.preventDefault();
        this.setState({isLoading:true});
        try{
            const newUser = await Auth.signUp({
                username:this.state.email,
                password:this.state.password
            })
            this.setState({
                newUser
            })
        }catch(e){
            console.log(e);
            if(e.code === "UsernameExistsException"){    
                const newUser = await Auth.resendSignUp(this.state.email);
                this.setState({
                    newUser
                })
                console.log(this.state)
                

            }else{
                alert(e.message);
            }

        }
        this.setState({isLoading:false});
    }
    handleConfirmationSubmit= async(e)=>{
        e.preventDefault();
        this.setState({isLoading:true});
        try{
            await Auth.confirmSignUp(this.state.email,this.state.confirmationCode)
            await Auth.signIn(this.state.email,this.state.password)
            this.props.userHasAuthenticated(true);
            this.props.history.push("/")
        }catch(e){
            alert(e.message)
            // this.setState({isLoading:false})
        }
        this.setState({isLoading:false})

    }

    handleChange= (e)=>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    renderForm(){
        return(
            <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl autoFocus type='email' value={this.state.email} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl type='password' value={this.state.password} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <ControlLabel>confirm Password</ControlLabel>
                    <FormControl type='password' value={this.state.confirmPassword} onChange={this.handleChange} />
                </FormGroup>
                <Button block bsSize='large' disabled={!this.validationForm} type='submit'>Sign Up</Button>
            </form>
        )
    }
    renderConfirmationForm(){
        return(
            <form onSubmit={this.handleConfirmationSubmit}>
                <FormGroup controlId="confirmationCode" bsSize="large">
                    <ControlLabel>confirmation Code</ControlLabel>
                    <FormControl autoFocus type='tel' value={this.state.confirmationCode} onChange={this.handleChange} />
                    <HelpBlock>Please Check Your Email</HelpBlock>
                </FormGroup>
                
                <Button block bsSize='large' disabled={!this.validationConfirmationForm} type='submit'>Submit Confirmation Code</Button>
            </form>
        )
    }
    render(){
        return(
            <div className="signup">
                {this.state.newUser ===null
                ? this.renderForm()
                : this.renderConfirmationForm()}
            </div>
        )
    }
}

export default Signup;