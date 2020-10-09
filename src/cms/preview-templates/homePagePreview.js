import React from 'react'

import PageHomeTemplate from '../../templates/home-page';

const HomePagePreview = ({entry}) =>{
    const data = entry.getIn(['data']).toJS();
    return (
        <PageHomeTemplate
        title={data.title}
        description={data.description}
        button={data.button}
        />
    );
 }

 export default HomePagePreview;