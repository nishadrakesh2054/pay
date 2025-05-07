// // import axios from "axios";
// // import { useState } from "react";
// // import {
// //   Alert,
// //   Button,
// //   Col,
// //   Container,
// //   Form,
// //   Row,
// //   Spinner,
// // } from "react-bootstrap";

// // import "./RegistrationPage.scss";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-toastify";

// // const RegistrationPage = () => {
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     fullName: "",
// //     address: "",
// //     contactNo: "",
// //     email: "",
// //     dob: "",
// //     age: "",
// //     gender: "",
// //     schoolName: "",
// //     parentName: "",
// //     parentEmail: "",
// //     parentContactNo: "",
// //     parentAddress: "",
// //     sports: "",
// //     time: "",
// //     category: "",
// //     days: "",
// //     emergencyContactname: "",
// //     emergencyContactNumber: "",
// //     hasMedicalConditions: "",
// //     medicalDetails: "",
// //     hasMedicalInsurance: "",
// //     insuranceNo: "",
// //     transportation: "",
// //     paymentMethod: "fonepay",
// //     notes: false,
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [formError, setFormError] = useState(null);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;

// //     if (name === "dob") {
// //       const birthDate = new Date(value);
// //       const today = new Date();
// //       let calculatedAge = today.getFullYear() - birthDate.getFullYear();

// //       // Check if the birthday has passed this year
// //       const monthDiff = today.getMonth() - birthDate.getMonth();
// //       if (
// //         monthDiff < 0 ||
// //         (monthDiff === 0 && today.getDate() < birthDate.getDate())
// //       ) {
// //         calculatedAge--;
// //       }

// //       // Determine the category based on age
// //       let category = "";
// //       let days = "";
// //       if (calculatedAge >= 6 && calculatedAge <= 11) {
// //         category = "Grassroots";
// //         days = "Tuesday & Thursday";
// //       } else if (calculatedAge >= 12 && calculatedAge <= 15) {
// //         category = "Intermediate";
// //         days = "Monday, Wednesday & Friday";
// //       } else if (calculatedAge >= 16 && calculatedAge <= 19) {
// //         category = "Senior";
// //         days = "Monday, Wednesday & Friday";
// //       } else if (calculatedAge > 19) {
// //         // alert("You are not eligible  to participate");
// //         toast.warning("Your age  must be between 6 and 19 years old.");
// //         return;
// //       }
// //       setFormData((prevFormData) => ({
// //         ...prevFormData,
// //         dob: value,
// //         age: calculatedAge.toString(),
// //         category,
// //         days,
// //       }));
// //     } else {
// //       setFormData((prevFormData) => ({
// //         ...prevFormData,
// //         [name]: value,
// //       }));
// //     }
// //   };

// //   const validateForm = () => {
// //     if (
// //       !formData.fullName ||
// //       !formData.contactNo ||
// //       !formData.email ||
// //       !formData.age ||
// //       !formData.address ||
// //       !formData.dob ||
// //       !formData.age ||
// //       !formData.gender ||
// //       !formData.schoolName ||
// //       !formData.parentName ||
// //       !formData.parentEmail ||
// //       !formData.parentContactNo ||
// //       !formData.parentAddress ||
// //       !formData.sports ||
// //       !formData.time ||
// //       !formData.category ||
// //       !formData.emergencyContactNumber ||
// //       !formData.emergencyContactname ||
// //       !formData.hasMedicalConditions ||
// //       (formData.hasMedicalConditions === "yes" && !formData.medicalDetails) ||
// //       (formData.hasMedicalInsurance === "yes" && !formData.insuranceNo) ||
// //       !formData.transportation ||
// //       !formData.paymentMethod ||
// //       formData.agreement !== true
// //     ) {
// //       setFormError("Please fill in all required fields.");
// //       return false;
// //     }

// //     return true;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setFormError(null);

// //     if (!validateForm()) return;

// //     setIsSubmitting(true);

// //     const amount = import.meta.env.VITE_CASH;

// //     const dataToSend = { ...formData, amount };
// //     try {
// //       const response = await axios.post(
// //         "/api/tdc/pre-check-registration",

// //         dataToSend,
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       if (response.data.success) {
// //         // Store form data and PRN in sessionStorage
// //         sessionStorage.setItem("formData", JSON.stringify(formData));
// //         sessionStorage.setItem("prn", response.data.prn);

// //         // Navigate to the payment page
// //         navigate("/tdc-payment-form", {
// //           state: {
// //             formData,
// //             fee: amount,
// //             prn: response.data.prn,
// //           },
// //         });
// //       } else {
// //         // If pre-check fails, display the error message
// //         setFormError(response.data.message || "Pre-registration check failed.");
// //       }

// //       toast.info("Please proceed to payment for Registration");
// //     } catch (error) {
// //       console.error(
// //         "Error submitting form:",
// //         error.response?.data || error.message
// //       );

// //       if (error.response && error.response.data) {
// //         setFormError(
// //           error.response.data.message ||
// //             "Failed to submit the form. Please try again."
// //         );
// //       } else {
// //         setFormError("Failed to submit the form. Please try again.");
// //       }
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="register-page">
// //       <Container>
// //         <div className="text-thi d-flex align-items-center flex-column jusify-content-center">
// //           <h1 className="headingTDC">THUNDERBOLTS DEVELOPMENT CENTER</h1>
// //           <p className="text-center pt-2 ">
// //             Thank you for choosing Thunderbolts Development Center (TDC) for
// //             your child's sports development. <br /> Please fill out the form
// //             below to complete the registration process.
// //           </p>
// //         </div>

// //         <div className="from-regis">
// //           {error && <Alert variant="danger">{error}</Alert>}
// //           {loading ? (
// //             <div className="text-center">
// //               <Spinner animation="border" />
// //             </div>
// //           ) : (
// //             <Form className="form-regise" onSubmit={handleSubmit}>
// //               <h5 className="parallelogram-bg">Personal Information</h5>
// //               <Row xs={1} md={2}>
// //                 <Form.Group
// //                   as={Col}
// //                   controlId="formGridfullName"
// //                   className="mb-3"
// //                 >
// //                   <Form.Label>Full Name</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     name="fullName"
// //                     className="form-input"
// //                     value={formData.fullName}
// //                     onChange={handleChange}
// //                     placeholder="Enter full name"
// //                     required
// //                   />
// //                 </Form.Group>
// //                 <Form.Group
// //                   as={Col}
// //                   controlId="formGridAddress"
// //                   className="mb-3"
// //                 >
// //                   <Form.Label>Address</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     name="address"
// //                     placeholder="Enter address"
// //                     className="form-input"
// //                     value={formData.address}
// //                     onChange={handleChange}
// //                     required
// //                   />
// //                 </Form.Group>
// //               </Row>
// //               <Row xs={1} md={3}>
// //                 <Form.Group
// //                   as={Col}
// //                   controlId="formGridContactNo"
// //                   className="mb-3"
// //                 >
// //                   <Form.Label>Contact No</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     name="contactNo"
// //                     className="form-input"
// //                     placeholder="Enter contact number"
// //                     value={formData.contactNo}
// //                     onChange={handleChange}
// //                     required
// //                   />
// //                 </Form.Group>
// //                 <Form.Group as={Col} controlId="formGridEmail" className="mb-3">
// //                   <Form.Label>Email</Form.Label>
// //                   <Form.Control
// //                     type="email"
// //                     name="email"
// //                     placeholder="Enter email address"
// //                     className="form-input"
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                     required
// //                   />
// //                 </Form.Group>
// //                 <Form.Group
// //                   as={Col}
// //                   controlId="formGridGender"
// //                   className="mb-3"
// //                 >
// //                   <Form.Label>Gender</Form.Label>
// //                   <Form.Select
// //                     name="gender"
// //                     value={formData.gender}
// //                     onChange={handleChange}
// //                     className="form-input text-secondary"
// //                     required
// //                   >
// //                     <option value="">Choose...</option>
// //                     <option value="male">Male</option>
// //                     <option value="female">Female</option>
// //                   </Form.Select>
// //                 </Form.Group>
// //               </Row>
// //               <Row xs={1} md={3}>
// //                 <Form.Group as={Col} controlId="formGridDob" className="mb-3">
// //                   <Form.Label>Date Of Birth</Form.Label>
// //                   <Form.Control
// //                     type="date"
// //                     name="dob"
// //                     className="form-input text-secondary"
// //                     value={formData.dob}
// //                     onChange={handleChange}
// //                     max={new Date().toISOString().split("T")[0]}
// //                     required
// //                   />
// //                 </Form.Group>

// //                 <Form.Group as={Col} controlId="formGridAge" className="mb-3">
// //                   <Form.Label>Age</Form.Label>
// //                   <Form.Control
// //                     type="number"
// //                     name="age"
// //                     className="form-input"
// //                     value={formData.age}
// //                     readOnly
// //                   />
// //                 </Form.Group>

// //                 <Form.Group
// //                   as={Col}
// //                   controlId="formGridSchoolName"
// //                   className="mb-3"
// //                 >
// //                   <Form.Label>School Name</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     name="schoolName"
// //                     className="form-input"
// //                     value={formData.schoolName}
// //                     onChange={handleChange}
// //                     placeholder="Enter school name"
// //                     required
// //                   />
// //                 </Form.Group>
// //                 <small> </small>
// //               </Row>

// //               {/* parent info */}
// //               <h5 className="parallelogram-bg mt-4">
// //                 Parent/Guardian Information
// //               </h5>

// //               <Row xs={1} md={2}>
// //                 <Form.Group
// //                   as={Col}
// //                   controlId="formGridParentName"
// //                   className="mb-3"
// //                 >
// //                   <Form.Label>Parent/Guardian Name</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     name="parentName"
// //                     className="form-input"
// //                     placeholder="Enter Parent name"
// //                     value={formData.parentName}
// //                     onChange={handleChange}
// //                     required
// //                   />
// //                 </Form.Group>
// //                 <Form.Group
// //                   as={Col}
// //                   controlId="formGridParentContactNo"
// //                   className="mb-3"
// //                 >
// //                   <Form.Label>Contact Number</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     name="parentContactNo"
// //                     className="form-input"
// //                     placeholder="Enter contact number"
// //                     value={formData.parentContactNo}
// //                     onChange={handleChange}
// //                     required
// //                   />
// //                 </Form.Group>
// //               </Row>
// //               <Row xs={1} md={2}>
// //                 <Form.Group
// //                   as={Col}
// //                   controlId="formGridParentAddress"
// //                   className="mb-3"
// //                 >
// //                   <Form.Label>Home Address </Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     name="parentAddress"
// //                     placeholder="Enter address"
// //                     className="form-input"
// //                     value={formData.parentAddress}
// //                     onChange={handleChange}
// //                     required
// //                   />
// //                 </Form.Group>

// //                 <Form.Group
// //                   as={Col}
// //                   controlId="formGridParentEmail"
// //                   className="mb-3"
// //                 >
// //                   <Form.Label>Email Address</Form.Label>
// //                   <Form.Control
// //                     type="email"
// //                     name="parentEmail"
// //                     placeholder="Enter Email address"
// //                     className="form-input"
// //                     value={formData.parentEmail}
// //                     onChange={handleChange}
// //                     required
// //                   />
// //                 </Form.Group>
// //               </Row>

// //               <h5 className="parallelogram-bg mt-4">Sports Selection</h5>
// //               <Row xs={1} md={2}>
// //                 <Form.Group
// //                   as={Col}
// //                   controlId="formGridSports"
// //                   className="mb-3"
// //                 >
// //                   <Form.Label>Sports</Form.Label>
// //                   <Form.Select
// //                     name="sports"
// //                     value={formData.sports}
// //                     onChange={handleChange}
// //                     className="form-input text-secondary"
// //                     required
// //                   >
// //                     <option value="">Select a Sport ...</option>
// //                     <option value="football">Football</option>
// //                     <option value="futsal">Futsal</option>
// //                     <option value="cricket">Cricket</option>
// //                     <option value="swimming">Swimming</option>
// //                     <option value="tennis">Tennis</option>
// //                   </Form.Select>
// //                 </Form.Group>

// //                 <Form.Group
// //                   as={Col}
// //                   controlId="formGridCategory"
// //                   className="mb-3"
// //                 >
// //                   <Form.Label>Category</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     name="category"
// //                     className="form-input"
// //                     value={formData.category}
// //                     readOnly
// //                   />
// //                 </Form.Group>

// //                 <Form.Group
// //                   as={Col}
// //                   controlId="formGridCategory"
// //                   className="mb-3"
// //                 >
// //                   <Form.Label>Training Days</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     name="days"
// //                     className="form-input"
// //                     value={formData.days}
// //                     readOnly
// //                   />
// //                 </Form.Group>

// //                 <Form.Group as={Col} controlId="formGridTime" className="mb-3">
// //                   <Form.Label>Preferred Training Time</Form.Label>
// //                   <Form.Select
// //                     name="time"
// //                     value={formData.time}
// //                     onChange={handleChange}
// //                     className="form-input text-secondary"
// //                     required
// //                   >
// //                     <option value="">Select from available slots </option>
// //                     <option value="3:00 PM - 4:30 PM">3:00 PM - 4:30 PM</option>
// //                     <option value="4:30 PM - 6:00 PM">4:30 PM - 6:00 PM</option>
// //                   </Form.Select>
// //                 </Form.Group>
// //               </Row>

// //               <h5 className="mt-4 parallelogram-bg">
// //                 MEDICAL & EMERGENCY INFORMATION
// //               </h5>
// //               <Row xs={1} md={2}>
// //                 {/* Medical Conditions or Allergies */}
// //                 <Form.Group
// //                   as={Col}
// //                   controlId="formGridMedicalConditions"
// //                   className="mb-3"
// //                 >
// //                   <Form.Label>
// //                     Does the participant have any medical conditions or
// //                     allergies?
// //                   </Form.Label>
// //                   <div>
// //                     <Form.Check
// //                       type="radio"
// //                       label="Yes"
// //                       name="hasMedicalConditions"
// //                       value="yes"
// //                       onChange={handleChange}
// //                       className="custom-radio"
// //                       inline
// //                     />
// //                     <Form.Check
// //                       type="radio"
// //                       label="No"
// //                       name="hasMedicalConditions"
// //                       value="no"
// //                       onChange={handleChange}
// //                       inline
// //                       className="custom-radio"
// //                     />
// //                   </div>

// //                   {formData.hasMedicalConditions === "yes" && (
// //                     <Form.Control
// //                       type="text"
// //                       name="medicalDetails"
// //                       className="form-input mt-2"
// //                       value={formData.medicalDetails}
// //                       onChange={handleChange}
// //                       placeholder="Please specify"
// //                       required
// //                     />
// //                   )}
// //                 </Form.Group>

// //                 <Form.Group
// //                   as={Col}
// //                   controlId="formGridMedicalInsurance"
// //                   className="mb-3"
// //                 >
// //                   <Form.Label>
// //                     Does the participant have medical insurance?
// //                   </Form.Label>
// //                   <div>
// //                     <Form.Check
// //                       type="radio"
// //                       label="Yes"
// //                       name="hasMedicalInsurance"
// //                       value="yes"
// //                       onChange={handleChange}
// //                       className="custom-radio"
// //                       inline
// //                     />
// //                     <Form.Check
// //                       type="radio"
// //                       label="No"
// //                       name="hasMedicalInsurance"
// //                       value="no"
// //                       onChange={handleChange}
// //                       inline
// //                       className="custom-radio"
// //                     />
// //                   </div>

// //                   {formData.hasMedicalInsurance === "yes" && (
// //                     <Form.Control
// //                       type="text"
// //                       name="insuranceNo"
// //                       className="form-input mt-2"
// //                       value={formData.insuranceNo}
// //                       onChange={handleChange}
// //                       placeholder="Please Enter Your Insurance Number"
// //                       required
// //                     />
// //                   )}
// //                 </Form.Group>
// //               </Row>

// //               <br />
// //               {/* emergency contact person */}

// //               <Row xs={1} md={2}>
// //                 <Form.Group
// //                   as={Col}
// //                   controlId="formGridTransportation"
// //                   className="mb-3"
// //                 >
// //                   <Form.Label>
// //                     Do You Require Transportation services?
// //                   </Form.Label>
// //                   <div>
// //                     <Form.Check
// //                       type="radio"
// //                       label="Yes"
// //                       name="transportation"
// //                       value="yes"
// //                       onChange={handleChange}
// //                       checked={formData.transportation === "yes"}
// //                       className="custom-radio"
// //                       inline
// //                     />
// //                     <Form.Check
// //                       type="radio"
// //                       label="No"
// //                       name="transportation"
// //                       value="no"
// //                       onChange={handleChange}
// //                       checked={formData.transportation === "no"}
// //                       inline
// //                       className="custom-radio"
// //                     />
// //                   </div>
// //                 </Form.Group>
// //               </Row>

// //               <Row xs={1} md={2}>
// //                 {/* Emergency Contact Name */}
// //                 <Form.Group
// //                   as={Col}
// //                   controlId="formGridEmergencyContactName"
// //                   className="mb-3"
// //                 >
// //                   <Form.Label>Emergency Contact Person Name</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     name="emergencyContactname"
// //                     className="form-input"
// //                     value={formData.emergencyContactname}
// //                     onChange={handleChange}
// //                     placeholder="Enter emergency contact name"
// //                     required
// //                   />
// //                 </Form.Group>

// //                 {/* Emergency Contact Number */}
// //                 <Form.Group
// //                   as={Col}
// //                   controlId="formGridEmergencyContactNumber"
// //                   className="mb-3"
// //                 >
// //                   <Form.Label>Emergency Contact Person Number</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     name="emergencyContactNumber"
// //                     className="form-input"
// //                     value={formData.emergencyContactNumber}
// //                     onChange={handleChange}
// //                     placeholder="Enter emergency contact number"
// //                     required
// //                   />
// //                 </Form.Group>
// //               </Row>
// //               <br />
// //               <Row>
// //                 <Form.Group as={Col} controlId="formGridNotes" className="mb-3">
// //                   <Form.Check
// //                     type="checkbox"
// //                           name="notes"
// //                     label=" I want to receive updates about new programs, special offers, and announcements from Thunderbolts Development Center."
// //                     checked={formData.notes || false}
// //                     className="custom-radio"
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, notes: e.target.checked })
// //                     }
// //                   />
// //                 </Form.Group>
// //               </Row>
// //               <Row>
// //                 <Form.Group
// //                   as={Col}
// //                   controlId="formGridAgreement"
// //                   className="mb-3"
// //                 >
// //                   <Form.Check
// //                     type="checkbox"
// //                     label="I acknowledge and accept the agreement terms for participation in Thunderbolts Development Center sports programs."
// //                     checked={formData.agreement}
// //                     className="custom-radio"
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, agreement: e.target.checked })
// //                     }
// //                   />
// //                 </Form.Group>
// //               </Row>

// //               {formError && <Alert variant="danger">{formError}</Alert>}
// //               <div className="button-container mt-4">
// //                 <Button
// //                   type="submit"
// //                   disabled={isSubmitting}
// //                   className="paynow-btn"
// //                 >
// //                   {isSubmitting ? (
// //                     <Spinner animation="border" size="sm" />
// //                   ) : (
// //                     "Register Here"
// //                   )}
// //                 </Button>
// //               </div>
// //             </Form>
// //           )}
// //         </div>
// //       </Container>
// //     </div>
// //   );
// // };

// // export default RegistrationPage;

// //////////////////////////////lastr checking //////////////////////////////////////////
// import axios from "axios";
// import { useState } from "react";
// import {
//   Alert,
//   Button,
//   Col,
//   Container,
//   Form,
//   Row,
//   Spinner,
// } from "react-bootstrap";

// import "./RegistrationPage.scss";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const RegistrationPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     address: "",
//     contactNo: "",
//     email: "",
//     dob: "",
//     age: "",
//     gender: "",
//     schoolName: "",
//     parentName: "",
//     parentEmail: "",
//     parentContactNo: "",
//     parentAddress: "",
//     sports: "",
//     time: "",
//     category: "",
//     days: "",
//     emergencyContactname: "",
//     emergencyContactNumber: "",
//     hasMedicalConditions: "",
//     medicalDetails: "",
//     hasMedicalInsurance: "",
//     insuranceNo: "",
//     transportation: "",
//     paymentMethod: "fonepay",
//     notes: false,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [formError, setFormError] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "dob") {
//       const birthDate = new Date(value);
//       const today = new Date();
//       let calculatedAge = today.getFullYear() - birthDate.getFullYear();

//       // Check if the birthday has passed this year
//       const monthDiff = today.getMonth() - birthDate.getMonth();
//       if (
//         monthDiff < 0 ||
//         (monthDiff === 0 && today.getDate() < birthDate.getDate())
//       ) {
//         calculatedAge--;
//       }

//       // Determine the category based on age
//       let category = "";
//       let days = "";
//       if (calculatedAge >= 6 && calculatedAge <= 11) {
//         category = "Grassroots";
//         days = "Tuesday & Thursday";
//       } else if (calculatedAge >= 12 && calculatedAge <= 15) {
//         category = "Intermediate";
//         days = "Monday, Wednesday & Friday";
//       } else if (calculatedAge >= 16 && calculatedAge <= 19) {
//         category = "Senior";
//         days = "Monday, Wednesday & Friday";
//       } else if (calculatedAge > 19) {
//         // alert("You are not eligible  to participate");
//         toast.warning("Your age  must be between 6 and 19 years old.");
//         return;
//       }
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         dob: value,
//         age: calculatedAge.toString(),
//         category,
//         days,
//       }));
//     } else {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: value,
//       }));
//     }
//   };

//   const validateForm = () => {
//     if (
//       !formData.fullName ||
//       !formData.contactNo ||
//       !formData.email ||
//       !formData.age ||
//       !formData.address ||
//       !formData.dob ||
//       !formData.age ||
//       !formData.gender ||
//       !formData.schoolName ||
//       !formData.parentName ||
//       !formData.parentEmail ||
//       !formData.parentContactNo ||
//       !formData.parentAddress ||
//       !formData.sports ||
//       !formData.time ||
//       !formData.category ||
//       !formData.emergencyContactNumber ||
//       !formData.emergencyContactname ||
//       !formData.hasMedicalConditions ||
//       (formData.hasMedicalConditions === "yes" && !formData.medicalDetails) ||
//       (formData.hasMedicalInsurance === "yes" && !formData.insuranceNo) ||
//       !formData.transportation ||
//       !formData.paymentMethod ||
//       formData.agreement !== true
//     ) {
//       setFormError("Please fill in all required fields.");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError(null);

//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     const amount = import.meta.env.VITE_CASH;
// const dataToSend={ ...formData,amount}
//     try {
//       const response = await axios.post(
//         "/api/tdc/pre-check-registration",

//         dataToSend,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.success) {
//         // Store form data and PRN in sessionStorage
//         sessionStorage.setItem("formData", JSON.stringify(formData));
//         sessionStorage.setItem("prn", response.data.prn);
//         sessionStorage.setItem("fee", response.data.amount);

//         // Navigate to the payment page
//         navigate("/tdc-payment-form", {
//           state: {
//             formData,
//             fee: amount,
//             prn: response.data.prn,
//           },
//         });
//       } else {
//         // If pre-check fails, display the error message
//         setFormError(response.data.message || "Pre-registration check failed.");
//       }

//       toast.info("Please proceed to payment for Registration");
//     } catch (error) {
//       console.error(
//         "Error submitting form:",
//         error.response?.data || error.message
//       );

//       if (error.response && error.response.data) {
//         setFormError(
//           error.response.data.message ||
//             "Failed to submit the form. Please try again."
//         );
//       } else {
//         setFormError("Failed to submit the form. Please try again.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="register-page">
//       <Container>
//         <div className="text-thi d-flex align-items-center flex-column jusify-content-center">
//           <h1 className="headingTDC">THUNDERBOLTS DEVELOPMENT CENTER</h1>
//           <p className="text-center pt-2 ">
//             Thank you for choosing Thunderbolts Development Center (TDC) for
//             your child's sports development. <br /> Please fill out the form
//             below to complete the registration process.
//           </p>
//         </div>

//         <div className="from-regis">
//           {error && <Alert variant="danger">{error}</Alert>}
//           {loading ? (
//             <div className="text-center">
//               <Spinner animation="border" />
//             </div>
//           ) : (
//             <Form className="form-regise" onSubmit={handleSubmit}>
//               <h5 className="parallelogram-bg">Personal Information</h5>
//               <Row xs={1} md={2}>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridfullName"
//                   className="mb-3"
//                 >
//                   <Form.Label>Full Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="fullName"
//                     className="form-input"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     placeholder="Enter full name"
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridAddress"
//                   className="mb-3"
//                 >
//                   <Form.Label>Address</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="address"
//                     placeholder="Enter address"
//                     className="form-input"
//                     value={formData.address}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Row>
//               <Row xs={1} md={3}>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridContactNo"
//                   className="mb-3"
//                 >
//                   <Form.Label>Contact No</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="contactNo"
//                     className="form-input"
//                     placeholder="Enter contact number"
//                     value={formData.contactNo}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group as={Col} controlId="formGridEmail" className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     placeholder="Enter email address"
//                     className="form-input"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridGender"
//                   className="mb-3"
//                 >
//                   <Form.Label>Gender</Form.Label>
//                   <Form.Select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                     className="form-input text-secondary"
//                     required
//                   >
//                     <option value="">Choose...</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Row>
//               <Row xs={1} md={3}>
//                 <Form.Group as={Col} controlId="formGridDob" className="mb-3">
//                   <Form.Label>Date Of Birth</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="dob"
//                     className="form-input text-secondary"
//                     value={formData.dob}
//                     onChange={handleChange}
//                     max={new Date().toISOString().split("T")[0]}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group as={Col} controlId="formGridAge" className="mb-3">
//                   <Form.Label>Age</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="age"
//                     className="form-input"
//                     value={formData.age}
//                     readOnly
//                   />
//                 </Form.Group>

//                 <Form.Group
//                   as={Col}
//                   controlId="formGridSchoolName"
//                   className="mb-3"
//                 >
//                   <Form.Label>School Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="schoolName"
//                     className="form-input"
//                     value={formData.schoolName}
//                     onChange={handleChange}
//                     placeholder="Enter school name"
//                     required
//                   />
//                 </Form.Group>
//                 <small> </small>
//               </Row>

//               {/* parent info */}
//               <h5 className="parallelogram-bg mt-4">
//                 Parent/Guardian Information
//               </h5>

//               <Row xs={1} md={2}>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridParentName"
//                   className="mb-3"
//                 >
//                   <Form.Label>Parent/Guardian Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="parentName"
//                     className="form-input"
//                     placeholder="Enter Parent name"
//                     value={formData.parentName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridParentContactNo"
//                   className="mb-3"
//                 >
//                   <Form.Label>Contact Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="parentContactNo"
//                     className="form-input"
//                     placeholder="Enter contact number"
//                     value={formData.parentContactNo}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Row>
//               <Row xs={1} md={2}>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridParentAddress"
//                   className="mb-3"
//                 >
//                   <Form.Label>Home Address </Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="parentAddress"
//                     placeholder="Enter address"
//                     className="form-input"
//                     value={formData.parentAddress}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group
//                   as={Col}
//                   controlId="formGridParentEmail"
//                   className="mb-3"
//                 >
//                   <Form.Label>Email Address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="parentEmail"
//                     placeholder="Enter Email address"
//                     className="form-input"
//                     value={formData.parentEmail}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Row>

//               <h5 className="parallelogram-bg mt-4">Sports Selection</h5>
//               <Row xs={1} md={2}>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridSports"
//                   className="mb-3"
//                 >
//                   <Form.Label>Sports</Form.Label>
//                   <Form.Select
//                     name="sports"
//                     value={formData.sports}
//                     onChange={handleChange}
//                     className="form-input text-secondary"
//                     required
//                   >
//                     <option value="">Select a Sport ...</option>
//                     <option value="football">Football</option>
//                     <option value="futsal">Futsal</option>
//                     <option value="cricket">Cricket</option>
//                     <option value="swimming">Swimming</option>
//                     <option value="tennis">Tennis</option>
//                   </Form.Select>
//                 </Form.Group>

//                 <Form.Group
//                   as={Col}
//                   controlId="formGridCategory"
//                   className="mb-3"
//                 >
//                   <Form.Label>Category</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="category"
//                     className="form-input"
//                     value={formData.category}
//                     readOnly
//                   />
//                 </Form.Group>

//                 <Form.Group
//                   as={Col}
//                   controlId="formGridCategory"
//                   className="mb-3"
//                 >
//                   <Form.Label>Training Days</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="days"
//                     className="form-input"
//                     value={formData.days}
//                     readOnly
//                   />
//                 </Form.Group>

//                 <Form.Group as={Col} controlId="formGridTime" className="mb-3">
//                   <Form.Label>Preferred Training Time</Form.Label>
//                   <Form.Select
//                     name="time"
//                     value={formData.time}
//                     onChange={handleChange}
//                     className="form-input text-secondary"
//                     required
//                   >
//                     <option value="">Select from available slots </option>
//                     <option value="3:00 PM - 4:30 PM">3:00 PM - 4:30 PM</option>
//                     <option value="4:30 PM - 6:00 PM">4:30 PM - 6:00 PM</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Row>

//               <h5 className="mt-4 parallelogram-bg">
//                 MEDICAL & EMERGENCY INFORMATION
//               </h5>
//               <Row xs={1} md={2}>
//                 {/* Medical Conditions or Allergies */}
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridMedicalConditions"
//                   className="mb-3"
//                 >
//                   <Form.Label>
//                     Does the participant have any medical conditions or
//                     allergies?
//                   </Form.Label>
//                   <div>
//                     <Form.Check
//                       type="radio"
//                       label="Yes"
//                       name="hasMedicalConditions"
//                       value="yes"
//                       onChange={handleChange}
//                       className="custom-radio"
//                       inline
//                     />
//                     <Form.Check
//                       type="radio"
//                       label="No"
//                       name="hasMedicalConditions"
//                       value="no"
//                       onChange={handleChange}
//                       inline
//                       className="custom-radio"
//                     />
//                   </div>

//                   {formData.hasMedicalConditions === "yes" && (
//                     <Form.Control
//                       type="text"
//                       name="medicalDetails"
//                       className="form-input mt-2"
//                       value={formData.medicalDetails}
//                       onChange={handleChange}
//                       placeholder="Please specify"
//                       required
//                     />
//                   )}
//                 </Form.Group>

//                 <Form.Group
//                   as={Col}
//                   controlId="formGridMedicalInsurance"
//                   className="mb-3"
//                 >
//                   <Form.Label>
//                     Does the participant have medical insurance?
//                   </Form.Label>
//                   <div>
//                     <Form.Check
//                       type="radio"
//                       label="Yes"
//                       name="hasMedicalInsurance"
//                       value="yes"
//                       onChange={handleChange}
//                       className="custom-radio"
//                       inline
//                     />
//                     <Form.Check
//                       type="radio"
//                       label="No"
//                       name="hasMedicalInsurance"
//                       value="no"
//                       onChange={handleChange}
//                       inline
//                       className="custom-radio"
//                     />
//                   </div>

//                   {formData.hasMedicalInsurance === "yes" && (
//                     <Form.Control
//                       type="text"
//                       name="insuranceNo"
//                       className="form-input mt-2"
//                       value={formData.insuranceNo}
//                       onChange={handleChange}
//                       placeholder="Please Enter Your Insurance Number"
//                       required
//                     />
//                   )}
//                 </Form.Group>
//               </Row>

//               <br />
//               {/* emergency contact person */}

//               <Row xs={1} md={2}>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridTransportation"
//                   className="mb-3"
//                 >
//                   <Form.Label>
//                     Do You Require Transportation services?
//                   </Form.Label>
//                   <div>
//                     <Form.Check
//                       type="radio"
//                       label="Yes"
//                       name="transportation"
//                       value="yes"
//                       onChange={handleChange}
//                       checked={formData.transportation === "yes"}
//                       className="custom-radio"
//                       inline
//                     />
//                     <Form.Check
//                       type="radio"
//                       label="No"
//                       name="transportation"
//                       value="no"
//                       onChange={handleChange}
//                       checked={formData.transportation === "no"}
//                       inline
//                       className="custom-radio"
//                     />
//                   </div>
//                 </Form.Group>
//               </Row>

//               <Row xs={1} md={2}>
//                 {/* Emergency Contact Name */}
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridEmergencyContactName"
//                   className="mb-3"
//                 >
//                   <Form.Label>Emergency Contact Person Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="emergencyContactname"
//                     className="form-input"
//                     value={formData.emergencyContactname}
//                     onChange={handleChange}
//                     placeholder="Enter emergency contact name"
//                     required
//                   />
//                 </Form.Group>

//                 {/* Emergency Contact Number */}
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridEmergencyContactNumber"
//                   className="mb-3"
//                 >
//                   <Form.Label>Emergency Contact Person Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="emergencyContactNumber"
//                     className="form-input"
//                     value={formData.emergencyContactNumber}
//                     onChange={handleChange}
//                     placeholder="Enter emergency contact number"
//                     required
//                   />
//                 </Form.Group>
//               </Row>
//               <br />
//               <Row>
//                 <Form.Group as={Col} controlId="formGridNotes" className="mb-3">
//                   <Form.Check
//                     type="checkbox"
//                           name="notes"
//                     label=" I want to receive updates about new programs, special offers, and announcements from Thunderbolts Development Center."
//                     checked={formData.notes || false}
//                     className="custom-radio"
//                     onChange={(e) =>
//                       setFormData({ ...formData, notes: e.target.checked })
//                     }
//                   />
//                 </Form.Group>
//               </Row>
//               <Row>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridAgreement"
//                   className="mb-3"
//                 >
//                   <Form.Check
//                     type="checkbox"
//                     label="I acknowledge and accept the agreement terms for participation in Thunderbolts Development Center sports programs."
//                     checked={formData.agreement}
//                     className="custom-radio"
//                     onChange={(e) =>
//                       setFormData({ ...formData, agreement: e.target.checked })
//                     }
//                   />
//                 </Form.Group>
//               </Row>

//               {formError && <Alert variant="danger">{formError}</Alert>}
//               <div className="button-container mt-4">
//                 <Button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="paynow-btn"
//                 >
//                   {isSubmitting ? (
//                     <Spinner animation="border" size="sm" />
//                   ) : (
//                     "Register Here"
//                   )}
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default RegistrationPage;

// import axios from "axios";
// import { useState } from "react";
// import {
//   Alert,
//   Button,
//   Col,
//   Container,
//   Form,
//   Row,
//   Spinner,
// } from "react-bootstrap";

// import "./RegistrationPage.scss";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const RegistrationPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     address: "",
//     contactNo: "",
//     email: "",
//     dob: "",
//     age: "",
//     gender: "",
//     schoolName: "",
//     parentName: "",
//     parentEmail: "",
//     parentContactNo: "",
//     parentAddress: "",
//     sports: "",
//     time: "",
//     category: "",
//     days: "",
//     emergencyContactname: "",
//     emergencyContactNumber: "",
//     hasMedicalConditions: "",
//     medicalDetails: "",
//     hasMedicalInsurance: "",
//     insuranceNo: "",
//     transportation: "",
//     paymentMethod: "fonepay",
//     notes: false,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [formError, setFormError] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "dob") {
//       const birthDate = new Date(value);
//       const today = new Date();
//       let calculatedAge = today.getFullYear() - birthDate.getFullYear();

//       // Check if the birthday has passed this year
//       const monthDiff = today.getMonth() - birthDate.getMonth();
//       if (
//         monthDiff < 0 ||
//         (monthDiff === 0 && today.getDate() < birthDate.getDate())
//       ) {
//         calculatedAge--;
//       }

//       // Determine the category based on age
//       let category = "";
//       let days = "";
//       if (calculatedAge >= 6 && calculatedAge <= 11) {
//         category = "Grassroots";
//         days = "Tuesday & Thursday";
//       } else if (calculatedAge >= 12 && calculatedAge <= 15) {
//         category = "Intermediate";
//         days = "Monday, Wednesday & Friday";
//       } else if (calculatedAge >= 16 && calculatedAge <= 19) {
//         category = "Senior";
//         days = "Monday, Wednesday & Friday";
//       } else if (calculatedAge > 19) {
//         // alert("You are not eligible  to participate");
//         toast.warning("Your age  must be between 6 and 19 years old.");
//         return;
//       }
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         dob: value,
//         age: calculatedAge.toString(),
//         category,
//         days,
//       }));
//     } else {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         [name]: value,
//       }));
//     }
//   };

//   const validateForm = () => {
//     if (
//       !formData.fullName ||
//       !formData.contactNo ||
//       !formData.email ||
//       !formData.age ||
//       !formData.address ||
//       !formData.dob ||
//       !formData.age ||
//       !formData.gender ||
//       !formData.schoolName ||
//       !formData.parentName ||
//       !formData.parentEmail ||
//       !formData.parentContactNo ||
//       !formData.parentAddress ||
//       !formData.sports ||
//       !formData.time ||
//       !formData.category ||
//       !formData.emergencyContactNumber ||
//       !formData.emergencyContactname ||
//       !formData.hasMedicalConditions ||
//       (formData.hasMedicalConditions === "yes" && !formData.medicalDetails) ||
//       (formData.hasMedicalInsurance === "yes" && !formData.insuranceNo) ||
//       !formData.transportation ||
//       !formData.paymentMethod ||
//       formData.agreement !== true
//     ) {
//       setFormError("Please fill in all required fields.");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError(null);

//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     const amount = import.meta.env.VITE_CASH;

//     const dataToSend = { ...formData, amount };
//     try {
//       const response = await axios.post(
//         "/api/tdc/pre-check-registration",

//         dataToSend,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.success) {
//         // Store form data and PRN in sessionStorage
//         sessionStorage.setItem("formData", JSON.stringify(formData));
//         sessionStorage.setItem("prn", response.data.prn);

//         // Navigate to the payment page
//         navigate("/tdc-payment-form", {
//           state: {
//             formData,
//             fee: amount,
//             prn: response.data.prn,
//           },
//         });
//       } else {
//         // If pre-check fails, display the error message
//         setFormError(response.data.message || "Pre-registration check failed.");
//       }

//       toast.info("Please proceed to payment for Registration");
//     } catch (error) {
//       console.error(
//         "Error submitting form:",
//         error.response?.data || error.message
//       );

//       if (error.response && error.response.data) {
//         setFormError(
//           error.response.data.message ||
//             "Failed to submit the form. Please try again."
//         );
//       } else {
//         setFormError("Failed to submit the form. Please try again.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="register-page">
//       <Container>
//         <div className="text-thi d-flex align-items-center flex-column jusify-content-center">
//           <h1 className="headingTDC">THUNDERBOLTS DEVELOPMENT CENTER</h1>
//           <p className="text-center pt-2 ">
//             Thank you for choosing Thunderbolts Development Center (TDC) for
//             your child's sports development. <br /> Please fill out the form
//             below to complete the registration process.
//           </p>
//         </div>

//         <div className="from-regis">
//           {error && <Alert variant="danger">{error}</Alert>}
//           {loading ? (
//             <div className="text-center">
//               <Spinner animation="border" />
//             </div>
//           ) : (
//             <Form className="form-regise" onSubmit={handleSubmit}>
//               <h5 className="parallelogram-bg">Personal Information</h5>
//               <Row xs={1} md={2}>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridfullName"
//                   className="mb-3"
//                 >
//                   <Form.Label>Full Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="fullName"
//                     className="form-input"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     placeholder="Enter full name"
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridAddress"
//                   className="mb-3"
//                 >
//                   <Form.Label>Address</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="address"
//                     placeholder="Enter address"
//                     className="form-input"
//                     value={formData.address}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Row>
//               <Row xs={1} md={3}>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridContactNo"
//                   className="mb-3"
//                 >
//                   <Form.Label>Contact No</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="contactNo"
//                     className="form-input"
//                     placeholder="Enter contact number"
//                     value={formData.contactNo}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group as={Col} controlId="formGridEmail" className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     placeholder="Enter email address"
//                     className="form-input"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridGender"
//                   className="mb-3"
//                 >
//                   <Form.Label>Gender</Form.Label>
//                   <Form.Select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                     className="form-input text-secondary"
//                     required
//                   >
//                     <option value="">Choose...</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Row>
//               <Row xs={1} md={3}>
//                 <Form.Group as={Col} controlId="formGridDob" className="mb-3">
//                   <Form.Label>Date Of Birth</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="dob"
//                     className="form-input text-secondary"
//                     value={formData.dob}
//                     onChange={handleChange}
//                     max={new Date().toISOString().split("T")[0]}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group as={Col} controlId="formGridAge" className="mb-3">
//                   <Form.Label>Age</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="age"
//                     className="form-input"
//                     value={formData.age}
//                     readOnly
//                   />
//                 </Form.Group>

//                 <Form.Group
//                   as={Col}
//                   controlId="formGridSchoolName"
//                   className="mb-3"
//                 >
//                   <Form.Label>School Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="schoolName"
//                     className="form-input"
//                     value={formData.schoolName}
//                     onChange={handleChange}
//                     placeholder="Enter school name"
//                     required
//                   />
//                 </Form.Group>
//                 <small> </small>
//               </Row>

//               {/* parent info */}
//               <h5 className="parallelogram-bg mt-4">
//                 Parent/Guardian Information
//               </h5>

//               <Row xs={1} md={2}>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridParentName"
//                   className="mb-3"
//                 >
//                   <Form.Label>Parent/Guardian Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="parentName"
//                     className="form-input"
//                     placeholder="Enter Parent name"
//                     value={formData.parentName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridParentContactNo"
//                   className="mb-3"
//                 >
//                   <Form.Label>Contact Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="parentContactNo"
//                     className="form-input"
//                     placeholder="Enter contact number"
//                     value={formData.parentContactNo}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Row>
//               <Row xs={1} md={2}>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridParentAddress"
//                   className="mb-3"
//                 >
//                   <Form.Label>Home Address </Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="parentAddress"
//                     placeholder="Enter address"
//                     className="form-input"
//                     value={formData.parentAddress}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group
//                   as={Col}
//                   controlId="formGridParentEmail"
//                   className="mb-3"
//                 >
//                   <Form.Label>Email Address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="parentEmail"
//                     placeholder="Enter Email address"
//                     className="form-input"
//                     value={formData.parentEmail}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>
//               </Row>

//               <h5 className="parallelogram-bg mt-4">Sports Selection</h5>
//               <Row xs={1} md={2}>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridSports"
//                   className="mb-3"
//                 >
//                   <Form.Label>Sports</Form.Label>
//                   <Form.Select
//                     name="sports"
//                     value={formData.sports}
//                     onChange={handleChange}
//                     className="form-input text-secondary"
//                     required
//                   >
//                     <option value="">Select a Sport ...</option>
//                     <option value="football">Football</option>
//                     <option value="futsal">Futsal</option>
//                     <option value="cricket">Cricket</option>
//                     <option value="swimming">Swimming</option>
//                     <option value="tennis">Tennis</option>
//                   </Form.Select>
//                 </Form.Group>

//                 <Form.Group
//                   as={Col}
//                   controlId="formGridCategory"
//                   className="mb-3"
//                 >
//                   <Form.Label>Category</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="category"
//                     className="form-input"
//                     value={formData.category}
//                     readOnly
//                   />
//                 </Form.Group>

//                 <Form.Group
//                   as={Col}
//                   controlId="formGridCategory"
//                   className="mb-3"
//                 >
//                   <Form.Label>Training Days</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="days"
//                     className="form-input"
//                     value={formData.days}
//                     readOnly
//                   />
//                 </Form.Group>

//                 <Form.Group as={Col} controlId="formGridTime" className="mb-3">
//                   <Form.Label>Preferred Training Time</Form.Label>
//                   <Form.Select
//                     name="time"
//                     value={formData.time}
//                     onChange={handleChange}
//                     className="form-input text-secondary"
//                     required
//                   >
//                     <option value="">Select from available slots </option>
//                     <option value="3:00 PM - 4:30 PM">3:00 PM - 4:30 PM</option>
//                     <option value="4:30 PM - 6:00 PM">4:30 PM - 6:00 PM</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Row>

//               <h5 className="mt-4 parallelogram-bg">
//                 MEDICAL & EMERGENCY INFORMATION
//               </h5>
//               <Row xs={1} md={2}>
//                 {/* Medical Conditions or Allergies */}
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridMedicalConditions"
//                   className="mb-3"
//                 >
//                   <Form.Label>
//                     Does the participant have any medical conditions or
//                     allergies?
//                   </Form.Label>
//                   <div>
//                     <Form.Check
//                       type="radio"
//                       label="Yes"
//                       name="hasMedicalConditions"
//                       value="yes"
//                       onChange={handleChange}
//                       className="custom-radio"
//                       inline
//                     />
//                     <Form.Check
//                       type="radio"
//                       label="No"
//                       name="hasMedicalConditions"
//                       value="no"
//                       onChange={handleChange}
//                       inline
//                       className="custom-radio"
//                     />
//                   </div>

//                   {formData.hasMedicalConditions === "yes" && (
//                     <Form.Control
//                       type="text"
//                       name="medicalDetails"
//                       className="form-input mt-2"
//                       value={formData.medicalDetails}
//                       onChange={handleChange}
//                       placeholder="Please specify"
//                       required
//                     />
//                   )}
//                 </Form.Group>

//                 <Form.Group
//                   as={Col}
//                   controlId="formGridMedicalInsurance"
//                   className="mb-3"
//                 >
//                   <Form.Label>
//                     Does the participant have medical insurance?
//                   </Form.Label>
//                   <div>
//                     <Form.Check
//                       type="radio"
//                       label="Yes"
//                       name="hasMedicalInsurance"
//                       value="yes"
//                       onChange={handleChange}
//                       className="custom-radio"
//                       inline
//                     />
//                     <Form.Check
//                       type="radio"
//                       label="No"
//                       name="hasMedicalInsurance"
//                       value="no"
//                       onChange={handleChange}
//                       inline
//                       className="custom-radio"
//                     />
//                   </div>

//                   {formData.hasMedicalInsurance === "yes" && (
//                     <Form.Control
//                       type="text"
//                       name="insuranceNo"
//                       className="form-input mt-2"
//                       value={formData.insuranceNo}
//                       onChange={handleChange}
//                       placeholder="Please Enter Your Insurance Number"
//                       required
//                     />
//                   )}
//                 </Form.Group>
//               </Row>

//               <br />
//               {/* emergency contact person */}

//               <Row xs={1} md={2}>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridTransportation"
//                   className="mb-3"
//                 >
//                   <Form.Label>
//                     Do You Require Transportation services?
//                   </Form.Label>
//                   <div>
//                     <Form.Check
//                       type="radio"
//                       label="Yes"
//                       name="transportation"
//                       value="yes"
//                       onChange={handleChange}
//                       checked={formData.transportation === "yes"}
//                       className="custom-radio"
//                       inline
//                     />
//                     <Form.Check
//                       type="radio"
//                       label="No"
//                       name="transportation"
//                       value="no"
//                       onChange={handleChange}
//                       checked={formData.transportation === "no"}
//                       inline
//                       className="custom-radio"
//                     />
//                   </div>
//                 </Form.Group>
//               </Row>

//               <Row xs={1} md={2}>
//                 {/* Emergency Contact Name */}
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridEmergencyContactName"
//                   className="mb-3"
//                 >
//                   <Form.Label>Emergency Contact Person Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="emergencyContactname"
//                     className="form-input"
//                     value={formData.emergencyContactname}
//                     onChange={handleChange}
//                     placeholder="Enter emergency contact name"
//                     required
//                   />
//                 </Form.Group>

//                 {/* Emergency Contact Number */}
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridEmergencyContactNumber"
//                   className="mb-3"
//                 >
//                   <Form.Label>Emergency Contact Person Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="emergencyContactNumber"
//                     className="form-input"
//                     value={formData.emergencyContactNumber}
//                     onChange={handleChange}
//                     placeholder="Enter emergency contact number"
//                     required
//                   />
//                 </Form.Group>
//               </Row>
//               <br />
//               <Row>
//                 <Form.Group as={Col} controlId="formGridNotes" className="mb-3">
//                   <Form.Check
//                     type="checkbox"
//                           name="notes"
//                     label=" I want to receive updates about new programs, special offers, and announcements from Thunderbolts Development Center."
//                     checked={formData.notes || false}
//                     className="custom-radio"
//                     onChange={(e) =>
//                       setFormData({ ...formData, notes: e.target.checked })
//                     }
//                   />
//                 </Form.Group>
//               </Row>
//               <Row>
//                 <Form.Group
//                   as={Col}
//                   controlId="formGridAgreement"
//                   className="mb-3"
//                 >
//                   <Form.Check
//                     type="checkbox"
//                     label="I acknowledge and accept the agreement terms for participation in Thunderbolts Development Center sports programs."
//                     checked={formData.agreement}
//                     className="custom-radio"
//                     onChange={(e) =>
//                       setFormData({ ...formData, agreement: e.target.checked })
//                     }
//                   />
//                 </Form.Group>
//               </Row>

//               {formError && <Alert variant="danger">{formError}</Alert>}
//               <div className="button-container mt-4">
//                 <Button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="paynow-btn"
//                 >
//                   {isSubmitting ? (
//                     <Spinner animation="border" size="sm" />
//                   ) : (
//                     "Register Here"
//                   )}
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default RegistrationPage;

//////////////////////////////lastr checking //////////////////////////////////////////
import axios from "axios";
import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

import "./RegistrationPage.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    contactNo: "",
    email: "",
    dob: "",
    age: "",
    gender: "",
    schoolName: "",
    parentName: "",
    parentEmail: "",
    parentContactNo: "",
    parentAddress: "",
    sports: "",
    time: "",
    category: "",
    days: "",
    emergencyContactname: "",
    emergencyContactNumber: "",
    hasMedicalConditions: "",
    medicalDetails: "",
    hasMedicalInsurance: "",
    insuranceNo: "",
    transportation: "",
    paymentMethod: "fonepay",
    notes: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dob") {
      const birthDate = new Date(value);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();

      // Check if the birthday has passed this year
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        calculatedAge--;
      }

      // Determine the category based on age
      let category = "";
      let days = "";
      if (calculatedAge >= 6 && calculatedAge <= 11) {
        category = "Grassroots";
        days = "Tuesday & Thursday";
      } else if (calculatedAge >= 12 && calculatedAge <= 15) {
        category = "Intermediate";
        days = "Monday, Wednesday & Friday";
      } else if (calculatedAge >= 16 && calculatedAge <= 19) {
        category = "Senior";
        days = "Monday, Wednesday & Friday";
      } else if (calculatedAge > 19) {
        toast.warning("Your age must be between 6 and 19 years old.");
        return;
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        dob: value,
        age: calculatedAge.toString(),
        category,
        days,
        time: "", // Reset time when category changes
      }));
    } else if (name === "sports") {
      // Update days based on sport and category
      let days = formData.days;
      if (formData.category === "Grassroots") {
        days = "Tuesday & Thursday";
      } else if (
        formData.category === "Intermediate" ||
        formData.category === "Senior"
      ) {
        if (value === "futsal") {
          days = "Sunday, Monday, Wednesday & Friday";
        } else {
          days = "Monday, Wednesday & Friday";
        }
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        days,
        time: "", // Reset time when sport changes
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    if (
      !formData.fullName ||
      !formData.contactNo ||
      !formData.email ||
      !formData.age ||
      !formData.address ||
      !formData.dob ||
      !formData.age ||
      !formData.gender ||
      !formData.schoolName ||
      !formData.parentName ||
      !formData.parentEmail ||
      !formData.parentContactNo ||
      !formData.parentAddress ||
      !formData.sports ||
      !formData.time ||
      !formData.category ||
      !formData.emergencyContactNumber ||
      !formData.emergencyContactname ||
      !formData.hasMedicalConditions ||
      (formData.hasMedicalConditions === "yes" && !formData.medicalDetails) ||
      (formData.hasMedicalInsurance === "yes" && !formData.insuranceNo) ||
      !formData.transportation ||
      !formData.paymentMethod ||
      formData.agreement !== true
    ) {
      setFormError("Please fill in all required fields.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    const dataToSend = { ...formData };
    try {
      const response = await axios.post(
        "/api/tdc/submit-registration",

        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response message", response.data);

      if (response.data.success) {
        // Store form data and PRN in sessionStorage
        sessionStorage.setItem("formData", JSON.stringify(formData));

        navigate("/tdc-payment-form", { state: { formData } });
      } else {
        // If pre-check fails, display the error message
        setFormError(response.data.message || "Pre-registration check failed.");
      }

      toast.info("Registration successful");
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );

      if (error.response && error.response.data) {
        setFormError(
          error.response.data.message ||
            "Failed to submit the form. Please try again."
        );
      } else {
        setFormError("Failed to submit the form. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <Container>
        <div className="text-thi d-flex align-items-center flex-column jusify-content-center">
          <h1 className="headingTDC">THUNDERBOLTS DEVELOPMENT CENTER</h1>
          <p className="text-center pt-2 ">
            Thank you for choosing Thunderbolts Development Center (TDC) for
            your child&apos;s sports development. <br /> Please fill out the
            form below to complete the registration process.
          </p>
        </div>

        <div className="from-regis">
          {error && <Alert variant="danger">{error}</Alert>}
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <Form className="form-regise" onSubmit={handleSubmit}>
              <h5 className="parallelogram-bg">Personal Information</h5>
              <Row xs={1} md={2}>
                <Form.Group
                  as={Col}
                  controlId="formGridfullName"
                  className="mb-3"
                >
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    className="form-input"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="formGridAddress"
                  className="mb-3"
                >
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    className="form-input"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Row>
              <Row xs={1} md={3}>
                <Form.Group
                  as={Col}
                  controlId="formGridContactNo"
                  className="mb-3"
                >
                  <Form.Label>Contact No</Form.Label>
                  <Form.Control
                    type="text"
                    name="contactNo"
                    className="form-input"
                    placeholder="Enter contact number"
                    value={formData.contactNo}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="formGridGender"
                  className="mb-3"
                >
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-input text-secondary"
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row xs={1} md={3}>
                <Form.Group as={Col} controlId="formGridDob" className="mb-3">
                  <Form.Label>Date Of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    className="form-input text-secondary"
                    value={formData.dob}
                    onChange={handleChange}
                    max={new Date().toISOString().split("T")[0]}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAge" className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    className="form-input"
                    value={formData.age}
                    readOnly
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridSchoolName"
                  className="mb-3"
                >
                  <Form.Label>School Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="schoolName"
                    className="form-input"
                    value={formData.schoolName}
                    onChange={handleChange}
                    placeholder="Enter school name"
                    required
                  />
                </Form.Group>
                <small> </small>
              </Row>

              {/* sports selection */}

              <h5 className="parallelogram-bg mt-4">Sports Selection</h5>
              <Row xs={1} md={2}>
                <Form.Group
                  as={Col}
                  controlId="formGridSports"
                  className="mb-3"
                >
                  <Form.Label>Sports</Form.Label>
                  <Form.Select
                    name="sports"
                    value={formData.sports}
                    onChange={handleChange}
                    className="form-input text-secondary"
                    required
                  >
                    <option value="">Select a Sport ...</option>
                    <option value="football">Football</option>
                    <option value="futsal">Futsal</option>
                    <option value="cricket">Cricket</option>
                    <option value="swimming">Swimming</option>
                    <option value="tennis">Tennis</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridCategory"
                  className="mb-3"
                >
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    className="form-input"
                    value={formData.category}
                    readOnly
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridCategory"
                  className="mb-3"
                >
                  <Form.Label>Training Days</Form.Label>
                  <Form.Control
                    type="text"
                    name="days"
                    className="form-input"
                    value={formData.days}
                    readOnly
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridTime" className="mb-3">
                  <Form.Label>Preferred Training Time</Form.Label>
                  <Form.Select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="form-input text-secondary"
                    required
                  >
                    <option value="">Select from available slots</option>
                    {formData.category === "Grassroots" ? (
                      <>
                        <option value="3:00 PM - 4:00 PM">
                          3:00 PM - 4:00 PM
                        </option>
                        <option value="4:00 PM - 5:00 PM">
                          4:00 PM - 5:00 PM
                        </option>
                        <option value="5:00 PM - 6:00 PM">
                          5:00 PM - 6:00 PM
                        </option>
                      </>
                    ) : formData.sports === "futsal" ? (
                      <>
                        {/* <option value="9:00 AM - 10:00 AM">
                        Sun: 9:00–10:00 AM | Mon/Wed/Fri: 3:00–4:00 PM
                        </option>
                        <option value="10:00 AM - 11:00 AM">
                        Sun: 10:00–11:00 AM | Mon/Wed/Fri: 4:00–5:00 PM
                        </option>
                        <option value="11:00 AM - 12:00 PM">
                           Sun: 11:00–12:00 PM | Mon/Wed/Fri: 5:00–6:00 PM
                        </option> */}
                         <option value=" Sun: 9:00–10:00 AM | Mon/Wed/Fri: 3:00–4:00 PM">
                        Sun: 9:00–10:00 AM | Mon/Wed/Fri: 3:00–4:00 PM
                        </option>
                        <option value="  Sun: 10:00–11:00 AM | Mon/Wed/Fri: 4:00–5:00 PM">
                        Sun: 10:00–11:00 AM | Mon/Wed/Fri: 4:00–5:00 PM
                        </option>
                        <option value=" Sun: 11:00–12:00 PM | Mon/Wed/Fri: 5:00–6:00 PM">
                           Sun: 11:00–12:00 PM | Mon/Wed/Fri: 5:00–6:00 PM
                        </option>
                      </>
                    ) : (
                      <>
                        <option value="3:00 PM - 4:30 PM">
                          3:00 PM - 4:30 PM
                        </option>
                        <option value="4:30 PM - 6:00 PM">
                          4:30 PM - 6:00 PM
                        </option>
                      </>
                    )}
                  </Form.Select>
                </Form.Group>
              </Row>

              {/* parent info */}
              <h5 className="parallelogram-bg mt-4">
                Parent/Guardian Information
              </h5>
              <Row xs={1} md={2}>
                <Form.Group
                  as={Col}
                  controlId="formGridParentName"
                  className="mb-3"
                >
                  <Form.Label>Parent/Guardian Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="parentName"
                    className="form-input"
                    placeholder="Enter Parent name"
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="formGridParentContactNo"
                  className="mb-3"
                >
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="parentContactNo"
                    className="form-input"
                    placeholder="Enter contact number"
                    value={formData.parentContactNo}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Row>
              <Row xs={1} md={2}>
                <Form.Group
                  as={Col}
                  controlId="formGridParentAddress"
                  className="mb-3"
                >
                  <Form.Label>Home Address </Form.Label>
                  <Form.Control
                    type="text"
                    name="parentAddress"
                    placeholder="Enter address"
                    className="form-input"
                    value={formData.parentAddress}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridParentEmail"
                  className="mb-3"
                >
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="parentEmail"
                    placeholder="Enter Email address"
                    className="form-input"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Row>

              <h5 className="mt-4 parallelogram-bg">
                MEDICAL & EMERGENCY INFORMATION
              </h5>
              <Row xs={1} md={2}>
                {/* Medical Conditions or Allergies */}
                <Form.Group
                  as={Col}
                  controlId="formGridMedicalConditions"
                  className="mb-3"
                >
                  <Form.Label>
                    Does the participant have any medical conditions or
                    allergies?
                  </Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      label="Yes"
                      name="hasMedicalConditions"
                      value="yes"
                      onChange={handleChange}
                      className="custom-radio"
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="hasMedicalConditions"
                      value="no"
                      onChange={handleChange}
                      inline
                      className="custom-radio"
                    />
                  </div>

                  {formData.hasMedicalConditions === "yes" && (
                    <Form.Control
                      type="text"
                      name="medicalDetails"
                      className="form-input mt-2"
                      value={formData.medicalDetails}
                      onChange={handleChange}
                      placeholder="Please specify"
                      required
                    />
                  )}
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridMedicalInsurance"
                  className="mb-3"
                >
                  <Form.Label>
                    Does the participant have medical insurance?
                  </Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      label="Yes"
                      name="hasMedicalInsurance"
                      value="yes"
                      onChange={handleChange}
                      className="custom-radio"
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="hasMedicalInsurance"
                      value="no"
                      onChange={handleChange}
                      inline
                      className="custom-radio"
                    />
                  </div>

                  {formData.hasMedicalInsurance === "yes" && (
                    <Form.Control
                      type="text"
                      name="insuranceNo"
                      className="form-input mt-2"
                      value={formData.insuranceNo}
                      onChange={handleChange}
                      placeholder="Please Enter Your Insurance Number"
                      required
                    />
                  )}
                </Form.Group>
              </Row>

              <br />
              {/* emergency contact person */}

              <Row xs={1} md={2}>
                <Form.Group
                  as={Col}
                  controlId="formGridTransportation"
                  className="mb-3"
                >
                  <Form.Label>
                    Do You Require Transportation services?
                  </Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      label="Yes"
                      name="transportation"
                      value="yes"
                      onChange={handleChange}
                      checked={formData.transportation === "yes"}
                      className="custom-radio"
                      inline
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="transportation"
                      value="no"
                      onChange={handleChange}
                      checked={formData.transportation === "no"}
                      inline
                      className="custom-radio"
                    />
                  </div>
                </Form.Group>
              </Row>

              <Row xs={1} md={2}>
                {/* Emergency Contact Name */}
                <Form.Group
                  as={Col}
                  controlId="formGridEmergencyContactName"
                  className="mb-3"
                >
                  <Form.Label>Emergency Contact Person Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="emergencyContactname"
                    className="form-input"
                    value={formData.emergencyContactname}
                    onChange={handleChange}
                    placeholder="Enter emergency contact name"
                    required
                  />
                </Form.Group>

                {/* Emergency Contact Number */}
                <Form.Group
                  as={Col}
                  controlId="formGridEmergencyContactNumber"
                  className="mb-3"
                >
                  <Form.Label>Emergency Contact Person Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="emergencyContactNumber"
                    className="form-input"
                    value={formData.emergencyContactNumber}
                    onChange={handleChange}
                    placeholder="Enter emergency contact number"
                    required
                  />
                </Form.Group>
              </Row>
              <br />
              <Row>
                <Form.Group as={Col} controlId="formGridNotes" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="notes"
                    label=" I want to receive updates about new programs, special offers, and announcements from Thunderbolts Development Center."
                    checked={formData.notes || false}
                    className="custom-radio"
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.checked })
                    }
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  controlId="formGridAgreement"
                  className="mb-3"
                >
                  <Form.Check
                    type="checkbox"
                    label="I acknowledge and accept the agreement terms for participation in Thunderbolts Development Center sports programs."
                    checked={formData.agreement}
                    className="custom-radio"
                    onChange={(e) =>
                      setFormData({ ...formData, agreement: e.target.checked })
                    }
                  />
                </Form.Group>
              </Row>

              {formError && <Alert variant="danger">{formError}</Alert>}
              <div className="button-container mt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="paynow-btn"
                >
                  {isSubmitting ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Register Here"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </div>
      </Container>
    </div>
  );
};

export default RegistrationPage;
