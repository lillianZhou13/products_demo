import React, {Component} from 'react';
import {connect} from 'react-redux';
import Product from "../../components/Product/Product";

import {brandFilter} from "../../pipes/brandFilter";
import {priceFilter} from "../../pipes/priceFilter";
import {orderByFilter} from "../../pipes/orderByFilter";
import LayoutMode from "../../components/LayoutMode/LayoutMode";
import {paginationPipe} from "../../pipes/paginationFilter";
import Pagination from "../../components/Pagination/Pagination";
import {fetchProducts} from '../../actions/products.actions';

class ProductList extends Component {
    state = {
        colValue : 'col-lg-4',
        perPage: 12,
        currentPage: 1,
        pagesToShow: 3,
        gridValue: 3,
        
    };

    componentDidMount(){
        if(this.props.products.length ==0){
            this.props.dispatch(fetchProducts());
            console.log("this.props.products",this.props);
        }
        
        console.log("this.props",this.props);
        console.log("this.state",this.state);
        //this.props.fetchProducts();
    }
  
    

    changeLayout = (n) => {
        this.setState({gridValue: n});

        let realGridValue;

        if(n === 4) {
            realGridValue = 3
        } else {
            realGridValue = 4;
        }

      this.setState({
          colValue: `col-lg-${realGridValue}`
      });
    };


    onPrev = () => {
        const updatedState = {...this.state};
        updatedState.currentPage = this.state.currentPage - 1;
        this.setState(updatedState);
    };


    onNext = () => {
        this.setState({
            ...this.state,
            currentPage: this.state.currentPage + 1
        });
    };

    goPage = (n) => {
        this.setState({
            ...this.state,
            currentPage: n
        });
    };


    render() {

        let isActive = this.state.colValue[this.state.colValue.length -1];

        return (
            <div className="col-lg-12">
                {this.props.isLoading  && <h2 classname="m-5">Is Loading....</h2>}
                <div className="row mb-3">
                    <div className="col-12 d-none d-lg-block d-xl-block">
                        <div className="card">
                            <div className="card-header d-flex justify-content-end">
                                <span className="mr-3">Change Layout: </span>
                                <LayoutMode len={3} isActive={this.state.gridValue === 3} click={this.changeLayout} />
                                <LayoutMode len={4} isActive={this.state.gridValue === 4}  click={this.changeLayout} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {this.props.products.lenght===0 && <h2 className="display-4">No product found, please re-select filters</h2>}
                    {paginationPipe(this.props.products, this.state).map(product =>{
                        let classes = `${this.state.colValue} col-md-6 mb-4`;
                        return (<div className={classes} key={product.id} >
                           <Product  product={product}/>
                        </div>)
                    })}
                </div>
                <div className="d-flex justify-content-end">
                  { this.props.products && 
                  <Pagination
                        totalItemsCount={this.props.products.length}
                        currentPage={this.state.currentPage}
                        perPage={this.state.perPage}
                        pagesToShow={this.state.pagesToShow}
                        onGoPage={this.goPage}
                        onPrevPage={this.onPrev}
                        onNextPage={this.onNext}
                    />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const brands = state.brandFilter ? state.brandFilter :[];
    const orderBy = state.orderBy;
    const isLoading = state.shop.isLoading;
    const priceFilters = state.priceFilter;
   //console.log("isLoading in ProductList map",isLoading );
    const filterByBrandArr = brandFilter(state.products, brands);
    const filterByPrice = priceFilter(filterByBrandArr,priceFilters);
    const filterByOrderArr = orderByFilter(filterByPrice, orderBy);
  /* console.log("brands",brands)
   console.log("products in map", state.products);
   console.log("filterByBranndarr", filterByBrandArr);
   console.log("products filterByOrderArr", filterByOrderArr);*/

    return {products: filterByOrderArr, isLoading:isLoading }
};



export default connect(mapStateToProps, null)(ProductList);
