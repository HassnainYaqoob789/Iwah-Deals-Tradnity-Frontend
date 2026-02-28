import React, { Component } from 'react';
import { connect } from 'react-redux'
import store from '../../store';
import { reOrder, CancelOrder, viewOrderDetail, getOrders } from '../../actions'
import "./myOrders.scss"
import ScrollToTop from './scroll_to_top';
import Heading from './heading';
import { Helmet } from 'react-helmet';
import ReactPaginate from 'react-paginate';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import EmptySearch from '../../svg_code/emptySearch';
import Loader from '../../svg_code/loader';
import HeadSEO from '../layouts/tradnity/headSEO';


const OrderTable = (props) => {


  let { id, created, status, reOrder, CancelOrder, grandTotal, data} = props

  return (
    <tr className='tr' key={id}>
    <td className='td py-4'>#{id}</td>
    <td className='td py-4'>{created}</td>
    <td className='td'>
      <p style={{textTransform:"uppercase"}} className={status === "canceled" || status === "closed" ?
        "status bg-danger text-light py-2" : status === "pending" ?
          "status status-pending py-2" : status === "processing"
            ? "status status-paid py-2" : status === "completed" ? "status py-2 bg-success text-light" : "status status-paid py-2"}>{status}</p>
    </td>
    <td className="py-4">{grandTotal}</td>
    <td className='td'>
    <Link to={{pathname:"/viewDetails",  state:{data:data}}} >
    <button type="button" className="btn-solid btn">View</button>
    </Link>
      &nbsp;&nbsp;
      <button type="button" className="btn-solid btn" onClick={() => reOrder()} >Re-order</button>
      &nbsp;&nbsp;
      {(status === 'pending' || status === 'processing') ? <button type="button" className="btn-solid btn" onClick={() => CancelOrder()} >Cancel Order</button> :
        <button type="button" className="btn-solid btn" disabled  >Cancel Order</button>}
    </td>
  </tr>
    )
}




class MyOrders extends Component {
  constructor(props) {
    super(props)
    this.counter = React.createRef(0);
    this.state = {
      pageNumber: 0,
      loading:true,
    }
}

  componentDidMount() {
    document.querySelector('body').scrollTo(0, 0);
    store.dispatch(getOrders());

  }

  
  
  render() {
    const { getorders } = this.props;
    if(getorders === undefined){
 
      setTimeout(()=>{
    
          this.setState({loading : false})
        },4000)
    
    }
    const usersPerPage = 10;
    const pagesVisited = this.state.pageNumber * usersPerPage;
  
  
    const pageCount = Math.ceil(getorders && (getorders.length / usersPerPage));
  
  
    const changePage = ({ selected }) => {
         this.setState({pageNumber:selected});
    };



    function handleClick(e) {
      store.dispatch(reOrder(e));
    }
    function cancelOrders(e) {
      store.dispatch(CancelOrder(e));
    }
 
    
    return (
      <>
      <ScrollToTop />
  
            <HeadSEO title="My Orders" />


            {
              getorders && getorders.length !== 0 ?

        <div className='myOrder-top my-4 absoluteWidth' style={{ marginTop: "5%", overflowX: 'auto ' }}>
          <div className="head50" />
          <br />
        <Heading name="My Orders" />




          <table className='table'
            style={{ width: "100%", marginLeft: "0%", border:"1px solid rgba(0,0,0,0.1)" }}
          >
            <thead className='thead text-center'>
              <tr className='tr'>
                <th className='th'>Order No </th>
                <th className='th'>Due Date</th>
                <th className='th'>Status</th>
                <th className='th'>Amount</th>
                <th className='th'>Actions</th>
              </tr>
            </thead>
            <tbody className='tbody text-center' >
              {(getorders) && (getorders.length !== 0) ?
                <>
                  {getorders.slice(pagesVisited, pagesVisited + usersPerPage).map((data,key) => (
                    // <span key={key}>

                      <OrderTable 
                      key={key}
                      data={data}
                      id={data.id} 
                      created={data.created_at.substring(0, 10)} 
                      status={data.status} 
                      reOrder={() => handleClick(data.id)}
                      CancelOrder={() => cancelOrders(data.id)}

                      grandTotal = {data?.formated_grand_total} 
                       />
                      // {/* </span> */}

                  ))}
                </>
                : ''
              }
            </tbody>
          </table>
        </div>
:

this.state.loading ?


<div className="text-center" style={{marginTop:"20vh"}}>
<Loader />
</div>

:

<div className="text-center" style={{marginTop:"20vh"}}>
                                    
<EmptySearch />
<br />

<span className='fs-5 my-3'>Sorry No Order Found!</span>
</div>

}
{
  getorders && getorders.length !== 0 ?
<div style={{ marginTop: 50 }}>
                <ReactPaginate
                    breakLabel="..."

                    pageRangeDisplayed={2}
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    forcePage={this.state.pageNumber}
                    onPageChange={changePage}
                    renderOnZeroPageCount={null}

                    containerClassName={"pagination justify-content-center text-white"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"border bg-secondary"}
                />
            </div>

: null
}
      </>
    )
  }
}
const mapStateToProps = (state) => ({
  getorders: (state.orders.get_orders) ? state.orders.get_orders.data : [],
})
export default connect(
  mapStateToProps,
  {}
)(MyOrders)