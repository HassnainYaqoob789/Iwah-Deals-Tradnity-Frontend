import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

function HeadSEO({ sociallinks, title, metaTitle, metaDescription, metaImage }) {

    localStorage.setItem('imageSettings', JSON.stringify(sociallinks));

    const colorCodes = localStorage.getItem("color_theme");
    let parsedColorCodes = JSON.parse(colorCodes);
    const imageCodes = localStorage.getItem("imageSettings") ? localStorage.getItem("imageSettings") : JSON.stringify(sociallinks);
    let parsedImagesCodes = imageCodes && JSON.parse(imageCodes);


    let valueTag = String(parsedColorCodes && parsedColorCodes?.meta_tags);
    var objme;
    try {
        eval('objme =' + valueTag);
    } catch (e) {
        objme = {};
    }

    const stripHtml = (html) => {
        if (!html) return '';
        return html
            .replace(/<[^>]*>?/gm, '') // Remove HTML tags
            .replace(/&nbsp;/g, ' ')
            .replace(/&mdash;/g, '—')
            .replace(/&ndash;/g, '–')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .trim();
    };

    const finalTitle = metaTitle || (parsedColorCodes && parsedColorCodes?.shop_name ? title + " - " + parsedColorCodes?.shop_name : title);
    const finalDescription = stripHtml(metaDescription || (objme && objme.meta_description));
    const finalKeywords = stripHtml(objme && objme.meta_keywords);

    // Ensure image uses HTTPS if the site is HTTPS, and encode the URL
    let finalImage = metaImage || (parsedImagesCodes && parsedImagesCodes?.mobilelogo);
    if (finalImage && typeof finalImage === 'string') {
        const currentProtocol = window.location.protocol;
        if (currentProtocol === 'https:' && finalImage.startsWith('http:')) {
            finalImage = finalImage.replace('http:', 'https:');
        }
        // Encode spaces and special characters
        finalImage = finalImage.replace(/\s/g, '%20');
    }

    const currentUrl = window.location.href;

    return (

        <Helmet>
            <title>{finalTitle}</title>
            <meta name="title" content={finalTitle} />
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={finalKeywords} />
            <link rel="icon" href={parsedImagesCodes && parsedImagesCodes?.mobilelogo} type="image/x-icon" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={finalImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={currentUrl} />
            <meta property="twitter:title" content={finalTitle} />
            <meta property="twitter:description" content={finalDescription} />
            <meta property="twitter:image" content={finalImage} />
        </Helmet>

    );
}



const mapStateToProps = (state) => ({
    appconfig: (state?.user?.config) ? state?.user?.config : '',
    sociallinks: state.contactDetails.socialLinks
})

export default connect(mapStateToProps)(HeadSEO);

