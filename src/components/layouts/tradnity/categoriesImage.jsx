import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom'

const CategoriesImage = (props) => {
  const { m, image } = props;

  // return (

  //   <div className="mx-3">

  //     <Link to={{ pathname: "/shopPage", state: { categories: m.name } }} >

  //       <LazyLoadImage style={{ width: "95%", borderRadius: "152px", display: "block", minHeight: "46vh", minWidth: "23vw", }}
  //         src={m && m?.image_url && m.image_url}
  //         className="myData"
  //         placeholderSrc={image}
  //         effect="opacity"
  //         alt="Category Images"
  //       />
  //     </Link>

  //     <div className="row justify-content-md-center text-center">

  //       <Link to={{ pathname: "/shopPage", state: { categories: m.name } }} >
  //         <h3 style={{ textTransform: "uppercase", marginTop: 12, fontSize: "1em" }}>{m.name}</h3>
  //       </Link>

  //     </div>
  //   </div>


  // )

  return (

    <div className="mx-3 row">
      <div className='col-sm-12 col-md-3 col-lg-3'>

        <Link to={{ pathname: "/shopPage", search: `?category=${m.id}`, state: { categories: m } }}>
          <img
            style={{ width: "95%", borderRadius: "152px", display: "block", minHeight: "47vh", minWidth: "17vw", }}
            src={m && m?.image_url && m.image_url}
            alt="Category Images"
            loading="lazy"
          />
        </Link>
        <div className="row justify-content-md-center text-center">
          <Link to={{ pathname: "/shopPage", search: `?category=${m.id}`, state: { categories: m } }}>
            <h3 style={{ textTransform: "uppercase", marginTop: 17, fontSize: "1em", marginLeft: "87px" }}>
              <strong>{m.name}</strong>
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );


}

export default CategoriesImage