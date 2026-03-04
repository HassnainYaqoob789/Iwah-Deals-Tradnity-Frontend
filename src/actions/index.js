import shop from '../api/shop'
import * as types from '../constants/ActionTypes'
import { toast } from 'react-toastify';
import axios from 'axios'
import { temp_url, sendOtp, encrypt_code } from '../constants/Endpoints'
import Swal from 'sweetalert2'
import 'react-toastify/dist/ReactToastify.css';
import store from '../store';
import history from '../history';






export const fetchProductsBegin = () => ({
    type: types.FETCH_PRODUCTS_BEGIN
});
export const receiveProducts = products => ({
    type: types.RECEIVE_PRODUCTS,
    products
})

export const fetchProductsSuccess = products => ({
    type: types.FETCH_PRODUCTS_SUCCESS,
    products
});

export const fetchProductsFailure = error => ({
    type: types.FETCH_PRODUCTS_FAILURE,
    error
});

export const fetchCategoryProductsBegin = () => ({
    type: types.FETCH_CATEGORY_PRODUCTS_BEGIN
});

export const fetchCategoryProductsSuccess = products => ({
    type: types.FETCH_CATEGORY_PRODUCTS_SUCCESS,
    products
});

export const fetchCategoryProductsFailure = error => ({
    type: types.FETCH_CATEGORY_PRODUCTS_FAILURE,
    error
});

export const recieveHomeBanner = banners => ({
    type: types.FETCH_HOME_BANNER,
    banners
})

export const dispatchaddressdetails = (data) => ({
    type: types.GETUSER_ADDRESSBYID,
    data
}
);
export const receiveMenu = menu => ({
    type: types.FETCH_MENU,
    menu
})
export const recieveSliderimages = images => ({
    type: types.FETCH_SLIDER_IMAGE,
    images
})
export const changeRouteName = routes => ({
    type: types.FETCH_ROUTE_P_NAME,
    routes
})
// export const getAllProducts = () => dispatch => {
//     dispatch(fetchProductsBegin());
//     shop.getProducts(products => {
//         dispatch(receiveProducts(products));
//         return products;
//     })
// }

// // Agar category ID hai to filter kar ke dispatch karo
// if (categoryId) {
//     const filteredProducts = products.filter(product => {
//         return product.api && 
//                product.api.Category && 
//                product.api.Category.some(cat => cat.id === categoryId);
//     });
//     dispatch(receiveProducts(filteredProducts));
// }

export const getAllProducts = (categoryId = null, productId = null, setLoading) => dispatch => {
    dispatch(fetchProductsBegin());

    shop.getProducts(products => {
        dispatch(receiveProducts(products));

        if (setLoading) setLoading(false);
        return products;

    }, categoryId, productId, setLoading);
};


// Update getAllProducts
// export const getAllProducts = (categoryId = null) => dispatch => {
//     // Agar category ID hai to category wala action dispatch karo
//     if (categoryId) {
//         dispatch(fetchCategoryProductsBegin());
//     } else {
//         dispatch(fetchProductsBegin());
//     }

//     // Return promise for component level loading handling
//     return new Promise((resolve, reject) => {
//         shop.getProducts(products => {
//             if (categoryId) {
//                 dispatch(fetchCategoryProductsSuccess(products));
//             } else {
//                 dispatch(fetchProductsSuccess(products));
//             }
//             resolve(products);
//         }, categoryId)
//             .catch(error => {
//                 if (categoryId) {
//                     dispatch(fetchCategoryProductsFailure(error.message));
//                 } else {
//                     dispatch(fetchProductsFailure(error.message));
//                 }
//                 reject(error);
//             });
//     });
// }

export const fetchMenu = () => dispatch => {
    shop.getMenu(menu => {
        dispatch(receiveMenu(menu));
        return menu;
    });
}
export const fetchImages = () => dispatch => {
    shop.getSliderimages(images => {
        dispatch(recieveSliderimages(images));
        return images;
    });
}
export const fetchHomeBanner = () => dispatch => {
    shop.getHomebanner(banner => {
        dispatch(recieveHomeBanner(banner));
        return banner;
    });
}

export const fetchSingleProduct = productId => ({
    type: types.FETCH_SINGLE_PRODUCT,
    productId
})
export const fetchOrigin = () => dispatch => {
    var domain = window.location.hostname.split(".");

    if (domain[2] === "pk") {
        localStorage.setItem('country', 'Pakistan');
        dispatch(filterCountry('Pakistan'));
        dispatch(changeCurrency('Rs'));
    } else {
        localStorage.setItem('country', 'Pakistan');
        dispatch(filterCountry('Pakistan'));
        dispatch(changeCurrency('Rs'));
    }
}
//it seems that I should probably use this as the basis for "Cart"
export const addToCart = (product, qty) => (dispatch) => {
    // toast.success("Item Added to Cart");
    dispatch(addToCartUnsafe(product, qty))
}
export const addToCartAndRemoveWishlist = (product, qty) => (dispatch) => {
    // toast.success("Item Added to Cart");
    dispatch(addToCartUnsafe(product, qty));
    dispatch(removeFromWishlist(product));
}
export const addToCartUnsafe = (product, qty) => ({
    type: types.ADD_TO_CART,
    product,
    qty
});
export const removeFromCart = product_id => (dispatch) => {
    // toast.error("Item Removed from Cart");
    dispatch({
        type: types.REMOVE_FROM_CART,
        product_id
    })
};
export const incrementQty = (product, qty) => (dispatch) => {
    // toast.success("Item Added to Cart");
    dispatch(addToCartUnsafe(product, qty))
}
export const decrementQty = productId => (dispatch) => {
    // toast.warn("Item Decrement Qty to Cart");
    dispatch({
        type: types.DECREMENT_QTY,
        productId
    })
};
//it seems that I should probably use this as the basis for "Wishlist"
export const addToWishlist = (product) => (dispatch) => {
    // toast.success("Item Added to Wishlist");
    dispatch(addToWishlistUnsafe(product))
    toast.success('Wishlist Added Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        bodyClassName: 'toastStyle',
    });
}
export const addToWishlistUnsafe = (product) => ({
    type: types.ADD_TO_WISHLIST,
    product
});
export const removeFromWishlist = product_id => (dispatch) => {
    // toast.error("Item Removed from Wishlist");
    dispatch({
        type: types.REMOVE_FROM_WISHLIST,
        product_id
    })
};
export const getaddressbyid = (data) => (dispatch) => {
    shop.getaddressbyid(data, e => {
        dispatch(dispatchaddressdetails(e))
    });
}
//Compare Products
export const addToCompare = (product) => (dispatch) => {
    // toast.success("Item Added to Compare");
    dispatch(addToCompareUnsafe(product))
}
export const addToCompareUnsafe = (product) => ({
    type: types.ADD_TO_COMPARE,
    product
});
export const removeFromCompare = product_id => ({
    type: types.REMOVE_FROM_COMPARE,
    product_id
});
export const deleteaddress = (data) => (dispatch) => {
    shop.deleteaddress(data, e => {

        shop.getAddress(e => {
            dispatch(dispatchAddrress(e));
        });
    });
}
// Filters
export const filterBrand = (brand) => ({
    type: types.FILTER_BRAND,
    brand
});
export const filterColor = (color) => ({
    type: types.FILTER_COLOR,
    color
});
export const filterPrice = (value) => ({
    type: types.FILTER_PRICE,
    value
});
export const filterSort = (sort_by) => ({
    type: types.SORT_BY,
    sort_by
});
export const filterCountry = (country) => ({
    type: types.FILTER_COUNTRY,
    country
});
export const filterSearch = (search) => ({
    type: types.FILTER_SEARCH,
    search
});
// Currency
export const changeCurrency = (symbol) => ({
    type: types.CHANGE_CURRENCY,
    symbol
});
//country 
export const changeCountry = (country) => ({
    type: types.CHANGE_COUNTRY,
    country
});
//adding users details 
export const userLoggedIn = (user) => ({
    type: types.USERS_DETAILS,
    user
});
export const custSignUp = (data) => {
    shop.postCustsignup(data, e => {
        if (e.message !== 'The given data was invalid.') {
            toast.success("Account Created Successfully!, Please Check your Email", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });
            var CryptoJS = require("crypto-js");

            const decryptedData = localStorage.getItem("RegisterUser");
            var bytes = CryptoJS.AES.decrypt(decryptedData, encrypt_code);
            var getData = bytes.toString(CryptoJS.enc.Utf8);

            const Dataa = JSON.parse(getData);
            var user = { "email": Dataa }

            axios.post(temp_url + sendOtp, user)
                .then(res => {
                    history.push(`${process.env.PUBLIC_URL}/otp`)
                }).catch((err) => {
                    console.error(err);
                })
        } else {
            toast.success(e.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });
        }
    })
};
export const custSignIn = (data) => (dispatch) => {
    shop.postCustsignIn(data, e => {

        if (e.status !== 200 && e.status !== 405) {
            toast.error(e.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });
        }
        else if (e.status === 405) {
            toast.error(e.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });

            var CryptoJS = require("crypto-js");

            const decryptedData = localStorage.getItem("RegisterUser");
            var bytes = CryptoJS.AES.decrypt(decryptedData, encrypt_code);
            var getData = bytes.toString(CryptoJS.enc.Utf8);


            const Dataa = JSON.parse(getData);
            var user = { "email": Dataa }
            axios.post(temp_url + sendOtp, user)
                .then(res => {
                    history.push(`${process.env.PUBLIC_URL}/`)
                })
        }
        else {
            toast.success("Success, Please wait to be Redirected", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });
            dispatch(userLoggedIn(e))

            history.push(`${process.env.PUBLIC_URL}/`)

            //    setTimeout(()=>{
            //     window.location.reload()
            //    },2000)
        }
    });
}
export const GoogleSignIn = (data) => (dispatch) => {

    shop.postGooglesignIn(data, e => {
        if (e.status !== 200 && e.status !== 405) {
            toast.error(e.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });
        }
        else if (e.status === 405) {
            toast.error(e.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });
        }
        else if (e.status === 200) {
            toast.success("Success, Please wait to be Redirected", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });
            dispatch(userLoggedIn(e))
            document.querySelector(".loader-wrapper").style = "display: none";
            history.push(`${process.env.PUBLIC_URL}/`)

        }
        else {
            toast.error(e.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });

        }
    });
}
export const FacebookSignIn = (data) => (dispatch) => {
    shop.postFacebookSignIn(data, e => {
        if (e.data.status !== 200 && e.data.status !== 405 && e.data.status !== 406) {
            toast.error(e.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });

        }
        else if (e.data.status === 405) {
            toast.error(e.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });


        }
        else if (e.data.status === 406) {
            toast.error(e.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });

            document.querySelector(".loader-wrapper").style = "display: none";
            window.location = "/user_email";


        }
        else if (e.data.status === 200) {
            toast.success("Success, Please wait to be Redirected", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });

            dispatch(userLoggedIn(e))
            document.querySelector(".loader-wrapper").style = "display: none";
            history.push(`${process.env.PUBLIC_URL}/`)

        }

        else {
            toast.error(e.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });


        }
    });
}
export const userLogoff = (user) => ({
    type: types.USERS_DETAILS,
    user
});
export const dispatchgetcustomer = (address) => ({
    type: types.GETUSER_INFO,
    address
});
export const dispatchAddrress = (address) => ({
    type: types.GETUSER_ADDRESS,
    address
});
export const dispatchreviewspost = (data) => ({
    type: types.POST_REVIEWS,
    data
});
export const orderReference = (orderid) => ({
    type: types.ORDER_REF,
    orderid
});
export const getOrderReferenceStatus = (data) => ({
    type: types.ORDER_REF_STATUS,
    data
});
export const applythetoken = (data) => ({
    type: types.APPLY_COUPON,
    data
});
export const placeOrder = (data) => (dispatch) => {
    shop.postPlaceOrder(data, e => {
        //  toast.info("Your Order has been Placed, Please Wait ....... ");
        dispatch(orderReference(e));
    });
}
export const clearCart = (data) => (dispatch) => {
    dispatch({
        type: types.CLEAR_CART,
        data
    })
}
export const dispatchReviewsDetail = (data) => ({
    type: types.REVIEWS_DETAILS,
    data
}
);
export const dispatchDeals = (data) => (dispatch) => {
    dispatch({
        type: types.FETCH_DEALS,
        data
    })
}


export const dispatchNewDeals = (data) => (dispatch) => {
    dispatch({
        type: types.FETCH_NEW_DEALS,
        data
    })
}


export const dispatchSocialLink = (data) => (dispatch) => {
    dispatch({
        type: types.FETCH_SOCIALLOGIN,
        data
    })
}
export const dispatchWishlist = (data) => (dispatch) => {
    dispatch({
        type: types.GET_WISHLIST,
        data
    })
}
export const dispatchreviews = (data) => (dispatch) => {
    dispatch({
        type: types.GET_REVIEWS,
        data
    })
}
export const dispatchgetOrders = (data) => (dispatch) => {
    dispatch({
        type: types.GET_ORDERS,
        data
    })
}
export const dispatchgetMainScreenText = (data) => (dispatch) => {
    dispatch({
        type: types.GET_MAIN_SCREEN_TEXT,
        data
    })
}
export const dispatchgetFooterIcons = (data) => (dispatch) => {
    dispatch({
        type: types.GET_FOOTER_ICONS,
        data
    })
}
export const dispatchgetCurrencies = (data) => (dispatch) => {
    dispatch({
        type: types.GET_CURRENCIES,
        data
    })
}

export const dispatchChangingCurrunce = (data) => (dispatch) => {
    dispatch({
        type: types.GET_CHANGE_CURRENCIES,
        data
    })
}

export const dispatchgetCart = (data) => (dispatch) => {
    dispatch({
        type: types.GET_CART,
        data
    })
}
export const dispatchviewDetail = (data) => (dispatch) => {
    dispatch({
        type: types.GET_VIEW_DETAILS,
        data
    })
}
export const getpages = (data) => (dispatch) => {
    dispatch({
        type: types.GET_ALL_PAGES,
        data
    })
}
export const dispatchgetProductCategory = (data) => (dispatch) => {
    dispatch({
        type: types.GET_CATEGORY,
        data
    })
}
export const dispatchGetAppConfig = (config) => (dispatch) => {
    dispatch({
        type: types.GET_APP_CONFIG,
        config
    })
}
export const dispatchConfirmOrder = (data) => (dispatch) => {
    dispatch({
        type: types.GET_CONFIRM_ORDER,
        data
    })
}
// export const dispatchgetfiltterproducts= (data) =>(dispatch) =>{
//     dispatch({
//         type: types.GET_FILLTER_PRODUCT,
//         data
//     })
// }
export const dispatchforgetemail = (data) => (dispatch) => {
    dispatch({
        type: types.FORGET_EMAIL,
        data
    })
}
export const getDeals = () => (dispatch) => {
    shop.getDeals(e => {
        dispatch(dispatchDeals(e));
    });
}


export const getNewDeals = () => (dispatch) => {
    shop.getNewDeals(e => {
        dispatch(dispatchNewDeals(e));
    });
}


export const getSocialLink = () => (dispatch) => {
    shop.getSocialLink(e => {
        dispatch(dispatchSocialLink(e));
    });
}
// export const getfilterProducts = (data) =>(dispatch) =>{
//     shop.getfilterProducts(data,e=>{
//          dispatch(dispatchgetfiltterproducts(e));
//          document.querySelector(".loader-wrapper").style = "display: none";
//          });
// }
export const getWishlist = () => (dispatch) => {
    shop.getWishlist(e => {
        dispatch(dispatchWishlist(e));

    });
}

export const getOrders = () => (dispatch) => {
    shop.getOrders(e => {
        dispatch(dispatchgetOrders(e));
    });
}
export const getMainScreenText = () => (dispatch) => {
    shop.getMainScreenText(e => {
        dispatch(dispatchgetMainScreenText(e));
    });
}
export const getFooterIcons = () => (dispatch) => {
    shop.getFooterIcons(e => {
        dispatch(dispatchgetFooterIcons(e));
    });
}
export const getCurrencies = () => (dispatch) => {
    shop.getCurrencies(e => {
        dispatch(dispatchgetCurrencies(e));
    });
}

export const ChangeCurrences = () => (dispatch) => {
    shop.getChangeCurrences(e => {
        dispatch(dispatchChangingCurrunce(e))
    })
}

export const getCartData = () => (dispatch) => {
    shop.getCartData(e => {
        dispatch(dispatchgetCart(e));
    });
}

export const postReturn = (data) => (dispatch) => {
    shop.postrefund(data, e => {
        document.querySelector(".loader-wrapper").style = "display: none";

        toast.success(e.Message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
        });

        shop.getOrders(e => {
            dispatch(dispatchgetOrders(e));
        });
        window.location = '/myOrders'
    });
}



export const getLogout = () => (dispatch) => {

    shop.getLogout(e => {
        toast.success(e.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
        });

        shop.getWishlist(e => {
            dispatch(dispatchWishlist(e));
        });
        window.location.replace("/");
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    });
}
export const getcustomer = () => (dispatch) => {
    shop.getcustomer(e => {
        dispatch(userLoggedIn(e));
    });
}
export const getAddress = () => (dispatch) => {
    shop.getAddress(e => {
        dispatch(dispatchAddrress(e));
    });
}
export const SendContact = (data) => (dispatch) => {
    shop.postContact(data, e => {
        toast.success(e.data, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
        });

        document.querySelector(".loader-wrapper").style = "display: none";

        setTimeout(function () {

            window.location.reload(true);

        }, 2000);
    });
}
export const removeWishlist = (data) => (dispatch) => {

    shop.removeWishlistItem(data, e => {
        shop.getWishlist(e => {
            dispatch(dispatchWishlist(e));
        });
        shop.getProducts(products => {
            dispatch(receiveProducts(products));
            return products;
        });

        shop.getDeals(e => {
            dispatch(dispatchDeals(e));
        });
    });


}
export const removecartitem = (data) => (dispatch) => {
    shop.removecartitem(data, e => {
        toast.success(e.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
        });
        dispatch(dispatchgetCart(e));
    });
}

export const sendSubscriberEmail = (data) => (dispatch) => {
    shop.sendSubscriberEmail(data, e => {
        toast.success(e.Message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
        });


    });
}


export const updatecart = (data) => (dispatch) => {
    shop.updatecart(data, e => {

        toast.success(e.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
        }); dispatch(dispatchgetCart(e));
    });
}
export const getProductCategory = () => (dispatch) => {
    shop.getProductCategory(e => {
        dispatch(dispatchgetProductCategory(e));
    });
}
export const getAppConfig = () => (dispatch) => {
    shop.getAppConfig(e => {
        dispatch(dispatchGetAppConfig(e));
    });
}
export const verify_otp = (data) => (dispatch) => {
    shop.verifyOtp(data, e => {

        if (e.message === "Success") {
            toast.success(e.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });

            history.push(`${process.env.PUBLIC_URL}/login`);

        } else if (e.message === "Invalid") {
            toast.error(e.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });

        } else {
            toast.error(e.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });
        }



    });
}

export const LeopardTracking = (data) => (dispatch) => {
    shop.leopardTracking(data, e => {
        if (e.message === "Operation Successful.") {
            let prevData = window?.history?.state?.state || {};

            history.push(`${process.env.PUBLIC_URL}/trackOrder`, { ...prevData, orderDetailsTrack: { order_id: data?.order_id, TrackDetailReply: JSON.parse(e?.data)?.TrackDetailReply } })


        } else {
            toast.error(e.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });
        }



    });
}
export const resendOtp = (data) => (dispatch) => {
    shop.resendOtp(data, e => {
        toast.success(e.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
        });
    });
}
export const forgetotpsend = (data) => (dispatch) => {

    shop.forgetotpsend(data, e => {

        if (e.status === 200) {
            dispatch(dispatchforgetemail(data));

            toast.success(e.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });
            history.push(`${process.env.PUBLIC_URL}/ForgetOtp`)

        } else {
            toast.error(e.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });
        }
    });
}
// export const searchProduct = (data) =>(dispatch) =>{
//     shop.searchProduct(data,e=>{ 
//         dispatch(dispatchgetfiltterproducts(e));
//         document.querySelector(".loader-wrapper").style = "display: none";
//      });
// }
export const forgetNewPassword = (data) => (dispatch) => {
    shop.forgetNewPassword(data, e => {
        history.push(`${process.env.PUBLIC_URL}/login`)
        toast.success(e.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
        });
    });
}
export const sendfcp_token = (data) => (dispatch) => {
    shop.sendfcp_token(data, e => {
    });
}

export const forgetverifyotp = (data) => (dispatch) => {
    shop.forgetverifyotp(data, e => {
        if (e.status === 200) {
            toast.success(e.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });
            history.push(`${process.env.PUBLIC_URL}/NewForgetPassword`)

        } else {
            toast.error(e.message);
        }
    });
}
export const addItemToCart = (data) => (dispatch) => {
    shop.addItemToCart(data, e => {
        toast.success(e.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
        });
        document.querySelector(".loader-wrapper").style = "display: none";

        shop.getCartData(e => {
            dispatch(dispatchgetCart(e));
        });
    });
}
export const addWGItemToCart = (data) => (dispatch) => {
    shop.addWGItemToCart(data, e => {
        toast.success(e.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
        });
        document.querySelector(".loader-wrapper").style = "display: none";

        shop.getCartData(e => {
            dispatch(dispatchgetCart(e));
        });
    });
}
export const reOrder = (data) => (dispatch) => {
    shop.reOrder(data, e => {
        toast.success(e.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
        });
        shop.getCartData(e => {
            dispatch(dispatchgetCart(e));
        });
    });
}
export const fetchReviews = (data) => (dispatch) => {
    shop.getreviews(data, e => {
        dispatch(dispatchReviewsDetail(e));
    });
}
export const postreviews = (data) => (dispatch) => {
    shop.postReviews(data, e => {
        window.location.reload(true);
    });
}


export const stripeApi = (data) => (dispatch) => {
    shop.stripeApi(data, e => {
        window.location.replace("/orderNumber")

    });
}
export const hblPayApi = (data) => (dispatch) => {
    shop.hblPayApi(data, e => {
        toast.success(`${e?.result}, Please wait you are being redirected!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
        });

        if (e?.redirect) {
            document.querySelector(".loader-wrapper").style = "display: none";
            window.location.replace(e.redirect)
        }

    });
}
export const easypaisaPayApi = (data) => (dispatch) => {
    shop.easypaisaPayApi(data, e => {
        toast.success(`${e?.result}, Please wait you are being redirected!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
        });

        if (e?.redirect) {
            document.querySelector(".loader-wrapper").style = "display: none";
            window.location.replace(e.redirect)
        }

    });
}
export const paypalApi = (data) => (dispatch) => {
    shop.paypalApi(data, e => {
        window.location.replace("/orderNumber")

    });
}


export const postAddAddress = (data) => (dispatch) => {
    shop.postAddAddress(data, e => {
        toast.success(e.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
        });
    }
    );
}
export const updateaddress = (data) => (dispatch) => {
    shop.updateaddress(data, e => {

        if (e.status === 200) {
            toast.success(e.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });
            shop.getAddress(e => {
                dispatch(dispatchAddrress(e));
                history.goBack();

            });
        } else {
            toast.error("Some Error Occured", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                bodyClassName: 'toastStyle',
            });
        }
    });
}
export const updateProfile = (data) => (dispatch) => {

    shop.updateProfile(data, e => {
        toast.success(e.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
        });
        shop.getcustomer(e => {
            dispatch(userLoggedIn(e));
        });
        setTimeout(() => {
            history.push(`${process.env.PUBLIC_URL}/dashboard`)
        }, 2000);
        document.querySelector(".loader-wrapper").style = "display: none";

    });
}
export const viewOrderDetail = (data) => (dispatch) => {
    shop.getorderdetails(data, e => {
        dispatch(dispatchviewDetail(e))
        document.querySelector(".loader-wrapper").style = "display: none";
    });
}

export const getAllPages = (data) => (dispatch) => {
    shop.getpages(data, e => {
        dispatch(getpages(e))
    });
}


export const CancelOrder = (data) => (dispatch) => {
    shop.CancelOrder(data, e => {
        toast.success(e.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
        });
        shop.getOrders(e => {
            dispatch(dispatchgetOrders(e));
        });
    });
}
export const ChangePassword = (data) => (dispatch) => {
    shop.ChangePassword(data, e => {
        toast.success(e.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
        });
    });
}
export const saveOrder = (data) => (dispatch) => {
    shop.saveOrder(data, e => {

    });
}
export const codsaveOrder = (data) => (dispatch) => {
    shop.codsaveOrder(data, e => {

    });
}

export const getAllcatebyproductsactiontypes = (data) => ({
    type: types.CATEGORY_BY_PRODUCTS,
    data,
});



export const getAllAreas = (data) => ({
    type: types.GET_ALL_AREAS,
    data,
});


export const getAllproductByCollection3 = (data) => ({
    type: types.PRODUCT_BY_COLLECTION_THREE,
    data,
});


export const getAllpeopleViewProduct = (data) => ({
    type: types.PEOPLE_VIEW_PROCUCT,
    data,
});


export const FetchpeopleViewedProduct = (data) => (dispatch) => {
    shop.CallEngine_peopleViewedProduct(data, (e) => {
        dispatch(getAllpeopleViewProduct(e, data));
    });
};


export const FetchproductByCollection3 = (data) => (dispatch) => {
    shop.CallEngine_productByCollection3(data, (e) => {
        dispatch(getAllproductByCollection3(e, data));
    });
};


export const FetchCategAreas = (data) => (dispatch) => {
    shop.CallEnginegetAreas(data, (e) => {
        dispatch(getAllAreas(e, data));
    });
};


export const FetchCategByProducts = (data) => (dispatch) => {
    shop.CallEnginegetCategoryByProducts(data, (e) => {
        dispatch(getAllcatebyproductsactiontypes(e, data));
    });
};



export const hblsaveOrder = (data) => (dispatch) => {
    shop.hblsaveOrder(data, e => {

    });
}
export const easypaisasaveOrder = (data) => (dispatch) => {
    shop.easypaisasaveOrder(data, e => {

    });
}
export const applyCoupan = (data) => (dispatch) => {
    shop.applyCoupan(data, e => {
        toast.success(e.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
        });
        shop.getCartData(e => {
            dispatch(dispatchgetCart(e));
        });
    });
}
export const removeCoupan = (data) => (dispatch) => {
    shop.removeCoupan(data, e => {
        toast.success(e.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
        });
        shop.getCartData(e => {
            dispatch(dispatchgetCart(e));
        });
    });
}
export const saveAddrestocart = (data) => (dispatch) => {

    document.querySelector(".loader-wrapper").style = "display: block";
    shop.saveAddrestocart(data, e => {
        document.querySelector(".loader-wrapper").style = "display: none";

        var CryptoJS = require("crypto-js");

        var encrypt_dataa = CryptoJS.AES.encrypt(JSON.stringify(data), encrypt_code).toString();
        localStorage.setItem('guest_address', encrypt_dataa);

        shop.getCartData(e => {
            dispatch(dispatchgetCart(e));
        });
    });
}


export const saveShipping = (data) => (dispatch) => {
    shop.saveShipping(data, e => {
        document.querySelector(".paymentOption").style = "display: block; padding-top:20px;margin:50px; ";
        document.querySelector(".loader-wrapper").style = "display: none";
        shop.getCartData(e => {
            dispatch(dispatchgetCart(e));
        });
    });
}
export const savePayment = (data) => (dispatch) => {
    document.querySelector(".loader-wrapper").style = "display: block";
    shop.savePayment(data, e => {
        dispatch(dispatchConfirmOrder(e));
        document.querySelector(".loader-wrapper").style = "display: none";
        localStorage.setItem('shipping-payment', 'true');
        shop.getCartData(e => {
            dispatch(dispatchgetCart(e));
        });
    });
}
export const movetocart = (data) => (dispatch) => {
    shop.movetocart(data, e => {
    });
}
export const GetOrderbyRef = (data) => (dispatch) => {
    shop.getOrderRef(data, e => {
        dispatch(getOrderReferenceStatus(e));
    });
}
export const getDealsBanner = () => (dispatch) => {
    shop.getDealsBanner(e => {
        dispatch(dispatchDealsBanner(e));
    });
}
export const getCoupoun = (data) => (dispatch) => {
    shop.checkcoupoun(data, e => {
        if (e === 0) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Invalid Coupon! ',
                showConfirmButton: false,
                toast: true,
                timer: 1500
            })
            dispatch(applythetoken(e));
        } else {
            dispatch(applythetoken(e));
        }
    });
}
export const getContactDetail = (data) => (dispatch) => {
    shop.getContactDetail(e => {
        dispatch(dispatchContactDetail(e));
    });
}
export const fetchSideDetails = (data) => (dispatch) => {
    shop.getfetchSideDetails(e => {
        dispatch(dispatchSidetDetail(e));
    });
}
export const fetchBestSeller = (data) => (dispatch) => {
    shop.getBestSeller(e => {
        dispatch(dispatchBestSeller(e));
    });
}
//Dispatch
export const dispatchContactDetail = (data) => ({
    type: types.GETCONTACT_DETAILS,
    data
});
export const dispatchDealsBanner = (data) => (dispatch) => {
    dispatch({
        type: types.FETCH_DEALS_BANNERS,
        data
    })
}
export const dispatchSidetDetail = (data) => ({
    type: types.GETSIDEDETIALS,
    data
});
export const dispatchBestSeller = (data) => ({
    type: types.GETBESTSELLER,
    data
});
export const socialLogin = (data, country) => (dispatch) => {
    shop.postSocialLogin(data, e => {
        if (!e) {
            var datas = {
                UserName: data.Email,
                Email: data.Email,
                Password: Math.random().toString(36).substr(2, 5),
                Gender: '',
                Contact: '',
                Address: '',
                Address2: '',
                City: '',
                Country: localStorage.getItem('country'),
                ProfileImg: '',
                AuthToken: data.Token,
                SocialChannel: data.Channel,
                Platform: navigator.appName,
            }
            shop.postCustsignup(datas, d => {
                if (d) {
                    shop.postSocialLogin(data, e => {
                        if (e) {
                            toast.success("Success, Please wait to be Redirected", {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                                bodyClassName: 'toastStyle',
                            });
                            dispatch(userLoggedIn(e))
                        } else {
                            toast.error("Cannot Login!, Please Check Your Credentials ", {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                                bodyClassName: 'toastStyle',
                            });
                        }
                    });
                } else {
                    toast.error("Can't Login, Call", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        bodyClassName: 'toastStyle',
                    });
                }
            })
        } else {
            dispatch(userLoggedIn(e))
        }
    });
}