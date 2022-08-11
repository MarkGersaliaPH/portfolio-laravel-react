import Button from "@/Components/Button";
import Authenticated from "@/Layouts/Authenticated";
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import FormModal from "./FormModal";
function Index(props) {
    let { data } = usePage().props;
    let [toggleModal, setToggleModal] = useState(false);
    let [formData, setFormData] = useState({});
    let [editMode, setEditMode] = useState(false);
    let store_url = route('admin.companies.store'); 
    let [actionUrl, setActionUrl] = useState(store_url);

    const editData = (data) => {
        setToggleModal(true);
        setEditMode(true);
        setFormData(data);
        setActionUrl(route('admin.companies.update',data.id))
    };

    const showModal = (param) => {
        setEditMode(false)
        setFormData({}) 
        setToggleModal(param);
        setActionUrl(store_url)
        
        setSelectedSkills({})
    };

    const deleteData = (data) => {
        Inertia.delete(route('admin.companies.destroy', data));
    }
 
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h1 className="fw-bolder  leading-tight">Companies</h1>}
        >
            <Head title="Companies" />

            <div className="mb-3">
                <FormModal
                    toggleModal={toggleModal}
                    showModal={showModal}
                    formData={formData}
                    setFormData={setFormData}
                    editMode={editMode}
                    actionUrl={actionUrl}
                />
            </div>

            <div className="row">
                {data
                    ? data.map((val, key) => (
                          <div key={key} className="col-md-6 col-lg-3 col-sm-6 mb-3">
                              <div className="card border-0 shadow rounded">
                                  <img
                                      src={val.logo}
                                      className="card-img-top mx-auto w-100"
                                      alt="..."
                                  />
                                  <div className="card-body">
                                      <h5 className="card-title">{val.name}</h5>
                                      <p className="card-text">
                                          {val.description}
                                      </p>
                                      <button
                                          onClick={() => editData(val)}
                                          className="btn btn-info text-white me-2"
                                      >
                                          Edit
                                      </button>
                                      <button onClick={()=>deleteData(val)} className="btn btn-danger">
                                          Delete
                                      </button>
                                  </div>
                              </div>
                          </div>
                      ))
                    : null}
            </div>
        </Authenticated>
    );
}

export default Index;
