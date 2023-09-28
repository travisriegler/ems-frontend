import React, { useEffect, useState } from 'react'
import { deleteDepartment, getAllDepartments } from '../services/DepartmentService';
import { Link, useNavigate } from 'react-router-dom';

const ListDepartmentComponent = () => {

    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getDepartments();
    }, []);

    const getDepartments = () => {
        getAllDepartments().then(response => {
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const updateDepartment = (departmentId) => {
        navigate(`/edit-department/${departmentId}`);
    };

    const removeDepartment = (departmentId) => {
        deleteDepartment(departmentId).then(response => {
            getDepartments();
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="container">
            <h2 className="text-center mt-4">List of Departments</h2>

            <Link to="/add-department" className="btn btn-primary mb-2">Add Department</Link>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Department Id</th>
                        <th>Department Name</th>
                        <th>Department Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        departments.map((department) => {
                            return (
                                <tr key={department.id}>
                                    <td>{department.id}</td>
                                    <td>{department.departmentName}</td>
                                    <td>{department.departmentDescription}</td>
                                    <td>
                                        <button className="btn btn-secondary" onClick={() => updateDepartment(department.id)}>Update</button>
                                        <button className="btn btn-outline-danger ms-2" onClick={() => removeDepartment(department.id)}>Delete</button>
                                    </td>
                                    
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListDepartmentComponent