import React from 'react';
import {connect} from 'react-redux';
import {NavLink,Link} from 'react-router-dom';

const Header = ({cartLength}) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light justify-content-between" id="header">
           
            <Link className="navbar-brand" to="/products" >
              <h1>Fulfill<span>ant</span></h1>
            </Link>
           <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation" >
            <span className="navbar-toggler-icon"></span>
           </button>
                
            <div className="collapse navbar-collapse" id="navbar">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                       <NavLink className="nav-link" to ={"/signup"}>
                        <i className="fa fa-sign-in mr-2"  />
                           Sign Up</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={"/cart"}>
                            <i className="fa fa-shopping-cart mr-2" />
                                Cart {cartLength ? `(${cartLength})`: ''}
                        </NavLink>
                     </li>
                 </ul>
            </div>
  
        </nav>
    );
};


const mapStateToProps = (state) => {
  return {
      cartLength: state.shop.cart.length
  }
};

export default connect(mapStateToProps, null)(Header);
