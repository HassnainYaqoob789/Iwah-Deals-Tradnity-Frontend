import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

function HeadSEO({sociallinks, title}) {

    localStorage.setItem('imageSettings', JSON.stringify(sociallinks));

    const colorCodes = localStorage.getItem("color_theme");
    let parsedColorCodes = JSON.parse(colorCodes);
    const imageCodes = localStorage.getItem("imageSettings") ? localStorage.getItem("imageSettings") : JSON.stringify(sociallinks);
    let parsedImagesCodes = imageCodes && JSON.parse(imageCodes);


    let valueTag = String(parsedColorCodes && parsedColorCodes?.meta_tags);
    var objme;
    eval('objme ='+ valueTag);



    return( 

        <Helmet>

        <title>{`${parsedColorCodes && parsedColorCodes?.shop_name ? title + " - " + parsedColorCodes?.shop_name : ""}`}</title>
        
        <link rel="icon" href={parsedImagesCodes && parsedImagesCodes?.mobilelogo} type="image/x-icon" />

         <meta name="keywords" content={objme && objme.meta_keywords} />
         <meta name="title" content={objme && objme.meta_title} />
         <meta name="description" content={objme && objme.meta_description} />    

         </Helmet>

        );
}



const mapStateToProps = (state) => ({
    appconfig: (state?.user?.config) ? state?.user?.config : '',
    sociallinks: state.contactDetails.socialLinks
})

export default connect(mapStateToProps)(HeadSEO);

