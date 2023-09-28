import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createDepartment, getDepartment, updateDepartment } from '../services/DepartmentService';

const DepartmentComponent = () => {

    const [departmentName, setDepartmentName] = useState('');
    const [departmentDescription, setDepartmentDescription] = useState('');
    const [errors, setErrors] = useState({
        departmentName: '',
        departmentDescription: '',
    })

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getDepartment(id).then((response) => {
                setDepartmentName(response.data.departmentName);
                setDepartmentDescription(response.data.departmentDescription);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id])

    const saveOrUpdateDepartment = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const department = {
                departmentName,
                departmentDescription,
            };
    
            if (id) {
                updateDepartment(id, department).then(response => {
                    navigate("/departments");
                }).catch(error => {
                    console.error(error);
                });
            } else {
                createDepartment(department).then(response => {
                    navigate("/departments");
                }).catch(error => {
                    console.error(error);
                });
            }
        };
    };

    const validateForm = () => {
        let valid = true;
        const errorsCopy = {...errors}

        if (departmentName.trim()) {
            errorsCopy.departmentName = '';
        } else {
            errorsCopy.departmentName = "Department name is required";
            valid = false;
        }

        if (departmentDescription.trim()) {
            errorsCopy.departmentDescription = '';
        } else {
            errorsCopy.departmentDescription = "Department description is required";
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    const pageTitle = () => {
        if (id) {
            return <h2 className="text-center mt-4">Update Department</h2>
        } else {
            return <h2 className="text-center mt-4">Add Department</h2>
        }
    };

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label">Department Name:</label>
                                <input 
                                    type="text"
                                    placeholder="Enter Department Name"
                                    name="departmentName"
                                    value={departmentName}
                                    className={`form-control ${errors.departmentName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setDepartmentName(e.target.value)}
                                />
                                { errors.departmentName && <div className="invalid-feedback">{errors.departmentName}</div> }
                            </div>


                            <div className="form-group mb-2">
                                <label className="form-label">Department Description:</label>
                                <input 
                                    type="text"
                                    placeholder="Enter Department Description"
                                    name="departmentDescription"
                                    value={departmentDescription}
                                    className={`form-control ${errors.departmentDescription ? 'is-invalid' : ''}`}
                                    onChange={(e) => setDepartmentDescription(e.target.value)}
                                />
                                { errors.departmentDescription && <div className="invalid-feedback">{errors.departmentDescription}</div> }
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button className="btn btn-success mt-2" onClick={saveOrUpdateDepartment}>Submit</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DepartmentComponent