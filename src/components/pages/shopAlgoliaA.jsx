/* eslint react/prop-types: 0 */

import React from 'react';
import { createConnector } from 'react-instantsearch';
import { filterBrand, filterColor, filterPrice, addItemToCart, removeWishlist } from '../../actions'
import {
  InstantSearch,
  SearchBox,
  RefinementList,
  Stats,
  Pagination,
  Hits,
} from 'react-instantsearch/dom';
import { withUrlSync } from './urlSync';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../store';
import Heart from 'react-heart';
import algoliasearch from 'algoliasearch/lite';
import { useState } from 'react';
import { useEffect } from 'react';
import ShopPage from './shopPage';
import EmptySearch from '../../svg_code/emptySearch';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const ShopAlgoliaA = props => {

  let arr = []

  document.querySelector(".loader-wrapper").style = "display: block";





  function addItemTOCart(e) {
    document.querySelector(".loader-wrapper").style = "display: block";
    var item = { 'product_id': e, 'quantity': 1 }
    store.dispatch(addItemToCart(item));
  }



  const searchClient = algoliasearch(
    'CRPIU963YE',
    '2f6cd2c6276c8b4c242d253733882492'
  );



  const RightColumn = () => {



    return (
      <>

        {/* <div id="left-column">
      <Sidebar />
    </div> */}
        <div id="right-column">
          <div className="info my-3">
            <Stats />

            {/* <SortBy
        defaultRefinement="instant_search"
        items={[
          { value: 'instant_search', label: 'Most Relevant' },
          { value: 'instant_search_price_asc', label: 'Lowest Price' },
          { value: 'instant_search_price_desc', label: 'Highest Price' },
        ]}
      />
       */}
          </div>
          <Hits hitComponent={Hit} />
          <div id="pagination" style={{ margin: "4rem 0px" }} className='my-5'>
            <Pagination showLast />
          </div>
        </div>
      </>
    )
  };

  const Content = createConnector({
    displayName: 'ConditionalResults',
    getProvidedProps(props, searchState, searchResults) {
      const noResults = searchResults.results
        ? searchResults.results.nbHits === 0
        : false;
      return { query: searchState.query, noResults };
    },
  })
    ((
      { noResults, query }
    ) => {

      const rightColumn = noResults
        ?
        <div className="text-center my-4">
          <EmptySearch />
          <br />

          <span className='fs-5 my-3'>Nothing Found!</span>
        </div>
        //  <div id="no-results-message">
        // <p className='my-5' style={{fontWeight:"bold"}}>
        // We didn't find any results for the search <em>{query}</em>.
        // </p>
        // </div>
        :
        <RightColumn />;
      return (
        <div>
          <div
            //  className={noResults ? 'no-results' : ''}
            id="left-column">
            <h5>Category</h5>
            <RefinementList attribute="categories" />
            {/* <h5>Brand</h5>
        <RefinementList
          attribute="brand"
          withSearchBox
          translations={{ noResults: 'No matching brand' }}
        /> */}
            {/* <h5>Price</h5> */}
            {/* <ConnectedRange attribute="price" /> */}
            <h5>Price</h5>
            <RefinementList withSearchBox limit={6} attribute="min_price" />
            {/* <h5>Type</h5>
        <Menu attribute="type" /> */}

          </div>
          {/* <RightColumn /> */}
          {rightColumn}
        </div>
      );
    });


  // Sample
  // const Range = ({ min, max, currentRefinement, refine }) => {
  //   const onChange = (values) => {
  //     console.log(values)
  //     refine({ min: values[0], max: values[1] });
  //   };

  //   return (
  //     <div>
  //       <p className="text-gray-200 pb-4">
  //         Price from ({currentRefinement.min}) to ({currentRefinement.max})$
  //       </p>
  //       <Slider
  //         range
  //         min={min}
  //         max={max}
  //         step={0.01}
  //         value={[currentRefinement.min, currentRefinement.max]}
  //         allowCross={false}
  //         railStyle={{ background: "#e6e6e6", height: "5px" }}
  //         trackStyle={{ background: "#1BAFBF", height: "5px" }}
  //         onChange={onChange}
  //       />
  //     </div>
  //   );
  // };



  // class Range extends React.Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       currentValues: { min: this.props.min, max: this.props.max },
  //     };
  //     this.onValuesUpdated = this.onValuesUpdated.bind(this);
  //     this.onChange = this.onChange.bind(this);

  //   }

  //   componentWillReceiveProps(sliderState) {
  //     this.setState({
  //       currentValues: {
  //         min: sliderState.currentRefinement.min,
  //         max: sliderState.currentRefinement.max,
  //       },
  //     });

  //   }

  //   onValuesUpdated(values) {
  //     this.setState({ currentValues: { min: values[0], max: values[1] } });
  //   }

  //   onChange(values) {
  //     if (
  //       this.props.currentRefinement.min !== values[0] ||
  //       this.props.currentRefinement.max !== values[1]
  //     ) {
  //       this.props.refine({ min: values[0], max: values[1] });
  //     }
  //   }

  //   render() {
  //     console.log("ddds",this.props);

  //     const { min = 0, max = 0 } = this.props;
  //     const { currentValues } = this.state;
  //     return (
  //       <div className="ais-Slider__root">
  //         {currentValues.min === undefined && currentValues.max === undefined
  //           ? null
  //           :
  //           //  <p>404 not found</p>
  //            <Slider
  //               max={Math.trunc(max)}
  //               min={Math.trunc(min)}
  //               onAfterChange={this.onChange}
  //               onChange={this.onValuesUpdated}
  //               range
  //               value={[currentValues.min, currentValues.max]}
  //             />
  //             }
  //         <div className="ais-Slider__values">
  //           <div>
  //             {currentValues.min}
  //           </div>
  //           <div>
  //             {currentValues.max}
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }
  // }

  // Range.propTypes = {
  //   currentRefinement: PropTypes.object,
  //   max: PropTypes.number,
  //   min: PropTypes.number,
  //   refine: PropTypes.func,
  // };

  // const ConnectedRange = connectRange(Range);

  function Hit({ hit }) {
    arr.push(hit)
    let maxP = hit.max_price ? hit.max_price : hit.max ? hit.max : null;
    let minP = hit.min_price ? hit.min_price : hit.min ? hit.min : null;

    let maxD = hit.max_price || hit.max ? maxP.substring(0, (maxP.length - 2)) : null
    let minD = hit.min_price || hit.min ? minP.substring(0, (minP.length - 2)) : null


    let sub = maxD - minD;
    let mult = sub * 100;
    let divide = mult / maxD
    let percentag = Math.round(divide)

    const [datas, setDatas] = useState(false)

    useEffect(() => {

      if (props.wishlists && props.wishlists.length !== 0) {
        for (let da = 0; da < props.wishlists.length; da++) {
          if (hit.product_id === props.wishlists[da].product.id) {
            setDatas(true)
          }
        }
      }
    }, [hit])


    return (
      <>









        <div style={{ height: "100%" }} className="card shadown" data-sku="sku9999">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
            >
              {
              }
            </button>

            {
              (minD !== maxD) ?
                <div style={{ width: "2.5rem" }}>

                  <div className="circle">
                    <span className="circle__content">{percentag + "%"}</span>
                  </div>

                </div>
                : null}
          </div>
          <Link to={`${process.env.PUBLIC_URL}/product/${hit.url_key}`} >
            <a className="product-link img">
              <div className="text-center"

              >
              </div>
              <div className="holder-product-img"

              >
                <LazyLoadImage className="product-img loaded" src={hit.image} alt="Product Images" />
              </div>
            </a>
            <h3 className="product-title">
              <a className="product-link title">

                <h6 style={{ fontSize: '12px', letterSpacing: '0px', fontFamily: "Poppins" }}>
                  {hit.categories}

                </h6>

                <h6 style={{ fontSize: '12px', letterSpacing: '0px', fontFamily: "Poppins" }}>{hit.name}</h6>
              </a>
            </h3>
          </Link>
          <p className="product-price" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

            <h4 style={{ marginTop: 15 }}>{(hit.max_price && hit.min_price) ? "$" + minD : (hit.min && hit.max) ? "$" + minD : "$" + minD}
              {(maxD !== minD) ?
                <span className="of" style={{ display: "inline-block", marginLeft: 10 }}>
                  <span className="accessibility-text">De</span>
                  <span style={{ marginLeft: 2 }}>{"$" + maxD}</span> </span> : ''}
            </h4>
            <div style={{ width: "1.5rem" }}>
              <Heart isActive={datas}
                onClick={() => {
                  store.dispatch(removeWishlist(hit.product_id))
                }} />
            </div>
          </p>
          <button className="add-to-cart onlyBackColor" style={{ paddingBottom: "2px", height: "50px" }}
            onClick={() => addItemTOCart(hit.product_id)}
            type="button" form="cart" data-plugin="toggle-class-target" data-target=".card" data-className="added-to-cart" data-flag="_parents">
            Add To Cart
          </button>
        </div>






















      </>
      // </div>
    );
  }








  return (
    <>
      {
        arr && arr.length !== 0 ?
          <InstantSearch

            searchClient={searchClient}

            indexName="products_index"

          >
            <div style={{ paddingTop: 100 }} />
            <div id="headeria" >
              <SearchBox translations={{ placeholder: 'Search for products' }} className="my-4 py-2 px-1" />
            </div>
            <main>
              <Content />
            </main>

          </InstantSearch>
          :
          <ShopPage />
      }
    </>
  )
}


const mapStateToProps = state => ({

  wishlists: state.wishlist.getwishlist.data,

})
export default

  connect(mapStateToProps, { filterBrand, filterColor, filterPrice })
    (ShopAlgoliaA)
withUrlSync(
  ShopAlgoliaA)
  ;
