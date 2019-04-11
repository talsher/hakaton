import SupplierData from '../../assets/data.json'
import React from 'react';


class SupplierCard extends React.Component{

    constructor(props, name, details, img_src){
        super(props);
        this.name = name;
        this.details = details;
        this.img_src = img_src;
    }

    
    render(){
        return(
    <div>
        {SupplierData.map((data, index) => {
            return <h1>{data.supplier_name}</h1>
        })}
        {/* <img alt="photo" src={img_src}/>
        <div>
            <h2>{name}</h2>
            <p>{details}</p>
        </div> */}
    </div>
        )    
    }
    
}

export default (SupplierCard);