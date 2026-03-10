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

         {/* Open Graph / Facebook / WhatsApp */}
         <meta property="og:type" content="website" />
         <meta property="og:url" content={window.location.href} />
         <meta property="og:title" content={objme && objme.meta_title} />
         <meta property="og:description" content={objme && objme.meta_description} />
         <meta property="og:image" content={parsedImagesCodes && (parsedImagesCodes?.mobilelogo || parsedImagesCodes?.logo)} />

         {/* Twitter */}
         <meta property="twitter:card" content="summary_large_image" />
         <meta property="twitter:url" content={window.location.href} />
         <meta property="twitter:title" content={objme && objme.meta_title} />
         <meta property="twitter:description" content={objme && objme.meta_description} />
         <meta property="twitter:image" content={parsedImagesCodes && (parsedImagesCodes?.mobilelogo || parsedImagesCodes?.logo)} />

         </Helmet>

        );
}



const mapStateToProps = (state) => ({
    appconfig: (state?.user?.config) ? state?.user?.config : '',
    sociallinks: state.contactDetails.socialLinks
})

export default connect(mapStateToProps)(HeadSEO);

