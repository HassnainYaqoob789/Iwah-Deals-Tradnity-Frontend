import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPages } from '../../actions';
import store from '../../store';
import AboutUsStructure from './aboutUsStructure';



class aboutUs extends Component {
   componentDidMount(){
         store.dispatch(getAllPages());
   }
    render() {
        const { GetData, user } = this.props;
        var result = (GetData) ? GetData.filter(data => data.url_slug === 'about_us_web') : [];
        var about = (user.sliderBannner) ? user.sliderBannner.filter(data => data.title === 'About Us') : [];
        var about_side = (user.sliderBannner) ? user.sliderBannner.filter(data => data.title === 'About Side Img') : [];
        
        return (
          <AboutUsStructure result={result} about={about} about_side={about_side} />
        )
    }
}
const mapStateToProps = (state) => ({
    GetData: (state.pages.all_pages.data) ? state.pages.all_pages.data : [],
    user: state.images,
})
export default connect(
    mapStateToProps,
)(aboutUs)
