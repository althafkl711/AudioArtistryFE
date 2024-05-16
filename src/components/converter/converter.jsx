import React, { useState } from 'react';
import './converter.css';
import Uploader from './uploader/uploader'

function Converter() {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };

    return (
        <>
            <div className="section-head">
                <p className="heading">Lorem ipsum is a dummy test</p>
                <p className="title-discription">Lorem ipsum is a dummy test.
                    Lorem ipsum is a dummy test.Lorem ipsum is a dummy test.Lorem ipsum is a dummy test.Lorem ipsum is a dummy test
                    Lorem ipsum is a dummy test.Lorem ipsum is a dummy test.
                </p>
            </div>
            <div>
                <Uploader/>
            </div>
        </>
    )
}

export default Converter;
