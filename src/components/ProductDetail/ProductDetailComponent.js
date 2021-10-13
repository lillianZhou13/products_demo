import React from 'react';
import {connect} from 'react-redux';
import {formatMoney} from "../../pipes/priceFormatter";
import {addProductToCart} from "../../actions";

const ProductDetailComponent = (props) => {

    const {
        title,
        images,
        brand,
        price,
        description,
        id,
        detail
    } = props.product;

console.log("props.product in ProductDeatilComponent",props.product);
    const onCart = () => {
        props.dispatch(addProductToCart(props.product));
    };

    return (
        <aside className="col-sm-7">
            <article className="card-body p-5">
                <h3 className="title mb-3">{title}</h3>

                <p className="price-detail-wrap">
	<span className="price h3 text-warning">
		<span className="currency">$</span><span className="num">{formatMoney(price)}</span>
	</span>
                </p>
                <dl className="item-property">
                    <dt>Description</dt>
                    <dd><p className="text-capitalize">{description}</p></dd>
                </dl>
                <dl className="param param-feature">
                    <dt>Brand</dt>
                    <dd className="text-capitalize">{brand}</dd>
                </dl>
                
                
                <hr/>
                <hr/>
                <button
                    onClick={onCart}
                    className="btn btn-lg btn-outline-primary text-uppercase mt-3"><i
                    className="fa fa-shopping-cart"/> Add to cart
                </button>
                <div dangerouslySetInnerHTML={{__html: detail}}></div>
            </article>
        </aside>
    );
};

export default connect()(ProductDetailComponent);
