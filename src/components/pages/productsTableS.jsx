import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Placeholder from '../../svg_code/placeholder';



const ProductsTable = (props) => {
    const {data} = props
  return (
    <table className="table table-bordered ">
    <thead className="base_color onlyBackColor">
        <tr style={{ color: "white" }}>
            <th scope="col">#</th>
            <th scope="col">Products</th>
            <th scope="col">Price</th>
        </tr>
    </thead>
    <tbody>
        {data && data.items && data.items.length !== 0 && data.items.map((dataG,key) => (
            <tr key={key}>
                <td>
                    {
                        ((dataG?.product.images[0].url) && dataG?.product?.images[0]?.url) ?
                        <LazyLoadImage src={(dataG?.product.images[0].url) && dataG?.product?.images[0]?.url}
                        style={{ width: '60px', height: '60px' }} alt="img" />
                        :
                        <div style={{ width: '60px', height: '60px' }}>
                            <Placeholder />
                        </div>
                        }
                </td>
                <td style={{ border: "none", paddingTop: "5%", display: "flex", justifyContent: "space-between" }}><span> {dataG.name} </span> <span> x{dataG.quantity} </span>  </td>
                <td style={{ paddingTop: '3%' }}>
                    {dataG.formated_price}
                </td>
            </tr>
        ))}
    </tbody>
</table>
  )
}

export default ProductsTable