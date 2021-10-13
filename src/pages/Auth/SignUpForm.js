import React,{ Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Joi, { errors } from "joi-browser";
import { sendSignUpToServer } from "../../actions/auth.action";
import  Input from  '../../utilities/Input';
import Form from "../../utilities/Form";
class  SignUpForm extends Form {
 state = {
  data:{user_name:"",password:"",email:""},
  errors:{}
 }
  

  componentDidMount(){
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
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().label("Email")
  };
  
   
  

 
doSumbit = ()=>{
  if(this.state.data.user_name && this.state.data.email&& this.state.data.password){
    this.props.dispatch(sendSignUpToServer(this.state.data));
  }
}
render(){
  const {data,errors} =this.state;
        return (
         <section className="container" style={{paddingTop: '6rem'}} >
         <div className="row justify-content-center">
         {this.props.isAuth && <h3>Sign up success, will direct to home page in 4 seconds</h3>}
             <span className="col-sm-7  text-center mt-3">Become a member.</span>
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
          label="Email" 
          name="email"
         
          value={data.email}
          type="email" handleChange= {this.handleChange}
          error={errors["email"]}/>
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
          className="btn btn-primary col-12">Sign Up</button>
       
        
      </form>
      
      <Link to="/login" className="text-center my-3 col-12">Already have an account? Log In here.</Link>
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
export default connect(mapStateToProps)(SignUpForm);
