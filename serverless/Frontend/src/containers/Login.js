import React ,{Component} from 'react';
import {FormGroup,FormControl, ControlLabel} from 'react-bootstrap';
import './Login.css';
import {Auth} from 'aws-amplify';
import LoaderButton from '../components/LoaderButton';

class Login extends Component{
    constructor(props){
        super(props);
        //initial state
    this.state = {
        email:'',
        password:'',
        isLoading:false,
    }
}
    validateForm(){
        return this.state.email.length > 0;
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = async (e)=>{
        e.preventDefault();
        this.setState({isLoading:true})
        try{
            await Auth.signIn(this.state.email,this.state.password);
            this.props.userHasAuthenticated(true);
            this.props.history.push("/");
            // alert("Login In");

        }catch(e){
            alert(e.message);
            this.setState({isLoading:true})
        }
        // isLoading:true,
    }
    render(){
        return(
            <div className='Login'>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl autoFocus type='email' value={this.state.email} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup controlId='password' bsSize='large'>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl type='password' value={this.state.password} onChange={this.handleChange} />
                    </FormGroup>
                    {/* <Button block bsSize='large' disabled={!this.validateForm()} type='submit'>Login</Button> */}
                    <LoaderButton block bsSize="large" disabled={!this.validateForm()} type='submit' isLoading={this.state.isLoading} text="Login" loadingText="Logging in..." />


                </form>

            </div>
        )
    }
}

export default Login;