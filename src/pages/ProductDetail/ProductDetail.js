import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import ProductDetailComponent from '../../components/ProductDetail/ProductDetailComponent';
import ProductSlider from "../../components/ProductSlider/ProductSlider";

const ProductDetail = (props) => {

    console.log("props.product in ProductDetail",props);
    const [productInt,setProductInt] = useState([]);

  if(!props.product && productInt.length==0){
      const productInLocal = JSON.parse(localStorage.getItem("product"));
      //console.log("productLocal in localstorage",productInLocal);
    if(productInLocal){
        //console.log("22222",productInLocal)
        setProductInt(productInLocal);}
  }
  //console.log("productInt in local State",productInt);

  useEffect(() => { 
      if(props.product){localStorage.setItem("product",JSON.stringify(props.product));}
     
   });

    return (
        <div className="container" style={{padding: '6rem 0'}}>
            <div className="card">
                <div className="row">
                    {props.product ? 
                    (<React.Fragment>
                       <ProductSlider images={props.product.images}/>
                       <ProductDetailComponent product={props.product}/>
                    </React.Fragment>)
                    :(<React.Fragment>
                        <ProductSlider images={productInt.images}/>
                        <ProductDetailComponent product={productInt}/>
                     </React.Fragment>)}
                    

                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, props) =>  {
    //console.log("state in productDetail under pages",state);
   // console.log("state.products in productDetail under pages",state.products);
    const product = state.products.find(product => product.id === +props.match.params.id);
    console.log("product in productDetail under pages",product);
    return {
        product
    }
};



export default connect(mapStateToProps, null)(ProductDetail);
