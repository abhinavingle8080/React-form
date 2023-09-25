// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

export default function StudentList() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:3001/api/students', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setStudents(data);
                } else {
                    console.error('Error fetching data:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);


    const handleUpdate = (student) => {
        alert(`Update Student: ${student["First Name"]} ${student["Last Name"]}`);
    };

    const handleDelete = (student) => {
        alert(`Delete Student: ${student["First Name"]} ${student["Last Name"]}`);
    };


    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    {students.length > 0 &&
                        Object.keys(students[0]).map((field) => (
                            <th key={field} scope="col">
                                {field}
                            </th>
                        ))}
                </tr>
                </thead>
                <tbody>
                {students.map((student, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        {Object.keys(student).map((field) => (
                            <td key={field}>{student[field]}</td>
                        ))}
                        <td>
                            <a onClick={() => handleUpdate(student)}>&#x270E;</a>
                            <a onClick={() => handleDelete(student)}>&#x292B;</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}
