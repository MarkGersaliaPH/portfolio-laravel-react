import FileInput from "@/Components/Reusable/FileInput";
import TagInput from "@/Components/Reusable/TagInput";
import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { TagsInput } from "react-tag-input-component";
function FormModal(props) { 
     

    let { toggleModal, showModal, formData , setFormData, actionUrl,editMode,modalTitle,selectedSkills,setSelectedSkills} = props; 
  
    console.log(selectedSkills)
    let store_url = route("admin.projects.store");
    const handleChange = (e) => {
        let inputData = { ...formData };
        inputData[e.target.name] = e.target.value;
        setFormData(inputData);
    };

    const onFileChange = (data) => {
        let inputData = { ...formData };
        inputData[data.name] = data.file;
        setFormData(inputData); 
    };

    const submit = () => { 
        formData['skills'] = selectedSkills;
        Inertia.post(actionUrl, formData); 
        showModal(false);
        setFormData({});
    };
    return (
        <>
            <Button className="rounded-full" onClick={() => showModal(true)}>
                {modalTitle} 
            </Button>

            <Modal
                size="lg"
                show={toggleModal}
                onHide={() => showModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {modalTitle}  
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="">
                      
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                onChange={handleChange}
                                value={formData.title || ""}
                                name="title"
                                className="form-control mb-3   "
                                placeholder="Project Title"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                onChange={handleChange}
                                value={formData.link || ""}
                                name="link"
                                className="form-control mb-3   "
                                placeholder="Project Link"
                            />
                        </div>
                        <div className="form-group mb-3">
                        <TagsInput
                            value={selectedSkills}
                            onChange={setSelectedSkills}
                            name="skills"
                            placeHolder="Enter skills used"
                            />
                            <small className="text-muted">Press enter to add new skills</small>
                        </div>
                        <div className="form-group mb-3">
                            <textarea
                                name="description"
                                className="form-control"
                                value={formData.description || ""}
                                placeholder="Project Description"
                                onChange={handleChange}
                                id=""
                                cols="30"
                                rows="5"
                            ></textarea>
                            {/* <input type="text" onChange={handleChange} name="name" className="form-control mb-3   " placeholder="Company Name" /> */}
                        </div>
                    
                        <div className="form-group mb-3">
                            <FileInput
                                title="Select image"
                                selectedImage={formData.image || ""}
                                onFileChange={onFileChange}
                                name="image"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={submit}>
                        Submit
                    </button>
                    <button
                        className="btn btn-default"
                        onClick={() => { 
                            showModal(false)
                        }}
                    >
                        Cancel
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FormModal;
