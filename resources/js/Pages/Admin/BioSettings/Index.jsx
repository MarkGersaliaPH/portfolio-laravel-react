import Authenticated from '@/Layouts/Authenticated'
import { Inertia } from '@inertiajs/inertia';
import { Head, useForm, usePage } from '@inertiajs/inertia-react'
import React, { useState } from 'react'

function Index(props) {
    
    let {data} = props
    let [formData, setFormData] = useState(data ?? {});
    let [selectedImage, setSelectedImage] = useState({
        profile_picture : data.profile_picture ?? '',
        cover_picture : data.cover_picture ?? '',
    });

 
    let store_url = route('admin.bio-settings.store');
    let { errors, flash } = usePage().props; 
    
    const { post, reset } = useForm();
  
    const handleChange = (e) => {
        let inputData = { ...formData };
        inputData[e.target.name] = e.target.value;
        setFormData(inputData);
    }

    const onSubmit = () => { 
        Inertia.post(store_url, formData);
    }

    const clearData = () => {
        setFormData({})
        setSelectedImage({}) 
    }

    const onChangeProfilePic = (e) => {  
        // setData('name',e.target.files[0].name)
        // setData('image',e.target.files[0])
        let file = e.target.files[0];
        let url = URL.createObjectURL(file);
        let inputFile = { ...selectedImage }
        let inputData = { ...formData }
        inputFile[e.target.name] = url;
        inputData[e.target.name] = file;
         
        setSelectedImage(inputFile); 
        setFormData(inputData); 
    }
    return (
        <Authenticated
        auth={props.auth}
        errors={props.errors}
        header={<h1 className="fw-bolder  leading-tight">Bio Settings</h1>}
        >
            <Head title="Bio Settings" />

            <div className="card card-body border-0 mb-4 shadow">  
                {
                    selectedImage.profile_picture ?
                        <img src={selectedImage.profile_picture} className="img-fluid  rounded-circle shadow-sm mb-4" style={{width:'100px'}}/>
                        : 
                        null
                }
                <label for="formFile" className="form-label">Select Profile Picture</label>
                <input className="form-control" name='profile_picture' onChange={onChangeProfilePic} type="file" id="formFile" />  
                
                {errors && <div className='text-danger mt-1'>{errors.profile_picture}</div>}
            </div>

            <div className="card card-body border-0 mb-4 shadow"> 
            {
                    selectedImage.cover_picture ?
                        <img src={selectedImage.cover_picture} className="img-fluid h-50 mb-4" />
                        : 
                        null
                }
                <label for="formFile" className="form-label">Select Cover</label>
                <input className="form-control" name="cover_picture" onChange={onChangeProfilePic} type="file" id="formFile" />  
                
                {errors && <div className='text-danger mt-1'>{errors.cover_picture}</div>}
            </div>

        <div className="card border-0 shadow mb-5">
            <div className="card-body">
            <form action="">
            <div className="form-group mb-3">
                    <label  className="font-weight-bolder">Introduction: </label> 
                            <textarea className='form-control mt-2' onChange={handleChange} value={formData.introduction ?? ''} name="introduction" id="" rows="5"></textarea>  
                    
                            {errors && <div className='text-danger mt-1'>{errors.introduction}</div>}        
                </div>  
            </form>
            </div> 
            </div>
            
            
                
            <button className='btn  btn-success me-2 inline' onClick={onSubmit}>Submit</button>
                <button className='btn  btn-default bg-light border' onClick={clearData}>Clear</button>
      </Authenticated>
  )
}

export default Index