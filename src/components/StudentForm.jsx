// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react'
import emailjs from '@emailjs/browser';
import '../styles/StudentForm.css';
import '../styles/CoursesDropDown.css';
import logo from '../img/Full-Logo.png';
import axios from "axios";


export default function StudentForm() {

    const [showCoupon, setShowCoupon] = useState(false);
    const [validCoupons, setValidCoupons] = useState([]);

    const [coursesDB, setCoursesDB] = useState([]);
    const [coursesArr, setCoursesArr] = useState([]);

    const [errors, setErrors] = useState({});

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        age: 0,
        dob: '',
        gender: '',
        contact: 0,
        parentContact: '',
        education: '',
        itLevel: '',
        courses: '',
        fees: 0,
        paidFees: 0,
        couponCode: ''
    });


    const handleChange = (event) => {
        const {name, value} = event.target;
        setData({...data, [name]: value});

        validateField(name, value);
    }

    const validateField = (name, value) => {
        // let error = "";
        // switch (name) {
        //     case "firstName":
        //         if (value.trim() === "") {
        //             error = "First name is required";
        //         }
        //         break;
        //     case "lastName":
        //         if (value.trim() === "") {
        //             error = "Last name is required";
        //         }
        //         break;
        //     case "email":
        //         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        //             error = "Invalid email address";
        //         }
        //         break;
        //     case "age":
        //         if (isNaN(value) || value <= 0) {
        //             error = "Age must be a positive number";
        //         }
        //         break;
        //     // Add validation for other fields here
        //     default:
        //         break;
        // }
        // setErrors({ ...errors, [name]: error });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // for (const key in data) {
        //     if (!data[key]) {
        //         console.log(!data[key]);
        //         // console.log(errors[key]);
        //         alert("Please fix the errors in the form.");
        //         return;
        //     }
        // }

        setData({...data, courses: coursesArr.join(', ')});

        try {
            const response = await axios.post('http://localhost:3001/api/students', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(data);
            if (response.status === 201) {
                console.log('Submission successful');
                sendEmail();
            } else {
                console.error('Submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const sendEmail = () => {
        const emailService = 'service_7jnl14s';
        const emailTemplate = 'template_eh24x34';
        const publicKey = 'k1v0FLc-9rb5d4uuU';

        const templateParams = {
            from_name: 'Non Criterion Technology',
            to_email: data.email,
            to_name: data.firstName,
        }

        emailjs
            .send(emailService, emailTemplate, templateParams, publicKey)
            .then((response) => {
                console.log('Email sent successfully:', response);
            })
            .catch((error) => {
                console.error('Email sending failed:', error);
            });
    };


    const fetchCoupons = async () => {
        try {
            const responce = await axios.get('https://sheetdb.io/api/v1/ivyccp59wbjb2?sheet=coupons', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (responce.status === 200) {
                const couponData = responce.data;
                if (Array.isArray(couponData)) {
                    setValidCoupons(couponData);
                }
            }
        } catch (e) {
            console.log('fetching coupons failed');
        }
    }


    const applyCoupon = () => {
        fetchCoupons();

        try {
            for (let i = 0; i < validCoupons.length; i++) {
                if (validCoupons[i].code === data.couponCode) {
                    console.log('coupon is valid');
                    data.paidFees -= validCoupons[i].amount;
                    setShowCoupon(false);
                }
            }
        } catch (e) {
            console.log('applying Coupon failed');
        }
    }

    const handleChangeCourses = (event) => {
        const { value, checked } = event.target;

        setCoursesArr((prevCoursesArr) => {
            const updatedCourses = [...prevCoursesArr];

            if (checked) {
                if (!updatedCourses.includes(value)) {
                    updatedCourses.push(value);
                    console.log(updatedCourses);
                }
            } else {
                const index = updatedCourses.indexOf(value);
                if (index !== -1) {
                    updatedCourses.splice(index, 1);
                }
            }
            return updatedCourses;
        });
    };


    const updateCourseFees = async () => {
        try {
            const response = await axios.get('https://sheetdb.io/api/v1/ivyccp59wbjb2?sheet=courses', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                console.log('Courses fetched');
                const coursesData = response.data;
                if (Array.isArray(coursesData)) {
                    let updatedPaidFees = 0;

                    for (let i = 0; i < coursesArr.length; i++) {
                        const selectedCourse = coursesArr[i];
                        const course = coursesData.find(course => course.courseName === selectedCourse);
                        if (course) {
                            updatedPaidFees += Number(course.coursePrice);
                        }
                    }

                    setData(prevData => ({
                        ...prevData,
                        paidFees: updatedPaidFees,
                    }));
                }
            }
        } catch (e) {
            console.log('Error fetching courses')
        }
    }


    return (
        <>
            <div className="container mt-5">
                <div className="student-form">
                    <img className={"logo"} src={logo}/>
                    <h2 className="form-heading">Registration Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={data.firstName || ''}  //character limit
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            {errors.firstName && (
                                <div className="error">{errors.firstName}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={data.lastName}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            {errors.lastName && (
                                <div className="error">{errors.lastName}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            {errors.email && (
                                <div className="error">{errors.email}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age:</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={data.age}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            {errors.age && (
                                <div className="error">{errors.age}</div>
                            )}
                        </div>
                        <div className="form-group dob">
                            <label htmlFor="dob">Date of Birth:</label>
                            <div>
                                <input
                                    placeholder="Enter your Date of Birth"
                                    type="text"
                                    id="dob"
                                    name="dob"
                                    value={data.dob}
                                    className="form-control"
                                    onFocus={(e) => (e.target.type = 'date')}
                                    onBlur={(e) => (e.target.type = 'text')}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.dob && (
                                    <div className="error">{errors.dob}</div>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender:</label>
                            <select
                                id="gender"
                                name="gender"
                                value={data.gender}
                                onChange={handleChange}
                                className="form-control"
                                placeholder={"Enter Gender"}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </select>
                            {errors.gender && (
                                <div className="error">{errors.gender}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact">Contact:</label>
                            <input
                                type="tel"
                                id="contact"
                                name="contact"
                                value={data.contact}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            {errors.contact && (
                                <div className="error">{errors.contact}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="parentContact">Parent Contact:</label>
                            <input
                                type="tel"
                                id="parentContact"
                                name="parentContact"
                                value={data.parentContact}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            {errors.parentContact && (
                                <div className="error">{errors.parentContact}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="education">Education:</label>
                            <select
                                id="education"
                                name="education"
                                value={data.education}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="High School">High School</option>
                                <option value="Bachelor's Degree">Bachelor&#39;s Degree</option>
                                <option value="Master's Degree">Master&#39;s Degree</option>
                                <option value="Ph.D.">Ph.D.</option>
                            </select>
                            {errors.education && (
                                <div className="error">{errors.education}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="itLevel">Level in IT:</label>
                            <select
                                id="itLevel"
                                name="itLevel"
                                value={data.itLevel}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Advanced">Experienced</option>
                            </select>
                        </div>

                        <div>
                            <details className={"mt-2 mb-3"}>
                                <summary>Choose the course you want to enroll</summary>
                                {/*<ul onInput={updateCourseFees}>*/}
                                <ul>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="fc"
                                                value="Core Java"
                                                onChange={handleChangeCourses}
                                                checked={coursesArr.includes("Core Java")}
                                            />
                                            Core Java
                                        </label>
                                    </li>

                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="fc"
                                                value="Core Java + Project in Core Java"
                                                onChange={handleChangeCourses}
                                                checked={coursesArr.includes("Core Java + Project in Core Java")}
                                            />
                                            Core Java + Project in Core Java
                                        </label>
                                    </li>

                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="fc"
                                                value="Java Placement Batch"
                                                onChange={handleChangeCourses}
                                                checked={coursesArr.includes("Java Placement Batch")}
                                            />
                                            Java Placement Batch
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="fc"
                                                value="Only Project in Java"
                                                onChange={handleChangeCourses}
                                                checked={coursesArr.includes("Only Project in Java")}
                                            />
                                            Only Project in Java
                                        </label>
                                    </li>

                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="fc"
                                                value="C language"
                                                onChange={handleChangeCourses}
                                                checked={coursesArr.includes("C language")}
                                            />
                                            C language
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="fc"
                                                value="C++ language"
                                                onChange={handleChangeCourses}
                                                checked={coursesArr.includes("C++ language")}
                                            />
                                            C++ language
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="fc"
                                                value="Python"
                                                onChange={handleChangeCourses}
                                                checked={coursesArr.includes("Python")}
                                            />
                                            Python
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="fc"
                                                value="Python FullStack"
                                                onChange={handleChangeCourses}
                                                checked={coursesArr.includes("Python FullStack")}
                                            />
                                            Python FullStack
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="fc"
                                                value="DSA"
                                                onChange={handleChangeCourses}
                                                checked={coursesArr.includes("DSA")}
                                            />
                                            DSA
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="fc"
                                                value="Front-end"
                                                onChange={handleChangeCourses}
                                                checked={coursesArr.includes("Front-end")}
                                            />
                                            Front-end
                                        </label>
                                    </li>
                                </ul>
                            </details>

                            <div className="selected-courses-box">
                                <a>Selected Courses:</a>
                                <ul>
                                    {coursesArr.map((courses, index) => (
                                        <li key={index}>{courses}</li>
                                    ))}
                                </ul>
                            </div>

                            <button type="button" onClick={updateCourseFees}> Confirm</button>
                        </div>

                        <div className="form-group">
                            <label htmlFor="paidFees">Paid Fees:</label>
                            <input
                                type="number"
                                id="paidFees"
                                name="paidFees"
                                value={data.paidFees}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <button
                            className="coupon-btn"
                            type="button"
                            onClick={() => setShowCoupon(!showCoupon)}
                        >
                            {showCoupon ? 'Hide Coupon <' : 'Apply Coupon >'}
                        </button>
                        {showCoupon && (
                            <div className="form-group">
                                <label htmlFor="couponCode">Coupon:</label>
                                <input
                                    type="text"
                                    id="couponCode"
                                    name="couponCode"
                                    value={data.couponCode}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                                <button type="button" className="coupon-btn" onClick={applyCoupon}> apply</button>
                                {/*<QrReader*/}
                                {/*    onResult={(result, error) => {*/}
                                {/*        if (!!result) {*/}
                                {/*            data.coupon = (result?.text);*/}
                                {/*        }*/}

                                {/*        if (!!error) {*/}
                                {/*            console.info(error);*/}
                                {/*        }*/}
                                {/*    }}*/}
                                {/*    style={{width: '100%'}}*/}
                                {/*/>*/}
                            </div>
                        )}
                        <button className="btn btn-primary submit-btn" type="submit">Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}