import React from 'react'
import history from '../../history';
import HeadSEO from '../layouts/tradnity/headSEO';
import ScrollToTop from './scroll_to_top';

const PageNF = () => {
  return (
    <>
    <ScrollToTop />
    <HeadSEO title="404 Not Found" />
    <div className='boxeda'>
      <div className='error'>
        <h1 className='code headNFColor' >404</h1>
        <h2 className='desc'>Oops... Something Gone Wrong.</h2>
        <button className='btn btn-solid my-4' onClick={() => {
          history.push(`${process.env.PUBLIC_URL}/`)
        }} style={{ boxShadow: "0 5px 0px -2px rgba(252, 153, 24, 0.411)" }} >Go To Home</button>
      </div>
    </div>
    </>
  )
}
export default PageNF;