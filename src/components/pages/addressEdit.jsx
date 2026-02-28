import React, { Component } from 'react';
import AddressCard from './addressCard'
class AddressEdit extends Component {
  
  render() {
    const { handleClickCustom } = this.props;
// console.log("hshhsh",handleClickCustom)
    return (
      <AddressCard handleClickCustom={handleClickCustom} />
    )
  }
}
export default AddressEdit;