import React,{Component,Fragment} from 'react';
import './App.css';
import {withRouter,Link} from 'react-router-dom';
import {Navbar,Nav,NavItem} from "react-bootstrap";
import {Switch} from 'react-router-dom';
import Home from "./containers/Home.js";
import {LinkContainer} from 'react-router-bootstrap';
import Login from './containers/Login.js';
import Signup from './containers/Signup';
import AppliedRoute from './components/AppliedRoute';
import {Auth} from 'aws-amplify';
import newNote from './containers/newNote';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isAuthenticated:false,
      isAuthenticating:true
    }
  }
  async componentDidMount(){
    try{
      await Auth.currentSession();   //get current user session, return a promise
      this.userHasAuthenticated(true)
    }catch(e){
      if (e!=="No current user"){
        alert(e)
      }
    }
    this.setState({isAuthenticating:false})  //if it loads, then update isAuthenticating flag, then do the render
  }
  userHasAuthenticated = authenticated =>{
    this.setState({isAuthenticated:authenticated})
  }
  handleLogOut = async (e) =>{
    await Auth.signOut();               // call AWS signout function
    this.userHasAuthenticated(false);
    this.props.history.push('/login');  //redirect to login page
  }
  render(){
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    }
    return (
      !this.isAuthenticating &&
      <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to ='/'>Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
              ? <NavItem onClick={this.handleLogOut}>LogOut</NavItem>   //create a handleLogOut function to logout
              :<Fragment>
                {/* <Link to='/signup'>Sign Up</Link> */}
                <NavItem href="/signup">Sign Up</NavItem>
                  {/* <LinkContainer to='/signup'>
                    <NavItem >Sign Up</NavItem>
                  </LinkContainer> */}
                  <LinkContainer to='login'>              
                    <NavItem >Login</NavItem>
                  </LinkContainer>
              </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
      </Navbar>
        <Switch childProps={childProps}>
           <AppliedRoute path='/' exact component={Home} props={childProps}/>
           <AppliedRoute path='/login' exact component={Login} props={childProps}/>
           <AppliedRoute path='/signup' exact component={Signup} props={childProps}/>
           <AppliedRoute path='/notes/new' exact component={newNote} props={childProps}/>


           {/* <Route path='/login' component={Login}></Route>
           <Route path='/signup' component={Signup}></Route> */}
        </Switch>
      </div>
  )
    }
}

export default withRouter(App);
// export default App;
