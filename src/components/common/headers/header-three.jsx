import React, { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Header2 from './header2';
import Header1 from './header1';
class HeaderThree extends Component {
    constructor(props){
        super(props)
       this.headerType= props.headerType?props.headerType?.data:{}
    }
    render() {
        return (
            <div>
                <ToastContainer style={{zIndex:99999999}} />
                {this.props.headerType&&(this.props.headerType?.data?.header_type==1 ? <Header2 />:this.props.headerType?.data?.header_type==2 ? <Header1/>:<Header1/>)}
            </div>
        )
    }
}

export default HeaderThree;