import FileInput from "@/Components/Reusable/FileInput";
import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function FormModal(props) { 
     

    let { toggleModal, showModal, formData , setFormData, actionUrl,editMode} = props; 
 
    let store_url = route("admin.companies.store");
    const handleChange = (e) => {
        let inputData = { ...formData };
        inputData[e.target.name] = e.target.value;
        setFormData(inputData);
    };

    const onFileChange = (data) => {
        let inputData = { ...formData };
        inputData[data.name] = data.file;
        setFormData(inputData);
        console.log(inputData)
    };

    const submit = () => { 
        Inertia.post(actionUrl, formData); 
        showModal(false);
        setFormData({});
    };
    return (
        <>
            <Button className="rounded-full" onClick={() => showModal(true)}>
                Create Company 
            </Button>

            <Modal
                size="md"
                show={toggleModal}
                onHide={() => showModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Create Company  
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="">
                        <div className="form-group mb-3">
                            <FileInput
                                title="Select logo"
                                selectedImage={formData.logo || ""}
                                onFileChange={onFileChange}
                                name="logo"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                onChange={handleChange}
                                value={formData.name || ""}
                                name="name"
                                className="form-control mb-3   "
                                placeholder="Company Name"
                            />
                        </div>

                        <div className="form-group">
                            <textarea
                                name="description"
                                className="form-control"
                                value={formData.description || ""}
                                onChange={handleChange}
                                id=""
                                cols="30"
                                rows="5"
                            ></textarea>
                            {/* <input type="text" onChange={handleChange} name="name" className="form-control mb-3   " placeholder="Company Name" /> */}
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
