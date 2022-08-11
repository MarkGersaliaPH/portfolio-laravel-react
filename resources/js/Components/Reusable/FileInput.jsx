import React from 'react'
import { useState } from 'react';

function FileInput(props) {

    let [selectedImage, setSelectedImage] = useState(props.selectedImage);
    const onChangeProfilePic = (e) => {   
        let file = e.target.files[0];
        let url = URL.createObjectURL(file);  
        // console.log(url);
        let inputData = { ...selectedImage }
        inputData['name'] = e.target.name;
        inputData['file'] = file;
        setSelectedImage(url)
        props.onFileChange(inputData)
    }
    
    return (
        <>
          {
                    selectedImage ?
                        <img src={selectedImage} className="img-fluid  shadow-sm mb-4 d-block"  />
                        : 
                        null
            }
            
            <label for="formFile" className="form-label">{ props.title}</label>
                <input className="form-control" name={props.name} onChange={onChangeProfilePic} type="file" id="formFile" />  
                
        </>
  )
}

export default FileInput