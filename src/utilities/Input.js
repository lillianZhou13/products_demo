import React from "react";

const Input = ({label,name,type="text",handleChange,value,error}) => {
    return ( 
    <React.Fragment>
    <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input 
     type={type} className="form-control" 
     name={name} 
     id={name}
      value={value}
      onChange = {handleChange}
    />
    <small className="form-text text-muted">{error}</small>
  </div> 
  </React.Fragment>
  );
}
 
export default Input;