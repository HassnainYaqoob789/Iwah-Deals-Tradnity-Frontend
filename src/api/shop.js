import * as url from '../constants/Endpoints'
import axios from 'axios'
import { objectToQueryString } from "../helper/urlquerystring";
import {
  toast
} from 'react-toastify';
import store from '../store';
import { getCartData, getWishlist, hblPayApi, removeWishlist, easypaisaPayApi } from '../actions';
import history from '../history';
var CryptoJS = require("crypto-js");
const check_login = localStorage.getItem("customerData");
const TIMEOUT = 100
export default {
  getProducts: (cb, categoryId = null, productId = null, setLoading, timeout) => {
    let apiUrl = url.temp_url + url.getnewProducts;
    // Agar category ID hai to URL mein add karein
    if (categoryId) {
      apiUrl += `&category_id=${categoryId}`;
    }

    // Agar productId bhi bhejni hai
    if (productId) {
      apiUrl += `&product_id=${productId}`;
    }

    if (document.querySelector(".loader-wrapper")) {
      document.querySelector(".loader-wrapper").style = "display: block";
    }
    getData(apiUrl)
      .then(async res => {
        let data = [];
        await res.data.data.map((d) => {

          var img = d.images[0].url
          var bas_img = d.images[0].small_image_url
          var pro_img = d.images[0].path ? img : bas_img
          var obj = {};
          obj.id = d.id;
          obj.name = d.name;
          obj.price = d.formated_price || d.formated_price;
          obj.discount = d.CampaignId;
          obj.features = d.Features;
          obj.pictures = pro_img;
          obj.shortDetails = d.short_description;
          obj.description = d.description;
          obj.stock = 1000;
          obj.new = true;
          obj.isfeatured = true;
          obj.category = (d.Category) ? d.Category : [];
          obj.country = 'Pakistan';
          obj.rating = 5;
          obj.api = d;
          obj.wishlist = d.is_wishlisted;
          obj.productCode = d.ProductCode;
          data.push(obj);
          return null
        });
        if (setLoading) setLoading(false);

        if (document.querySelector(".loader-wrapper")) {
          document.querySelector(".loader-wrapper").style = "display: none";
        }
        cb(data)
      })
      .catch(err => {
        if (setLoading) setLoading(false);

        console.error(err)
        if (document.querySelector(".loader-wrapper")) {
          document.querySelector(".loader-wrapper").style = "display: none";
        }
        // document.querySelector(".loader-wrapper").style = "display: none";

      })

  },

  // getProducts: (cb, categoryId = null) => {
  //   return new Promise((resolve, reject) => {
  //     let apiUrl = url.temp_url + url.getnewProducts;

  //     // Agar category ID hai to URL mein add karein
  //     if (categoryId) {
  //       apiUrl += `${categoryId}`;
  //     }

  //     // Show loader
  //     // if (document.querySelector(".loader-wrapper")) {
  //     //     document.querySelector(".loader-wrapper").style = "display: block";
  //     // }

  //     getData(apiUrl)
  //       .then(async res => {
  //         let data = [];

  //         // Check if response has data
  //         if (res.data && res.data.data) {
  //           await res.data.data.map((d) => {

  //             var img = d.images[0].url
  //             var bas_img = d.images[0].small_image_url
  //             var pro_img = d.images[0].path ? img : bas_img
  //             var obj = {};
  //             obj.id = d.id;
  //             obj.name = d.name;
  //             obj.price = d.formated_price || d.formated_price;
  //             obj.discount = d.CampaignId;
  //             obj.features = d.Features;
  //             obj.pictures = pro_img;
  //             obj.shortDetails = d.short_description;
  //             obj.description = d.description;
  //             obj.stock = 1000;
  //             obj.new = true;
  //             obj.isfeatured = true;
  //             obj.category = (d.Category) ? d.Category : [];
  //             obj.country = 'Pakistan';
  //             obj.rating = 5;
  //             obj.api = d;
  //             obj.wishlist = d.is_wishlisted;
  //             obj.productCode = d.ProductCode;
  //             data.push(obj);
  //             return null
  //           });
  //         }

  //         // Hide loader
  //         // if (document.querySelector(".loader-wrapper")) {
  //         //     document.querySelector(".loader-wrapper").style = "display: none";
  //         // }

  //         console.log(`Fetched ${data.length} products`, categoryId ? `for category ${categoryId}` : ''); // Debug log

  //         cb(data);
  //         resolve(data);
  //       })
  //       .catch(err => {
  //         console.error("Error fetching products:", err);

  //         // Hide loader on error
  //         // if (document.querySelector(".loader-wrapper")) {
  //         //     document.querySelector(".loader-wrapper").style = "display: none";
  //         // }

  //         cb([]); // Empty array on error
  //         reject(err);
  //       });
  //   });
  // },

  CallEnginegetCategoryByProducts: (payload, cb) => {

    getData(
      url.base_url + url.catebyproductsroute + objectToQueryString(payload)
    )
      .then(async res => {
        // cb(res.data);
        let data = [];
        await res.data.data.map(d => {
          var img = url.temp_url + '' + d.images[0].path
          var bas_img = d.images[0].small_image_url
          var pro_img = d.images[0].path ? img : bas_img
          // var img = d.Image.split(",").map(e => {
          //   return url.base_url+e;
          // });
          var obj = {};
          obj.id = d.id;
          obj.name = d.name;
          obj.price = d.formated_price || d.formated_price;
          obj.discount = d.CampaignId;
          obj.features = d.Features;
          obj.pictures = pro_img;
          obj.shortDetails = d.short_description;
          obj.description = d.description;
          obj.DOTD = true;
          obj.stock = 1000;
          obj.new = true;
          obj.isfeatured = d.IsFeatured;
          obj.category = (d.Category) ? d.Category : [];
          obj.country = 'Pakistan';
          obj.rating = 5;
          obj.api = d;
          obj.wishlist = d.is_wishlisted;
          obj.productCode = d.ProductCode;
          data.push(obj);

          return null
        });
        cb(data)
      })
      .catch((err) => {
        cb(err?.response?.status);
      });
  },



  CallEnginegetAreas: (payload, cb) => {

    getData(
      url.base_url + url.areas
    )
      .then(async res => {
        cb(res.data);
      })
      .catch((err) => {
        cb(err?.response?.status);
      });
  },


  CallEngine_productByCollection3: (payload, cb) => {

    getData(
      url.base_url + url.productByCollection3_api + objectToQueryString(payload?.paramsObj || {})
    )
      .then(async res => {

        let data = [];
        await res.data.data.map((d) => {

          var img = d.images[0].url
          var bas_img = d.images[0].small_image_url
          var pro_img = d.images[0].path ? img : bas_img
          var obj = {};
          obj.id = d.id;
          obj.name = d.name;
          obj.price = d.formated_price || d.formated_price;
          obj.discount = d.CampaignId;
          obj.features = d.Features;
          obj.pictures = pro_img;
          obj.shortDetails = d.short_description;
          obj.description = d.description;
          obj.stock = 1000;
          obj.new = true;
          obj.isfeatured = true;
          obj.category = (d.Category) ? d.Category : [];
          obj.country = 'Pakistan';
          obj.rating = 5;
          obj.api = d;
          obj.wishlist = d.is_wishlisted;
          obj.productCode = d.ProductCode;
          data.push(obj);
          return null
        });
        if (payload?.setLoading) {
          payload.setLoading(false);
        }
        cb(data);
      })
      .catch((err) => {
        if (payload?.setLoading) {
          payload.setLoading(false);
        }
        cb(err?.response?.status);
      });
  },


  CallEngine_peopleViewedProduct: (payload, cb) => {

    getData(
      url.base_url + url.peopleViewProduct_api + objectToQueryString(payload?.paramsObj || {})
    )
      .then(async res => {
        let data = [];
        await res.data.data.map((d) => {
          var img = d.images[0].url
          var bas_img = d.images[0].small_image_url
          var pro_img = d.images[0].path ? img : bas_img
          var obj = {};
          obj.id = d.id;
          obj.name = d.name;
          obj.price = d.formated_price || d.formated_price;
          obj.discount = d.CampaignId;
          obj.features = d.Features;
          obj.pictures = pro_img;
          obj.shortDetails = d.short_description;
          obj.description = d.description;
          obj.stock = 1000;
          obj.new = true;
          obj.isfeatured = true;
          obj.category = (d.Category) ? d.Category : [];
          obj.country = 'Pakistan';
          obj.rating = 5;
          obj.api = d;
          obj.wishlist = d.is_wishlisted;
          obj.productCode = d.ProductCode;
          data.push(obj);
          return null
        });
        if (payload?.setLoading) {
          payload.setLoading(false);
        }
        cb(data);
      })
      .catch((err) => {
        if (payload?.setLoading) {
          payload.setLoading(false);
        }
        cb(err?.response?.status);
      });
  },






  buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT),
  getMenu: (cb, timeout) => {
    getData(url.temp_url + 'api/descendant-categories')
      .then(async res => {
        cb(res.data.data);
      })
      .catch(err => {
        toast.error('Some Error Occoured2', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          bodyClassName: 'toastStyle',
        });

        // document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  getSliderimages: (cb, timeout) => {
    getData(url.temp_url + "api/sliders?slider_for=web")
      .then(async res => {
        cb(res.data);
      })
      .catch(err => {

        console.warn(err)
      })

  },
  getHomebanner: (cb, timeout) => {
    getData(url.temp_url + url.getBanner + 'web_banner')
      .then(async res => {
        cb(res.data.data);
      })
      .catch(err => {
        toast.error('Some Error Occoured4', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          bodyClassName: 'toastStyle',
        });


      })
  },
  getOrigin: (cb, timeout) => {
  },
  postReviews: (payload, cb, timeout) => {
    postData(url.temp_url + url.postreviewsbyproductid + payload.product_id + "/create?token=true", payload)
      .then(res => {
        cb(res.data);
      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured5', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);


      })

  },
  stripeApi: (payload, cb, timeout) => {
    postData(url.temp_url + url.stripeApi, payload)
      .then(res => {
        cb(res.data);
      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured6', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  hblPayApi: (payload, cb, timeout) => {
    postData(url.temp_url + url.hblPayApi, payload)
      .then(res => {
        cb(res.data);
      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured6', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  easypaisaPayApi: (payload, cb, timeout) => {
    postData(url.temp_url + url.easypaisaPayApi, payload)
      .then(res => {
        cb(res.data);
      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured6', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  paypalApi: (payload, cb, timeout) => {
    postData(url.temp_url + url.paypalApi, payload)
      .then(res => {
        cb(res.data);
      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured7', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  postrefund: (payload, cb, timeout) => {
    postData(url.temp_url + url.returnorder, payload)
      .then(res => {
        cb(res.data);
      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured8', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  postCustsignup: (payload, cb, timeout) => {
    postData(url.temp_url + url.custSignUp, payload)
      .then(res => {
        var encrypt_data = CryptoJS.AES.encrypt(JSON.stringify(res.data.data.email), url.encrypt_code).toString();
        localStorage.setItem('RegisterUser', encrypt_data);
        cb(res.data);
      })
      .catch(error => {
        if (error && error.response && error.response.status === 422) {
          toast.success(error && error.response && error.response.data.errors.email[0], {
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
          toast.error('Some Error Occoured9', {
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
  },
  postCustsignIn: (payload, cb, timeout) => {
    var encrypt_reg = CryptoJS.AES.encrypt(JSON.stringify(payload.email), url.encrypt_code).toString();
    localStorage.setItem('RegisterUser', encrypt_reg);
    postData(url.temp_url + url.custSignIn, payload)
      .then(res => {
        if (res.data.status === 200) {
          var encrypt_data = CryptoJS.AES.encrypt(JSON.stringify(res.data), url.encrypt_code).toString();
          localStorage.setItem('customerData', encrypt_data);
        }
        store.dispatch(getCartData());
        window.location.reload()
        cb(res.data);
      })
      .catch(err => {
        toast.error('Some Error Occoured10', {
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


      })

  },
  postGooglesignIn: (payload, cb, timeout) => {
    var encrypt_reg = CryptoJS.AES.encrypt(JSON.stringify(payload.email), url.encrypt_code).toString();
    localStorage.setItem('RegisterUser', encrypt_reg);
    postData(url.temp_url + url.GoogleSignIn, payload)

      .then(res => {

        if (res.status === 200) {
          var encrypt_data = CryptoJS.AES.encrypt(JSON.stringify(res.data), url.encrypt_code).toString();
          localStorage.setItem('customerData', encrypt_data);
        }
        cb(res);
      })
      .catch(err => {
        toast.error('Some Error Occoured11', {
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



      })
  },
  postFacebookSignIn: (payload, cb, timeout) => {
    var encrypt_reg = CryptoJS.AES.encrypt(JSON.stringify(payload.email), url.encrypt_code).toString();
    localStorage.setItem('RegisterUser', encrypt_reg);
    postData(url.temp_url + url.FacebookSignIn, payload)

      .then(res => {
        if (res.data.status === 200) {
          var encrypt_data = CryptoJS.AES.encrypt(JSON.stringify(res.data), url.encrypt_code).toString();
          localStorage.setItem('customerData', encrypt_data);
        }
        cb(res);
      })
      .catch(err => {
        toast.error('Some Error Occoured12', {
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



      })

  },
  getDeals: (cb) => {
    getData(url.temp_url + url.getfeaturedProducts)
      .then(async res => {
        let data = [];
        await res.data.data.map(d => {
          var img = url.temp_url + '' + d.images[0].path
          var bas_img = d.images[0].small_image_url
          var pro_img = d.images[0].path ? img : bas_img
          // var img = d.Image.split(",").map(e => {
          //   return url.base_url+e;
          // });
          var obj = {};
          obj.id = d.id;
          obj.name = d.name;
          obj.price = d.formated_price || d.formated_price;
          obj.discount = d.CampaignId;
          obj.features = d.Features;
          obj.pictures = pro_img;
          obj.shortDetails = d.short_description;
          obj.description = d.description;
          obj.DOTD = true;
          obj.stock = 1000;
          obj.new = true;
          obj.isfeatured = d.IsFeatured;
          obj.category = (d.Category) ? d.Category : [];
          obj.country = 'Pakistan';
          obj.rating = 5;
          obj.api = d;
          obj.wishlist = d.is_wishlisted;
          obj.productCode = d.ProductCode;
          data.push(obj);

          return null
        });
        cb(data)
      })
      .catch(err => {
        //   toast.error('Some Error Occoured13', {
        //     position: "top-right",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: false,
        //     draggable: true,
        //     progress: undefined,
        //     bodyClassName: 'toastStyle',
        // });    

        console.warn(err)
      })
  },


  getNewDeals: (cb) => {
    getData(url.temp_url + url.getnewestProducts)
      .then(async res => {
        let data = [];
        await res.data.data.map(d => {
          var img = url.temp_url + '' + d.images[0].path
          var bas_img = d.images[0].small_image_url
          var pro_img = d.images[0].path ? img : bas_img
          // var img = d.Image.split(",").map(e => {
          //   return url.base_url+e;
          // });
          var obj = {};
          obj.id = d.id;
          obj.name = d.name;
          obj.price = d.formated_price || d.formated_price;
          obj.discount = d.CampaignId;
          obj.features = d.Features;
          obj.pictures = pro_img;
          obj.shortDetails = d.short_description;
          obj.description = d.description;
          obj.DOTD = true;
          obj.stock = 1000;
          obj.new = true;
          obj.isfeatured = d.IsFeatured;
          obj.category = (d.Category) ? d.Category : [];
          obj.country = 'Pakistan';
          obj.rating = 5;
          obj.api = d;
          obj.wishlist = d.is_wishlisted;
          obj.productCode = d.ProductCode;
          data.push(obj);

          return null
        });
        cb(data)
      })
      .catch(err => {
        //   toast.error('Some Error Occoured13', {
        //     position: "top-right",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: false,
        //     draggable: true,
        //     progress: undefined,
        //     bodyClassName: 'toastStyle',
        // });    

        console.warn(err)
      })
  },


  getProductCategory: (cb) => {
    getData(url.temp_url + url.product_category).then(async d => {
      cb(d.data);
    })
      .catch(err => {
        toast.error('Some Error Occoured14', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          bodyClassName: 'toastStyle',
        });

        // document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  getAppConfig: (cb) => {
    getData(url.temp_url + url.appConfig).then(async d => {
      cb(d.data);
    })
      .catch(err => {
        console.warn(err)
      })
  },
  getLogout: (cb) => {
    getData(url.temp_url + url.logout).then(async d => {
      cb(d.data);
    })
      .catch(err => {


        console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  postAddAddress: (payload, cb, timeout) => {
    postData(url.temp_url + url.addAddress, payload)
      .then(async res => {
        cb(res.data);
      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured16', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  getcustomer: (cb) => {
    getData(url.temp_url + url.getcustomer).then(async d => {
      cb(d.data);
    })
      .catch(err => {

        console.warn(err);

      })
  },
  getAddress: (cb) => {
    getData(url.temp_url + url.getAddress).then(async d => {
      cb(d.data);
    })
      .catch(err => {

        console.warn(err);


      })
  },
  getSocialLink: (cb) => {
    getData(url.temp_url + url.getSociallink).then(async d => {
      cb(d.data);
    })
      .catch(err => {
        console.warn(err);


      })
  },
  getWishlist: (cb) => {
    getData(url.temp_url + url.getWishlist).then(async d => {
      cb(d.data);
    })
      .catch(err => {

        console.warn(err);

      })
  },

  getreviews: (product_id, cb, timeout) => {
    getData(url.temp_url + url.reviewsbyproductid + '?product_id=' + product_id)
      .then(async res => {
        cb(res.data);
      })
      .catch(err => {

        console.warn(err);


      })
  },
  getpages: (product_id, cb, timeout) => {
    getData(url.temp_url + url.getPages)
      .then(async res => {
        cb(res.data);
      })
      .catch(err => {
        console.warn(err);


      })
  },
  getOrders: (cb) => {
    getData(url.temp_url + url.MyOrders).then(async d => {
      cb(d.data);
    })
      .catch(err => {

        console.warn(err);

        // document.querySelector(".loader-wrapper").style = "display: none";

      })

  },
  getMainScreenText: (cb) => {
    getData(url.temp_url + url.mainScreenText).then(async d => {
      cb(d.data);
    })
      .catch(err => {

        console.warn(err);

        // document.querySelector(".loader-wrapper").style = "display: none";

      })

  },
  getFooterIcons: (cb) => {
    getData(url.temp_url + url.footerIcons).then(async d => {
      cb(d.data);
    })
      .catch(err => {

        console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })

  },
  getCurrencies: (cb) => {
    getData(url.temp_url + url.currencies).then(async d => {
      cb(d.data);
    })
      .catch(err => {

        console.warn(err);

        // document.querySelector(".loader-wrapper").style = "display: none";

      })

  },

  getChangeCurrences: (dss) => {
    getData(url.temp_url + url.ChangeCurrences).then(async de => {
      dss(de.data);
    })
      .catch(err => {

        console.warn(err);


      })
  },

  deleteaddress: (address_id, cb, timeout) => {
    removeData(url.temp_url + url.DeleteAddress + address_id + "?token=true")
      .then(async res => {
        cb(res.data);
      })
      .catch(err => {


        console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },

  getCartData: (cb) => {
    getData(url.temp_url + url.getCart).then(async d => {
      cb(d.data);
    })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured25', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);


      })
  },
  forgetotpsend: (payload, cb, timeout) => {
    postData(url.temp_url + url.forgetsendotp, payload).then(async d => {

      if (d.data.status === 200) {
        var CryptoJS = require("crypto-js");
        var encrypt_reg = CryptoJS.AES.encrypt(JSON.stringify(payload), url.encrypt_code).toString();
        localStorage.setItem('ForgetPasswordUser', encrypt_reg);
      };
      cb(d.data);
    })
      .catch(err => {
        toast.error('Some Error Occoured26', {
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

      })
  },
  sendfcp_token: (payload, cb, timeout) => {
    postData(url.temp_url + url.FCPtoken, payload).then(async d => {
      cb(d.data);
    })
      .catch(err => {
        toast.error('Some Error Occoured27', {
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

      })
  },
  sendSubscriberEmail: (payload, cb, timeout) => {
    postData(url.temp_url + url.SubcriberEmail, payload).then(async d => {
      cb(d.data);
    })
      .catch(err => {


        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  updateaddress: (payload, cb, timeout) => {
    getputData(url.temp_url + url.getAddressbyid + payload)
      .then(async res => {
        cb(res.data);
      }).catch(err => {
        console.warn(err);
        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  getaddressbyid: (address_id, cb, timeout) => {
    getData(url.temp_url + url.getAddressbyid + address_id + "?token=true")
      .then(async res => {
        cb(res.data);
      }).catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured30', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  forgetverifyotp: (payload, cb, timeout) => {
    postData(url.temp_url + url.forgetOTPerify, payload).then(async d => {
      cb(d.data);
    })
      .catch(err => {
        toast.error('Some Error Occoured31', {
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

      })
  },
  forgetNewPassword: (payload, cb, timeout) => {
    postData(url.temp_url + url.forgetnewpasword, payload).then(async d => {
      cb(d.data);
    })
      .catch(err => {
        toast.error('Some Error Occoured32', {
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

      })
  },
  postContact: (payload, cb, timeout) => {
    postData(url.temp_url + url.placeContact, payload)
      .then(async res => {
        cb(res.data)
      })
      .catch(err => {
        toast.error('Some Error Occoured33', {
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

      })

  },
  addItemToCart: (payload, cb, timeout) => {
    let token = (check_login !== null) ? '?token=true' : '';
    postData(url.temp_url + url.addcartitem + payload.product_id + token, payload)
      .then(res => {
        cb(res.data);
      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured34', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  addWGItemToCart: (payload, cb, timeout) => {
    let token = (check_login !== null) ? '?token=true' : '';
    store.dispatch(removeWishlist(payload?.product_id))
    postData(url.temp_url + url.addcartitem + payload.product_id + token, payload)
      .then(res => {
        cb(res.data);
        // console.log(payload?.product_id);
      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured34', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  removeWishlistItem: (payload, cb, timeout) => {
    getData(url.temp_url + url.removeWishlist + payload + '?token=true')
      .then(async res => {
        cb(res.data);
      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured35', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  removecartitem: (payload, cb, timeout) => {
    let full_url = (check_login !== null) ? url.temp_url + url.deletecartitem + payload + '?token=true' : url.temp_url + url.deletecartitem + payload
    getData(full_url)
      .then(async res => {
        cb(res.data);
        document.querySelector(".loader-wrapper").style = "display: none";

      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured36', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  updatecart: (payload, cb, timeout) => {
    let full_url = (check_login !== null) ? url.temp_url + url.cartUpdate + '?token=true' + payload : url.temp_url + url.cartUpdate + payload
    getputData(full_url)
      .then(res => {
        cb(res.data);
        document.querySelector(".loader-wrapper").style = "display: none";

      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured37', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  verifyOtp: (payload, cb, timeout) => {
    postData(url.temp_url + url.verfiyotp, payload)
      .then(res => {
        cb(res.data);
      })
      .catch(err => {
        toast.error('Some Error Occoured38', {
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

      })
  },
  leopardTracking: (payload, cb, timeout) => {
    postData(url.temp_url + url.leapardTracking, payload)
      .then(res => {
        cb(res.data);

      })
      .catch(err => {
        toast.error('Some Error Occoured38', {
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

      })
  },
  reOrder: (payload, cb, timeout) => {
    postData(url.temp_url + url.Reorder + payload + '?token=true')
      .then(res => {
        cb(res.data);
      })
      .catch(err => {
        toast.error('Some Error Occoured39', {
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

      })
  },
  updateProfile: (payload, cb, timeout) => {
    postData(url.temp_url + url.updateProfile, payload)
      .then(res => {
        cb(res.data);
      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured40', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  resendOtp: (payload, cb, timeout) => {
    postData(url.temp_url + url.sendOtp, payload)
      .then(res => {
        cb(res.data);
      })
      .catch(err => {
        toast.error('Some Error Occoured41', {
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

      })
  },
  getorderdetails: (payload, cb, timeout) => {
    let token = (check_login !== null) ? '?token=true' : '';
    getData(url.temp_url + url.getOrderDetail + token, payload)
      .then(async res => {
        cb(res.data);
        history.push(`${process.env.PUBLIC_URL}/viewDetails`)
        document.querySelector(".loader-wrapper").style = "display: none";

      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        //   decryptedData ?
        //   toast.error('Some Error Occoured42', {
        //     position: "top-right",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: false,
        //     draggable: true,
        //     progress: undefined,
        //     bodyClassName: 'toastStyle',
        // })
        // :
        console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  CancelOrder: (payload, cb, timeout) => {

    postData(url.temp_url + url.orderCancel + payload + `?token=true&currency=${localStorage.getItem("changeCurrencies")
      ? localStorage.getItem("changeCurrencies")
      : localStorage.getItem("defaultDataaa")
      }`)
      .then(async res => {
        cb(res.data);
      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured43', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })

  },
  ChangePassword: (payload, cb, timeout) => {
    postData(url.temp_url + url.changePassword, payload)
      .then(res => {
        cb(res.data);
      })
      .catch(err => {
        toast.error('Some Error Occoured44', {
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

      })
  },
  saveAddrestocart: (payload, cb, timeout) => {
    postData(url.temp_url + url.saveAddress, payload)
      .then(res => {
        localStorage.setItem('shipping-rates', JSON.stringify(res.data.data.rate));
        cb(res.data);
      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured45', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  saveShipping: (payload, cb, timeout) => {
    postData(url.temp_url + url.saveshipping, payload)
      .then(res => {
        var encrypt_data = CryptoJS.AES.encrypt(JSON.stringify(res.data.data.methods), url.encrypt_code).toString();
        localStorage.setItem('PaymentMe', encrypt_data);
        cb(res.data);
      })
      .catch(err => {
        toast.error('Some Error Occoured46', {
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

      })
  },
  saveOrder: (payload, cb, timeout) => {
    postData(url.temp_url + url.saveorder, payload)
      .then(res => {
        localStorage.setItem('Order-numbessr', JSON.stringify(res));
        localStorage.setItem('Order-number', JSON.stringify(res.data.order));
        localStorage.setItem('OrderId', JSON.stringify(res.data.order.id));

        document.querySelector(".loader-wrapper").style = "display: none";

        cb(res.data);
      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured47', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  codsaveOrder: (payload, cb, timeout) => {
    postData(url.temp_url + url.saveorder, payload)
      .then(res => {
        localStorage.setItem('Order-numbessr', JSON.stringify(res));
        localStorage.setItem('Order-number', JSON.stringify(res.data.order));
        localStorage.setItem('OrderId', JSON.stringify(res.data.order.id));
        document.querySelector(".loader-wrapper").style = "display: none";
        window.location.replace("/orderNumber")

        cb(res.data);
      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured47', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  hblsaveOrder: (payload, cb, timeout) => {
    postData(url.temp_url + url.saveorder, payload)
      .then(res => {
        localStorage.setItem('Order-numbessr', JSON.stringify(res));
        localStorage.setItem('Order-number', JSON.stringify(res.data.order));
        localStorage.setItem('OrderId', JSON.stringify(res.data.order.id));
        store.dispatch(hblPayApi({ "order_id": res?.data?.order?.id }));
        cb(res.data);
        store.dispatch(getCartData());

      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured47', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  easypaisasaveOrder: (payload, cb, timeout) => {
    postData(url.temp_url + url.saveorder, payload)
      .then(res => {
        localStorage.setItem('Order-numbessr', JSON.stringify(res));
        localStorage.setItem('Order-number', JSON.stringify(res.data.order));
        localStorage.setItem('OrderId', JSON.stringify(res.data.order.id));
        store.dispatch(easypaisaPayApi({ "order_id": res?.data?.order?.id }));
        cb(res.data);
        store.dispatch(getCartData());

      })
      .catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured47', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  applyCoupan: (payload, cb, timeout) => {
    postData(url.temp_url + url.applyCoupan, payload)
      .then(res => {
        cb(res.data);
      }).catch(err => {
        toast.error('Some Error Occoured48', {
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

      })
  },
  removeCoupan: (payload, cb, timeout) => {
    removeData(url.temp_url + url.removeCoupan)
      .then(res => {
        cb(res.data);
      }).catch(err => {
        toast.error('Some Error Occoured49', {
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

      })
  },
  savePayment: (payload, cb, timeout) => {
    postData(url.temp_url + url.savepayment, payload)
      .then(res => {
        cb(res.data);
      }).catch(err => {

        const decryptedData = localStorage.getItem("customerData")
        decryptedData ?
          toast.error('Some Error Occoured50', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            bodyClassName: 'toastStyle',
          })
          :
          console.warn(err);

        document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  movetocart: (payload, cb, timeout) => {
    getData(url.temp_url + url.movetocart + payload + '?token=true')
      .then(async res => {
        cb(res.data);
        store.dispatch(getCartData());
        store.dispatch(getWishlist());
      }).catch(err => {
        toast.error('Some Error Occoured51', {
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

      })
  },
  getContactDetail: (cb) => {
    getData(url.temp_url + url.getContactDetails)
      .then(async res => {
        cb(res.data);
      }).catch(err => {
        //   toast.error('Some Error Occoured52', {
        //     position: "top-right",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: false,
        //     draggable: true,
        //     progress: undefined,
        //     bodyClassName: 'toastStyle',
        // });    
        console.warn(err)
        // document.querySelector(".loader-wrapper").style = "display: none";

      })
  },
  getSocialIcon: (cb) => {
    getData(url.temp_url + url.getsocialicons)
      .then(async res => {
        cb(res.data);
      }).catch(err => {
        console.warn(err);



      })
  },
  getfetchSideDetails: (cb) => {
    getData(url.temp_url + url.sideDetails)
      .then(async res => {
        cb(res.data);
      }).catch(err => {
        console.warn(err);


      })
  },
  getDealsBanner: (cb, timeout) => {
    getData(url.temp_url + url.getBanner + "banner")
      .then(async res => {
        cb(res.data);
      }).catch(err => {
        console.warn(err);


      })
  },
  getBestSeller: (cb, timeout) => {
    getData(url.temp_url + url.getBestSeller)
      .then(async res => {
        cb(res.data);
      }).catch(err => {

        console.warn(err)

      })
  },
}
function getData(URL) {
  const decryptedData = localStorage.getItem("customerData");
  if (decryptedData) {
    var bytes = CryptoJS.AES.decrypt(decryptedData, url.encrypt_code);
    var getData = bytes.toString(CryptoJS.enc.Utf8);
  } else {
    getData = null
  }
  if (getData !== null) {
    const Data = JSON.parse(getData);
    const token = (Data != null) ? Data.token : '';
    axios.defaults.headers.common = {
      'Authorization': `bearer ${token}`
    }
  }
  return axios.get(URL);
}
function removeData(URL, data) {
  const decryptedData = localStorage.getItem("customerData");
  if (decryptedData) {
    var bytes = CryptoJS.AES.decrypt(decryptedData, url.encrypt_code);
    var getData = bytes.toString(CryptoJS.enc.Utf8);
  } else {
    getData = null
  }
  if (getData !== null) {
    const Data = JSON.parse(getData);
    const token = (Data != null) ? Data.token : '';
    axios.defaults.headers.common = {
      'Authorization': `bearer ${token}`
    }
  }
  return axios.delete(URL);
}
function postData(URL, data) {
  const decryptedData = localStorage.getItem("customerData");
  if (decryptedData) {
    var bytes = CryptoJS.AES.decrypt(decryptedData, url.encrypt_code);
    var getData = bytes.toString(CryptoJS.enc.Utf8);
  } else {
    getData = null
  }
  if (getData !== null) {
    const Data = JSON.parse(getData);
    const token = (Data != null) ? Data.token : null;
    axios.defaults.headers.common = {
      'Authorization': `bearer ${token}`
    }
  }
  let result = axios.post(URL, data);
  return result;
}
// function httpGet(theUrl) {
//   var xmlHttp = new XMLHttpRequest();
//   xmlHttp.open("POST", theUrl, false); // false for synchronous request
//   xmlHttp.send(null);
//   return xmlHttp.responseText;
// }
// function getDataParam(URL, data) {
//   return axios.get(URL, {
//     params: data
//   });
// }
function getputData(URL) {
  const decryptedData = localStorage.getItem("customerData");
  if (decryptedData) {
    var bytes = CryptoJS.AES.decrypt(decryptedData, url.encrypt_code);
    var getData = bytes.toString(CryptoJS.enc.Utf8);
  } else {
    getData = null
  }
  if (getData !== null) {
    const Data = JSON.parse(getData);
    const token = (Data != null) ? Data.token : null;
    axios.defaults.headers.common = {
      'Authorization': `bearer ${token}`
    }
  }
  return axios.put(URL);
}