import * as url from '../constants/Endpoints'
export const getBrands = (products) => {
    var uniqueBrands = [];
  
    products.map((product) => {
        if (uniqueBrands.indexOf(product.category) === -1) {
            uniqueBrands.push(product.category);
        }
    })
 
    return uniqueBrands;
}

export const getColors = (products) => {
    var uniqueColors = [];
    products.map((product) => {
        if(product.colors) {
            product.colors.map((color) => {
                if (uniqueColors.indexOf(color) === -1) {
                    uniqueColors.push(color);
                }
            })
        }
    })
  
    return uniqueColors;
}

// Get Minimum and Maximum Prices from Json Data
export const getMinMaxPrice = (products,country) => {
    let min = 100, max = 400;

    products.filter(function (product) {
        return product.country === country;
      }).map((product) => {
        let v = product.price;
        min = (v < min) ? v : min;
        max = (v > max) ? v : max;
    })

    return {'min':min, 'max':max};
}

export const getVisibleproducts = (data, { brand, color, value, sortBy, country,search },issearch=false) => {
  
    return data.products.filter(product => {

 

        let brandMatch;
        if(product.category){
            brandMatch = brand.includes(product.category);
           
        }else{
            brandMatch = true;
        }
          
 
            

        let colorMatch;
        if(color && product.colors) {
            colorMatch = product.colors.includes(color)
        }else{
            colorMatch = true;
        }
  
        let cntry; 

        if(product.country === country){
           
            cntry= true;
           
        }else{
            cntry = false;
        }
        
        if(search && issearch){
          
            var name =  product.name.toLowerCase();
            return name.includes(search.toLowerCase()) && cntry;
            
        }
        
        const startPriceMatch = typeof value.min !== 'number' || value.min <= product.price;
        const endPriceMatch = typeof value.max !== 'number' || product.price <= value.max;

        return brandMatch && colorMatch && startPriceMatch && endPriceMatch && cntry;
    }).sort((product1, product2) => {
        if (sortBy === 'HighToLow') {
            return product2.price < product1.price ? -1 : 1;
        } else if (sortBy === 'LowToHigh') {
            return product2.price > product1.price ? -1 : 1;
        } else if (sortBy === 'Newest') {
            return product2.id < product1.id ? -1 : 1;
        } else if (sortBy === 'AscOrder') {
            return product1.name.localeCompare(product2.name);
        } else if (sortBy === 'DescOrder') {
            return product2.name.localeCompare(product1.name);
        } else{
            return product2.id > product1.id ? -1 : 1;
        }
    });
}

export const getCartTotal = cartItems => {
    var total = 0;
    for(var i=0; i<cartItems.length; i++){
        total += parseFloat((cartItems[i].sum), 10);
    }
    return total.toFixed(2);
}
export const getVatTotal = (vat,cartItems) => {
    var total = 0;
    for(var i=0; i<cartItems.length; i++){
        total += parseInt(cartItems[i].qty, 10)*parseInt((cartItems[i].sum), 10);
    }
    return total;
}

export const getTotalDiscount = cartItems => {
    var total = 0;
    for(var i=0; i<cartItems.length; i++){
        total += parseFloat((cartItems[i].applieddiscount), 10);
    }
    return total.toFixed(2);
}
export const  getAppliedVAT =(vat,subtotal,shipping,discount = null) =>{


   if(subtotal > shipping.Limit){

    let total = parseInt(subtotal);
     let appliedvat =  (total*vat)/100;
     let ordertotal = parseFloat(subtotal)+parseFloat(appliedvat);
     let ordertotalwitoutVAT =  parseFloat(subtotal);
     let totalwithalldiscount = (appliedvat*discount.Discount/100).toFixed(2);
     return {
         vat:vat,
         appliedvat:appliedvat,
         total:total,
         ordertotal:ordertotal,
         ordertotalwitoutVAT:ordertotalwitoutVAT,
         totalwithalldiscount:totalwithalldiscount
     }
   }else{
    let total = parseInt(subtotal)+parseInt(shipping.Value);
     let appliedvat =  (total*vat)/100;
     let ordertotal = parseFloat(subtotal)+parseFloat(shipping.Value)+parseFloat(appliedvat);
     let ordertotalwitoutVAT =  parseFloat(subtotal);
     let totalwithalldiscount = (appliedvat*discount.Discount/100).toFixed(2);
     return {
         vat:vat,
         appliedvat:appliedvat,
         total:total,
         ordertotal:ordertotal,
         ordertotalwitoutVAT:ordertotalwitoutVAT,
         totalwithalldiscount:totalwithalldiscount
     }
   }
    
 
}
// Get Trending Tag wise Collection
export const getTrendingTagCollection = (products, type, tag) => {
    const items = products.filter(product => {
        return product.category === type && product.tags.includes(tag);
    })
    return items.slice(0,8)
}

// Get Trending Collection
export const getTrendingCollection = (products, category) => {
 
    let items = products.filter(product => {
        let decision =  (product?.api?.Category.length !== 0) ? product.api.Category.find(datas => (datas.name == category))  : null;
        if(decision?.name == category){
            
            return decision;
        }
    })
        if(items.length === 0){
            items = products;
        }
    return items.slice((items.length > 8 ) ? items.length - 8 : 0,items.length)
}


// Get Special 5 Collection
export const getSpecialCollection = (products, type) => {
    const items = products.filter(product => {
        return product.category === type;
    })
    return items.slice(0,5)
}

// Get TOP Collection
export const getTopCollection = (products) => {
    const items = products.filter(product => {
        return (product?.api?.reviews?.average_rating > 4.0) ? product?.api?.reviews?.average_rating > 4.0 : product?.api?.reviews?.average_rating > 3.0 ? product?.api?.reviews?.average_rating > 3.0 : product?.api?.reviews?.average_rating > 2.0 ? product?.api?.reviews?.average_rating > 2.0 : product?.api?.reviews?.average_rating > 1.0 ? product?.api?.reviews?.average_rating > 1.0 : product?.api?.reviews?.average_rating;
    })
    return items.slice(0,8)
}

// Get New Products
export const getNewProducts = (products, type,filter) => {

    const items = products.filter(product => {
   
        return product[type] === true && product.country === filter.country;
    })

    return items.slice(0,8)
}
export const getBestSeller = (bestseller , filter)=>{
 
    let data = [] ;
    bestseller.map(d =>{
        var img = d.Image.split(",").map(e => {
          return url.base_url+e;
        });

          var obj = {}; 
          obj.id = d.Id;
          obj.name = d.Name;
          obj.price =  d.UAEPrice|| d.Price;
          obj.discount = d.CampaignId;
          obj.features = d.Features;
          obj.pictures = img;
          obj.shortDetails = d.Feature;
          obj.description = d.Description;
          obj.stock = 16;
          obj.new = d.IsNew;
          obj.isfeatured = d.IsFeatured;
          obj.category = d.Category;
          obj.country = d.Country;
          obj.rating = 5;
          obj.productCode = d.ProductCode;
              data.push(obj);
      });

    return data.slice(0,8)
}

// Get Related Items
export const getRelatedItems = (products, type,country = "Pakistan") => {
    const items = products.filter(product => {
     
        return product.category === type;
    })

    return items.slice(0,4)

}

// Get Best Seller Furniture
export const getBestSellerProducts = (products, type) => {
    const items = products.filter(product => {
        return product.sale === true && product.category === type;
    })

    return items.slice(0,8)
}

// Get Best Seller


// Get Mens Wear
export const getMensWear = products => {
    const items = products.filter(product => {
        return product.category === 'men';
    })

    return items.slice(0,8)
}

// Get Womens Wear
export const getWomensWear = products => {
    const items = products.filter(product => {
        return product.category === 'women';
    })

    return items.slice(0,8)
}

// Get Single Product
export const getSingleItem = (products, id) => {

    const items = products.find((element) => {
        return element.id === id;
    })
    return items;
}

// Get Feature Products
export const getFeatureImages = (products, type) => {

    const items = products.filter(product => {
        return product.type === type;
    })
    return items;
}


export const getCategory = (hay, needle) => {

    const items =  hay.filter(h => {
        return h.Name === needle;
    })
    return items;
}

// export const getDeals = (data, needle, { brand, color, value, sortBy, country,search }) =>{
//     var dt = data.deals.filter(product => {

//        let DOTD;

//         if(needle !== ""){
           
//                DOTD = product.DOTD === true && country === country; 
//              }
//           else{
//               DOTD = product.DOTD === false && country === country; 
             
//           }
      
     
      
      
      
      
      
      
      
      
      
      
    
//         let brandMatch;
//         if(product.category)
//             brandMatch = brand.includes(product.category)
//         else
//             brandMatch = true;

//         let colorMatch;
//         if(color && product.colors) {
//             colorMatch = product.colors.includes(color)
//         }else{
//             colorMatch = true;
//         }
  
//         let cntry; 

//         if(product.country === country){
  
//             cntry= true;
           
//         }else{
//             cntry = false;
//         }


//         return brandMatch && colorMatch  && cntry && DOTD;



//     }).sort((product1, product2) => {
//         if (sortBy === 'HighToLow') {
//             return product2.price < product1.price ? -1 : 1;
//         } else if (sortBy === 'LowToHigh') {
//             return product2.price > product1.price ? -1 : 1;
//         } else if (sortBy === 'Newest') {
//             return product2.id < product1.id ? -1 : 1;
//         } else if (sortBy === 'AscOrder') {
//             return product1.name.localeCompare(product2.name);
//         } else if (sortBy === 'DescOrder') {
//             return product2.name.localeCompare(product1.name);
//         } else{
//             return product2.id > product1.id ? -1 : 1;
//         }
//     });

//     var paginated = dt.reduce((resultArray, item, index) => { 
//         const chunkIndex = Math.floor(index/20)
      
//         if(!resultArray[chunkIndex]) {
//           resultArray[chunkIndex] = [] // start a new chunk
//         }
      
//         resultArray[chunkIndex].push(item)
      
//         return resultArray
//       }, []);

     
//     return paginated;

// }

export const getHomebanner = (data,country) =>{
    return data.filter(product => {
 
       return product.Country === country
      });
}






export const getProducts = (data, { brand, color, value, sortBy, country,search },issearch=false) => {
  
    var dt =  data.products.filter(product => {

 

        let brandMatch;
        if(product.category){
            brandMatch = brand.includes(product.category);
           
        }else{
            brandMatch = true;
        }
          
 
            

        let colorMatch;
        if(color && product.colors) {
            colorMatch = product.colors.includes(color)
        }else{
            colorMatch = true;
        }
  
        let cntry; 

        if(product.country === country){
           
            cntry= true;
           
        }else{
            cntry = false;
        }
        
        if(search && issearch){
          
            var name =  product.name.toLowerCase();
            return name.includes(search.toLowerCase()) && cntry;
            
        }
        
        const startPriceMatch = typeof value.min !== 'number' || value.min <= product.price;
        const endPriceMatch = typeof value.max !== 'number' || product.price <= value.max;

        return brandMatch && colorMatch && startPriceMatch && endPriceMatch && cntry;
    }).sort((product1, product2) => {
        if (sortBy === 'HighToLow') {
            return product2.price < product1.price ? -1 : 1;
        } else if (sortBy === 'LowToHigh') {
            return product2.price > product1.price ? -1 : 1;
        } else if (sortBy === 'Newest') {
            return product2.id < product1.id ? -1 : 1;
        } else if (sortBy === 'AscOrder') {
            return product1.name.localeCompare(product2.name);
        } else if (sortBy === 'DescOrder') {
            return product2.name.localeCompare(product1.name);
        } else{
            return product2.id > product1.id ? -1 : 1;
        }
    });


    var paginated = dt.reduce((resultArray, item, index) => { 
        const chunkIndex = Math.floor(index/20)
      
        if(!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [] // start a new chunk
        }
      
        resultArray[chunkIndex].push(item)
      
        return resultArray
      }, []);

     
    return paginated;
}

