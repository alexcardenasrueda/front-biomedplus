import './upload-image.css';

function UploadImage({ title, image, setImage, isOnlyView}) {

    const handleChange = (event) => {
        console.log('event', event.target.files[0])
        setImage({
            file: URL.createObjectURL(event.target.files[0]),
            img: event.target.files[0]
        })
    }

    console.log("Image Object - " + JSON.stringify(image))


    return (
        <div>
            <label for="formFile" class="form-label">{title}</label>
            <input class="form-control" onChange={handleChange} type="file" id="formFile" accept='image/*' disabled={isOnlyView} />
            <br></br>
            <div class="img-container">
                {image.file?
                 <img class="img-uploaded" src={image.file} alt='Imagen equipo'/> :
                 (image !== ""?
                 <img class="img-uploaded" src={`data:image/jpeg;base64,${image}`} alt='Imagen equipo'/>:
                 null
                 )
                }
                
            </div>
        </div>
    );
}
export default UploadImage;