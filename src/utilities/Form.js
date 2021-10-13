import React,{component} from 'react';
 import Joi, { errors } from "joi-browser";
class Form extends React.Component {
    state = {
        data:{},
        errors:{}
       };
    validate = ()=>{
        const options = {abortEarly:false};
        const {error} = Joi.validate(this.state.data,this.schema,options);
        if(!error) return null;
        const errors={};
        console.log("error.detail,error.detail");
        error.details.map(item=>errors[item.path[0]] = item.message);
        return errors;
    
        };
     validateProperty=({name, value})=>{
          const obj ={[name]:value};
          const schemaPro = {[name]:this.schema[name]};
          const {error}= Joi.validate(obj,schemaPro);
          return error ? error.details[0].message:null;
      };

      handleSubmit = (e)  =>{
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors :errors|| {}});
        if(errors) return;
       console.log("user in handleSubmit",this.state.data);
       this.doSumbit();
     };

    handleChange = (e) => {
        const errors = {...this.state.errors};
        const {name , value} = e.target;
        const errorMsg = this.validateProperty({name,value});
        if(errorMsg) {errors[name] = errorMsg;}
        else delete errors[name];
        const data={...this.state.data};
        data[name] =value;
        this.setState({data,errors});
    }
    
}
 
export default Form;