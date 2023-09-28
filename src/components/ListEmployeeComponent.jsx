import { useEffect } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService"
import { getDepartment } from "../services/DepartmentService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    // const getAllEmployees = () => {
    //     listEmployees().then(response => {
    //         setEmployees(response.data);
    //     }).catch(error => {
    //         console.error(error);
    //     })
    // }

    const getAllEmployees = async () => {
        try {
            const response = await listEmployees();
            const employeeData = await Promise.all(
                response.data.map(async (employee) => {
                    const departmentResponse = await getDepartment(employee.departmentId);
                    return {
                        ...employee,
                        departmentName: departmentResponse.data.departmentName,
                    };
                })
            );
            setEmployees(employeeData);
        } catch (error) {
            console.error(error);
        }
    };


    const addNewEmployee = () => {
        navigate("/add-employee");
    };

    const updateEmployee = (employeeId) => {
        navigate(`/edit-employee/${employeeId}`);
    };

    const removeEmployee = (employeeId) => {
        deleteEmployee(employeeId).then(response => {
            
            getAllEmployees();

        }).catch(error => {
            console.error(error);
        });


    };

    return (
        <div className="container">
            <h2 className="text-center mt-4">List of Employees</h2>

            <button className="btn btn-primary mb-2" onClick={addNewEmployee}>Add Employee</button>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email Id</th>
                        <th>Employee Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((employee) => {

                            return (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.departmentName}</td>
                                    <td>
                                        <button className="btn btn-secondary" onClick={() => updateEmployee(employee.id)}>Update</button>
                                        <button className="btn btn-outline-danger ms-2" onClick={() => removeEmployee(employee.id)}>Delete</button>
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

export default ListEmployeeComponent