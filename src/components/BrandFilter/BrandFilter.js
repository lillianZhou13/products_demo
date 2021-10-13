import React, {useState} from 'react';
import {connect} from 'react-redux';
import Select from 'react-select'
import './BrandFilter.scss';
import {updateBrandFilter,priceFilter} from "../../actions";


const BrandFilter = (props) => {
   
    const {dispatch, brandItemsCount,brands} = props;
    const [brandsSelected,setBrandsSelected] = useState([]);
    const [min,setMin] = useState(0);
    const [max,setMax] = useState(1000);
    const brandOptions = brands;

    const handleSelectBox = (e) => {
        
        console.log("select box on change",e);
        const brandsOnSelect = e.map(brand=> {return brand.value});
        brandsOnSelect && setBrandsSelected(brandsOnSelect);
        console.log("brandsSelected",brandsSelected);
        dispatch(updateBrandFilter(brandsSelected));
    };

 const handleChange = (e) => {
    const {name,valueAsNumber} = e.target;
    name === "min" && setMin(valueAsNumber);
    name === "max" && setMax(valueAsNumber);
   
    console.log("min,max",min,max);
    
 }
   const handleSubmit = (e) =>{
     e.preventDefault();
     console.log("form submit");
     dispatch(priceFilter(min,max));
   }

        return (
            <div className="row align-items-center">
                <div className="col-sm-4 col-lg-1">
                    <span className="">Filter By:</span>
                </div>
               
                <Select 
                 className="col-sm-12 col-lg-4"
                 defaultValue={brandsSelected}
                 options={brandOptions} 
                 isMulti
                 onChange={handleSelectBox}/>
                <div className="col-sm-12 col-lg-6">
                    <form className="row align-items-center" onSubmit={handleSubmit}>
                        <label className="col-sm-3 col-lg-3" htmlFor="price">Price:</label>
                        <input  className="col-sm-3 col-lg-3" name="min" value={min} type="number" min="0"  max={max} onChange={handleChange}/>
                        <input className="col-sm-3 col-lg-3" name="max" value={max} type="number" max="1000" min={min} onChange={handleChange}/>
                        <button className="btn btn-small btn-secondary rounded">Confirm</button>
                    </form>
                </div>
               
            </div>
        );

};

const mapStateToProps = (state) => {

    const brandItemsCount = {};
    const brands = state.brandFilter ? state.brandFilter :[];
    console.log("brnds in map",brands);
    state.products && state.products.forEach(p => {
        brandItemsCount[p.brand] = brandItemsCount[p.brand] + 1 || 1;
    });


    return {
        brandItemsCount,
        brands
    }

};

export default connect(mapStateToProps)(BrandFilter);