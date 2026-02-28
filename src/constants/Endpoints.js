//base URL

// export const base_url = `${window.location.protocol}/Admin/public/`;
// export const temp_url = `${window.location.protocol}/Admin/public/`;

// export const base_url = "https://dev.tradnity.com/Admin/public/"
// export const temp_url = "https://dev.tradnity.com/Admin/public/"

export const base_url = "https://iwahdeals.tradnity.com/Admin/public/"
export const temp_url = "https://iwahdeals.tradnity.com/Admin/public/"

// export const base_url = "https://hscollection.com.pk/Admin/public/"
// export const temp_url = "https://hscollection.com.pk/Admin/public/"

// export const base_url = 'Admin/public/'
// export const temp_url =  "Admin/public/"

// "http://192.168.18.6/Ecommerce_makiherbal/public/"
const check_login = localStorage.getItem("customerData");
export const encrypt_code = "alisonstech";

// export const site_url = "https://shop.tradnity.com/"

export const categories = "api/products?category_id=";

export const mainScreenText = "api/main-screen-text";
export const currencies = "api/config/currencies";
export const footerIcons = "api/getFooterIcons";

export const getBanner = "api/sliders?slider_for=";
export const custSignUp = "api/customer/register";
export const custSignIn = "api/customer/web_login?token=true";
export const GoogleSignIn = "api/customer/login-social-google-web?token=true";
export const FacebookSignIn = "api/customer/login-social-fb-web?token=true";
export const getSociallink = "api/social-icons";
export const placeContact = "api/contact-form";
export const ChangeCurrences = "api/currencies";

export const getContactDetails = "api/contact-details";
export const sideDetails = "api/promotion-products";
export const getBestSeller = `api/new/allproducts?featured=1&order=asc&currency=${
  localStorage.getItem("changeCurrencies")
    ? localStorage.getItem("changeCurrencies")
    : localStorage.getItem("defaultDataaa")
}`;
export const getsocialicons = "/api/social-icons";
export const getcustomer = "api/customer/get?token=true";
export const getAddress = "api/addresses?token=true";
export const getReviews = "api/reviews?token=true";
export const getWishlist = `api/wishlist${
  check_login !== null ? "?token=true" : ""
}`;
export const removeWishlist = "api/wishlist/add/";
export const movetocart = "api/move-to-cart/";
export const MyOrders = `api/orders?token=true&currency=${
  localStorage.getItem("changeCurrencies")
    ? localStorage.getItem("changeCurrencies")
    : localStorage.getItem("defaultDataaa")
}`;
export const Reorder = `api/checkout/re-order/&currency=${
  localStorage.getItem("changeCurrencies")
    ? localStorage.getItem("changeCurrencies")
    : localStorage.getItem("defaultDataaa")
}`;
export const orderCancel = `api/checkout/order-cancel/&currency=${
  localStorage.getItem("changeCurrencies")
    ? localStorage.getItem("changeCurrencies")
    : localStorage.getItem("defaultDataaa")
}`;
export const sendOtp = "api/customer/request_otp";
export const verfiyotp = "api/customer/verify_otp";
export const leapardTracking = "api/leopards/tracking";
export const getOrderDetail = `api/orders/&currency=${
  localStorage.getItem("changeCurrencies")
    ? localStorage.getItem("changeCurrencies")
    : localStorage.getItem("defaultDataaa")
}`;
export const updateProfile = "api/customer/profile?token=true";
export const getCart = `api/checkout/cart${
  check_login !== null ? "?token=true" : ""
}${check_login !== null ? "&" : "?"}currency=${
  localStorage.getItem("changeCurrencies") !== null
    ? localStorage.getItem("changeCurrencies")
    : localStorage.getItem("defaultDataaa")
}`;
export const cartUpdate = "api/checkout/cart/update";
export const deletecartitem = "api/checkout/cart/remove-item/";
export const addcartitem = "api/checkout/cart/add/";
export const getfilterproducts = `api/products&currency=${
  localStorage.getItem("changeCurrencies")
    ? localStorage.getItem("changeCurrencies")
    : localStorage.getItem("defaultDataaa")
}`;
export const product_category = "api/categories";
export const reviewsbyproductid = "api/reviews";
export const postreviewsbyproductid = "api/reviews/";
export const changePassword = "api/customer/changepassword?token=true";
export const saveAddress = `api/checkout/save-address${
  check_login !== null ? "?token=true" : ""
}`;
export const saveshipping = `api/checkout/save-shipping${
  check_login !== null ? "?token=true" : ""
}`;
export const savepayment = `api/checkout/save-payment${
  check_login !== null ? "?token=true" : ""
}`;
export const saveorder = `api/checkout/save-order${
  check_login !== null ? "?token=true" : ""
}`;
export const applyCoupan = `api/checkout/cart/coupon${
  check_login !== null ? "?token=true" : ""
}`;
export const removeCoupan = `api/checkout/cart/coupon${
  check_login !== null ? "?token=true" : ""
}`;
export const forgetsendotp = "api/customer/forget_get_email";
export const forgetOTPerify = "api/customer/forget_verify_otp";
export const forgetnewpasword = "api/customer/forget_password_update";
export const searchProduct = "api/products?name=";
export const addAddress = "api/addresses/create?token=true";
export const DeleteAddress = "api/addresses/";

export const getAddressbyid = "api/addresses/";
export const logout = "api/customer/logout?token=true";
export const getfeaturedProducts = `api/products?featured=1&token=true&order=asc&currency=${localStorage.getItem(
  "changeCurrencies"
)}`;
export const getnewestProducts = `api/products?new=1&token=true&order=asc&currency=${localStorage.getItem(
  "changeCurrencies"
)}`;

export const getnewProducts = `api/new/allproducts?token=true&order=asc&currency=${localStorage.getItem(
  "changeCurrencies"
)}&category_id=`;


export const catebyproductsroute = "api/new/allproducts";
export const areas = "api/areas"

export const returnorder = "api/refund-request";
export const SubcriberEmail = "api/subscriber-email";
export const getPages = "api/get-config-pages";
export const FCPtoken = "api/fpc-token";
export const stripeApi = "api/stripe";
export const hblPayApi = "api/checkout/payment/hbl/web";
export const easypaisaPayApi = "api/checkout/payment/easypaisa/web";
export const paypalApi = "api/transactions";
export const appConfig = "api/app-settings";

export const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIJJwIBAAKCAgBp/8oAkVRYKAvgK1I+PhKhrmBjGaQ4b0SMj+mXnfhfoGrSRcWi
6hBx1iL3tOpBDv5uI+3HdSn4GykmOnuWYynP5MS8q50m5/GRrb2pRIWi978DW9tp
elbPjW1p2fCN598CcndmWz1Ubfdwi8z15cScyLAf3uAxlx88OnjNPZTZZU2ruZZe
doXwIKT60g2vnd1//0RCcp2K7IrDEX+OBGyN9GbR1J31ghhss0Zn8SuqYXKmwwEj
YtPbGBHlzkK9aosbe6DvdunbTNE3SGxav2nULpdERQye7mcMF0+xqDIy6BzPBzyw
zysrEM0/AitG4Sk0YXVuOs8QElHMiICsUNOKj5D40g/PyHFn2mm8LNugM2sIgiju
oqa9Co8QIdnsNGr2UHPj9JTydARgejlHqF//Na6jWlMKRGyIF94iiYnLJBszxF07
/qmMfW0qAgOWSN222ArLvyJq4hXUU0XdUCP5PSF5+IGXLP4upsxECSOMOnxf9xm4
J9FEkE7okkTHvBEXAUGPp9YqNtm6Ymtdfh5Qy5n+wyu3xl7B5UQ5dzg1cmKmRMMR
ZgDKNnacQnHsw42Y80c+Te1FEIYoM/T2QVDvDk1R2esh2EDzKzMbkRHxBIe+B9m0
68CqkQN33HB6icC84FVhmu4jRMIoq/BCWXaEY8ROuuLRqrtxJvgGaAJo/wIDAQAB
AoICAFFbRzLKWL9U9VB4T6aARBKeYVKOsrGyDR4JsxNw5tqWqIZ9kOSq3DZTUgFn
dUi79mKY5v7pGW5ZgmraBlN2BviOsMXSvkrHSW0zudd6RUvA9XXhgfViNdEVzr2o
ze5M4qjhLG1+aAMuZ/WVB5pQYWiozC2aBd9qC0pR4rg8pMt66nN8fUJBnCmjFJ2C
rYh2FTURutV5XRvs09BG1O0uzhbiWCyDET4HPTHpI4fR3l7mbnY6Q9xiFRMbVVlZ
x3XUmbJdYDeLwJBWVFonFytLsTFvFSEMElTFzIfGOJ+15dmWt83a0yUtzQc/3RiY
VJkRZmvSxav2LUk7llbzCje3zbSTaLKRuQhyGiYq/RjczGBLcqGG8o119I6uBjpo
c3eueEJvurVULHswFfWhCcCNTJ/tMrOzwBSOFRCqzxuCLpG8le1TuqOAbFG5vNdJ
VlSG9NLyR4s8hdmM+ghIGn30GLbBDgtzGaudejdNM2Tt60D3mwTDUgotvBGocCIx
VzLMDVeDsJPelTobinAFjd0ITY6lYFgkORHMeFmb48oVEtovvZU0gQoyC9Jk/6Og
oWJEalZKfBPaRi/Hx5QOWGoFw5ER0g7MvFZjySNYgowG2vH8xakk1qiZIXxhmvTe
EY6Gkvh+0Rvt9BDazjLV0yQyzgyHnw/pPF7EE2P5k+MTVUVZAoIBAQC+DaV07Kfc
+4zVRCAvo1KqOVdFJDm6KX5ssiImKqD3DwcO8pnjq/+I4z/Drcli2qNG9AxEQT0N
RuSqLjfsgkQ942gA1M4nGr5TwF/AQBIhxVxSMuCCGesCJ+zu6o0ToKhnVWJvgNS2
dTcz+xGETag2SP8tuk39KyMjesfewQ/Jhb23BAtWCy7GGYHuDqpuINW5g45PE1a9
RToAAiKdubrfZbfpelZ9TJzxwNq3GzQiaywAKa43oFb7686mhVbdnfROf9ln7fX8
7vwe38a16NKurXzvnoPjaK/piEQNF15KuUjj2GsIesI/KoP8k0Zx22u2dHKFgfQv
9xwC8Maky1F7AoIBAQCOx6aC/SsHV4q8Fngf+/FMFiYaONW9/OXYVH80Ys4iIFF7
Ch8h/vQWDWXU6pCKx/pLRUfooLL9Ni9oK+RGkigQNkUDtw0x2V+337q32VxGrtoE
EofMCetIEJtfHFerP71u4ZTtFvnj+PGhFguqRE9gkU4y00bOjkEee+prt4cNe0tH
YS4mlCFwVKyicRg6WykwMPesyiZ9Z/pVbkZ2FXlIlno3hmZB2AoQ8idE4vwLTPLd
8R2gJUs0rzePnz866kLQCC2fXXDoly3/8ZKAYb5YqeaSnbl1h8k16l87dZEoirJ6
yaqOmmkIfOkkU7nxF1YRCkKtG/m9D2aBfCdKsoVNAoIBAQCcYdIxYcHGXd5GZeYu
DK+qjcA3jlVJz3bNrc3XpeAJKn5eWFU0N4TueD8xnkBFbS5I5etqBlxcHmdteNZf
b9kDK6madYCkQKc3duXS5WWGEEWlBWQi6Xysq3mUJb+r1Nh9Ho7+vP1KnSytQvvo
55VwBaSjVddyaBpjyVXI/wckhT3T6CoDxPPZ4Yc+ASdPswjpu0xP2NPYravJ8ffV
3Mvdom8wWI/uTiod6tiNLn85iwILqEBIWVD5vdCuyKzvcldieGTF1dJBK8ydAvkZ
GdiyDuLssHxJlQyalpuYQhA+YDOP97YqpghLvYoZPH4MlcYNvce1/3aUOTr9WG27
j+kdAoIBAEmbT5JT5ezhCpqwkrkab2kkOfxmtHo/eFawKOvezBn3w0nFDAvAniEI
Qykiy+Vf9v769nlM7zlux73SctqW2qSQ9b9WjSzXvWrTojTJj7K4zZgv3WYo7uy1
8wNzXxbfw074aIhZwfXvDtJWxSjAEpPcFQ5KsUQnPhbzFwT1FmCy4TopNVuaHisE
3ALafv0GphM8C1M+29zmz71fHmAd7eqn+NXLKchkEbxuuiPfSMSipMoaVYWL9Fty
wRf/pt8+ibcpoCt6Ro0B8yrxZO9edHzNChsnyMZ4fBiZfQLwNydJaX23nX/qxp8j
liWuLDvIJgye14Ta2ULIP7YdRTxTEDkCggEAKkb7fqoFYE5Gxoql3k0rn92grrBo
UDzQoljRvTRUi4BD4f9l9dCy03jWw6+KaztsCpghQHkTfO9+ZebmPBBFNCi6Pvfs
YojnCQQw8LflYNqZcO4Yd/wfn79BjT0Ef5TaA6bZpKIbNbVfhTbR2OWaHtXnCcO9
mieHXvj6gsWUSVRDLXFzlUzkc3BP4Xxf7opRyggGZ+tgxSJqE8MIdqPykF1zV9XN
aDrUXPsAX+MuCXn4dfEQ1s++Tn7xdhmdSouHDJzc9iBPsasxYk8Q9JW/Vb3ljr+h
Fjw6dpbMSvMFVfnpxE8oWTkoeyWkV6hCpHj0wsfdHQBrn1J0zTG+kG3ImQ==
-----END RSA PRIVATE KEY-----`;
