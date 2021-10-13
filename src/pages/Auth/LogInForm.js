import React,{ Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Joi, { errors } from "joi-browser";
import { sendLogInToServer } from "../../actions/auth.action";
import  Input from  '../../utilities/Input';
import Form from "../../utilities/Form";

class  LogInForm extends Form {
 state = {
  data:{user_name:"",password:""},
  errors:{}
 }
  

  componentDidMount(){
      console.log("props in Login Form", this.props);
      console.log("auth in Login",this.props.isAuth,this.props.isAuth===1)
     if(this.props.isAuth ===1){

      setTimeout(() => {
    
        console.log(this.props.history);
         this.props.history.push('/products');
         }, 4000);
     }
  };
  schema = {
    //regex(/^[a-zA-Z0-9]{3,30}$/)
    user_name: Joi.string().required().alphanum().min(3).max(30).label("User Name"),
    password: Joi.string().required().label("Password"),
    
  };
  
   
  

 
doSumbit = ()=>{
  if(this.state.data.user_name && this.state.data.password){
    this.props.dispatch(sendLogInToServer(this.state.data));
  }
}
render(){
  const {data,errors} =this.state;
        return (
         <section className="container" style={{paddingTop: '6rem'}} >
        {this.props.isAuth && <h3>Log In success, will direct to home page in 4 seconds</h3>}
         <div className="row justify-content-center">
             <span className="col-sm-7  text-center mt-3">Welcome Back.</span>
             {this.props.error && <h4 className="text-danger">{this.props.error}</h4>}
       <form className="col-sm-7" onSubmit={this.handleSubmit}>
        <Input  
          label="User Name" 
          name="user_name" 
          value={data.user_name}
          handleChange= {this.handleChange}
         type="text" 
         error={errors["user_name"]} />
       
        <Input 
         label="Password" 
         name="password"
         id="password"
         value={data.password} 
         type="password" 
         handleChange= {this.handleChange}
         error={errors["password"]} />
        <button 
          disabled = {this.validate()}
          type="submit" 
          className="btn btn-primary col-12">Log IN</button>
       
        
      </form>
      
      <Link to="/signup" className="text-center my-3 col-12">Don't have an account? Sign Up here.</Link>
      </div>
      </section>);
    
 }
}
const mapStateToProps = (state) =>{
    return {
        isAuth: state.auth.isAuth,
        error:state.auth.error
    }
}
export default connect(mapStateToProps)(LogInForm);
