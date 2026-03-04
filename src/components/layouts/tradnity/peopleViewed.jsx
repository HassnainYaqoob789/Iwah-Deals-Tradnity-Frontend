import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux'
import store from '../../../store';
import { Product4 } from '../../../services/script'
import { addToCart, addToWishlist, addToCartUnsafe, removeWishlist, addItemToCart, FetchpeopleViewedProduct } from "../../../actions";
import ProductItem from './product-item';
import "./proCard.css"
import { getTopCollection } from '../../../services';
import EmptySearch from '../../../svg_code/emptySearch';
// import Loader from '../../../svg_code/loader';
import LoaderSpinner from "../../../components/loadingspin"

import history from '../../../history';

const PeopleViewed = ({ item, symbol, subtitle, pathName, clickedReload, category_Id, maincompLoading, getpeopleViewProducts }) => {
    const [loading, setLoading] = useState(true);
    const [testArr, setTestArr] = useState([]);
    let arr = [];

    function handleClick(e) {
        store.dispatch(removeWishlist(e));
    }
    function addItemTOCart(e) {
        document.querySelector(".loader-wrapper").style = "display: block";
        var item = { 'product_id': e, 'quantity': 1 }
        store.dispatch(addItemToCart(item));
    }

    useEffect(() => {
        const paramsObj = {
            token: "true",
            currency: localStorage.getItem("changeCurrencies"),
            order: "asc",
            limit: 10
        };
        store.dispatch(
            FetchpeopleViewedProduct({
                paramsObj: paramsObj,
                setLoading: setLoading   // ← function pass ho raha hai (important!)
            })
        );
    }, [])


    useEffect(() => {
        arr.length = 0;
        let productF = item.find(el => el.api.url_key === pathName);
        if (productF && productF.api && productF.api.cross_up_sell && (productF.api.cross_up_sell.length !== 0)) {
            productF.api.cross_up_sell.map((e, i) => {
                let openingA = item.find(el => el.api.id === e);
                arr.push(...arr, openingA);
            })
        }
        else {
            arr.push((getpeopleViewProducts?.length !== 0) ? getpeopleViewProducts : []);
        }
        if (arr.length !== 0) {
            arr = arr.filter((value, index, self) => index === self.findIndex((t) => (t && t.api ? t.api.id === value.api.id && t.api.name === value.api.name : null)))
        }
        if (arr.length <= 5) { arr = arr.concat(getpeopleViewProducts) }
        let dataN = arr.indexOf(productF)
        if (dataN !== -1) {
            arr.splice(dataN, 1)
        }
        const ids = arr.map(o => o.id)
        const filtered = arr.filter(({ id }, index) => !ids.includes(id, index + 1))
        setTestArr(filtered);
    }, [window.location.pathname, maincompLoading, loading, getpeopleViewProducts])

    return (
        <div>

            {/*Paragraph*/}
            <section className="section-b-space j-box pets-box ratio_square px-3">
                <div className="row">
                    <div className="col">
                        <div className="title1 title5">
                            {subtitle ? <h4 style={{ fontStyle: 'italic', fontSize: '14px', color: '#777777', letterSpacing: '0px' }}>{subtitle}</h4> : ''}
                            <h2 className="title-inner1 mob-heading" style={{ letterSpacing: '3px' }}>People Also Viewed</h2>
                            <hr role={`tournament6`} />
                        </div>


                        {testArr && testArr.length !== 0 ?
                            <Slider {...Product4} className="product-4 product-m mx-4">
                                {
                                    testArr && testArr.map((product, index) =>
                                        <div key={index}>
                                            <ProductItem product_ids={product?.id || ""} category_ids={category_Id} clickedReload={clickedReload} product={product} symbol={symbol}
                                                onAddToWishlistClicked={() => localStorage.getItem("customerData") ? handleClick(product.id) : history.push(`${process.env.PUBLIC_URL}/login`)}
                                                onAddToCartClicked={() => addItemTOCart(product.id)} key={index} />
                                        </div>
                                    )
                                }
                            </Slider>
                            :
                            loading ?
                                <div style={{ textAlign: "center", margin: "auto" }}>
                                    {/* <Loader /> */}
                                    <LoaderSpinner />
                                </div>
                                :
                                <div className="text-center my-5">
                                    <EmptySearch />
                                    <br />
                                    <span className='fs-5 my-3'>Sorry No Products Found!</span>
                                </div>
                        }
                    </div>
                </div>
            </section>
        </div>
    )

}

const mapStateToProps = (state) => {

    return {
        item: state.data.products,
        symbol: state.data.symbol,
        getpeopleViewProducts: state.getpeopleViewProductReducer.getpeopleViewProducts,

    }
}
export default connect(mapStateToProps, { addToCart, addToCartUnsafe, addToWishlist })(PeopleViewed);