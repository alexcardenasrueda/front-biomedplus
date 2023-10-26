import './upload-image.css';
import { useState } from "react";

function UploadImage({ title, image, setImage, isOnlyView }) {

    const handleChange = (event) => {
        console.log('event', event.target.files[0])
        setImage({
            file: URL.createObjectURL(event.target.files[0]),
            img: event.target.files[0]
        })
    }

    return (
        <div>
            <label for="formFile" class="form-label">{title}</label>
            <input class="form-control" onChange={handleChange} type="file" id="formFile" accept='image/*' disabled={isOnlyView} />
            <br></br>
            <div class="img-container">
                <img class="img-uploaded" src={image.file} />
            </div>
        </div>
    );
}
export default UploadImage;