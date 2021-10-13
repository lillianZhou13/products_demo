import React, {Component} from 'react';
import BrandFilter from "../../components/BrandFilter/BrandFilter";
import OrderFilter from "../../components/OrderFilter/OrderFilter";

class FilterBar extends Component {
    render() {
        return (
            <div className="col-lg-12">
                <div className="row">
                    
                    <div className="col-12">
                        <div className="card p-3">
                          <BrandFilter/>
                          <OrderFilter/>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        );
    }
}

export default FilterBar;