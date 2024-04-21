// // eslint-disable-next-line no-unused-vars
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import theme from "../../styles/theme";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [isMentor, setIsMentor] = useState(true);

//   const [mentorData, setMentorData] = useState({
//     mentorFirstName: "",
//     mentorLastName: "",
//     mentorExperience: "",
//     mentorCompany: "",
//     mentorDob: "",
//     mentorGender: "",
//     mentorEmail: "",
//     mentorPassword: "",
//     mentorSemester: "",
//     mentorPhoneNumber: "",
//     mentorShift: "",
//     mentorProgram: "",
//   });

//   const [studentData, setStudentData] = useState({
//     studentFirstName: "",
//     studentLastName: "",
//     studentDob: "",
//     studentGender: "",
//     studentEmail: "",
//     studentPassword: "",
//     studentPhoneNumber: "",
//     studentSemester: "",
//     studentShift: "",
//     studentProgram: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (isMentor) {
//       setMentorData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     } else {
//       setStudentData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = isMentor ? mentorData : studentData;

//     const isEmpty = isMentor
//       ? Object.values(mentorData).some((value) => value === "")
//       : Object.values(studentData).some((value) => value === "");

//     if (isEmpty) {
//       toast.error(
//         `Please fill up all the ${isMentor ? "Mentor" : "Student"} fields`,
//         { autoClose: 2000 }
//       );
//       return;
//     }

//     localStorage.setItem(
//       `${isMentor ? "mentor" : "student"}Data`,
//       JSON.stringify(formData)
//     );

//     if (isMentor) {
//       setMentorData({
//         mentorFirstName: "",
//         mentorLastName: "",
//         mentorExperience: "",
//         mentorCompany: "",
//         mentorDob: "",
//         mentorGender: "",
//         mentorEmail: "",
//         mentorPassword: "",
//         mentorSemester: "",
//         mentorPhoneNumber: "",
//         mentorShift: "",
//         mentorProgram: "",
//       });
//     } else {
//       setStudentData({
//         studentFirstName: "",
//         studentLastName: "",
//         studentDob: "",
//         studentGender: "",
//         studentEmail: "",
//         studentPassword: "",
//         studentPhoneNumber: "",
//         studentSemester: "",
//         studentShift: "",
//         studentProgram: "",
//       });
//     }

//     toast.success("Signup Successful!", {
//       onClose: () => {
//         navigate("/login");
//       },
//     });
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: theme.prominent,
//         position: "fixed",
//         top: "30px",
//         left: 0,
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         overflow: "hidden",
//         fontFamily: theme.fontfamily,
//       }}
//     >
//       <div
//         style={{
//           height: "90%",
//           width: "30%",
//           backgroundColor: theme.text,
//           padding: "40px",
//           borderRadius: "20px",
//           ...(theme.primary && { backgroundColor: theme.primary }),
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             marginBottom: "20px",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <h2
//             style={{
//               marginRight: "20px",
//               cursor: "pointer",
//               color: isMentor ? theme.secondary : theme.text,
//               paddingBottom: isMentor ? "5px" : "0",
//               transition: "color 0.3s, padding-bottom 0.3s",
//               position: "relative",
//             }}
//             onClick={() => setIsMentor(true)}
//           >
//             Mentor
//             {isMentor && (
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "-5px",
//                   left: "0",
//                   width: "100%",
//                   height: "2px",
//                   backgroundColor: theme.text,
//                   transition: "left 0.3s",
//                 }}
//               />
//             )}
//           </h2>
//           <h2
//             style={{
//               cursor: "pointer",
//               color: !isMentor ? theme.secondary : theme.text,
//               paddingBottom: !isMentor ? "5px" : "0",
//               transition: "color 0.3s, padding-bottom 0.3s",
//               position: "relative",
//             }}
//             onClick={() => setIsMentor(false)}
//           >
//             Student
//             {!isMentor && (
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "-5px",
//                   left: "0",
//                   width: "100%",
//                   height: "2px",
//                   backgroundColor: theme.text,
//                   transition: "left 0.3s",
//                 }}
//               />
//             )}
//           </h2>
//         </div>
//         <form onSubmit={handleSubmit}>
//           {isMentor ? (
//             // Mentor Form
//             <div style={{ display: "flex", flexDirection: "column" }}>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   First Name:
//                 </label>
//                 <input
//                   type="text"
//                   name="mentorFirstName"
//                   value={mentorData.mentorFirstName}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 />
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Last Name:
//                 </label>
//                 <input
//                   type="text"
//                   name="mentorLastName"
//                   value={mentorData.mentorLastName}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 />
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Experience (years):
//                 </label>
//                 <input
//                   type="number"
//                   name="mentorExperience"
//                   value={mentorData.mentorExperience}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 />
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Company:
//                 </label>
//                 <input
//                   type="text"
//                   name="mentorCompany"
//                   value={mentorData.mentorCompany}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 />
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Date of Birth:
//                 </label>
//                 <input
//                   type="date"
//                   name="mentorDob"
//                   value={mentorData.mentorDob}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 />
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Gender:
//                 </label>
//                 <select
//                   name="mentorGender"
//                   value={mentorData.mentorGender}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Email:
//                 </label>
//                 <input
//                   type="email"
//                   name="mentorEmail"
//                   value={mentorData.mentorEmail}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 />
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Password:
//                 </label>
//                 <input
//                   type="password"
//                   name="mentorPassword"
//                   value={mentorData.mentorPassword}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 />
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Semester:
//                 </label>
//                 <input
//                   type="text"
//                   name="mentorSemester"
//                   value={mentorData.mentorSemester}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 />
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Phone Number:
//                 </label>
//                 <input
//                   type="tel"
//                   name="mentorPhoneNumber"
//                   value={mentorData.mentorPhoneNumber}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 />
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Shift:
//                 </label>
//                 <select
//                   name="mentorShift"
//                   value={mentorData.mentorShift}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 >
//                   <option value="">Select Shift</option>
//                   <option value="morning">Morning</option>
//                   <option value="evening">Evening</option>
//                 </select>
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Program:
//                 </label>
//                 <input
//                   type="text"
//                   name="mentorProgram"
//                   value={mentorData.mentorProgram}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 />
//               </div>
//             </div>
//           ) : (
//             // Student Form
//             <div style={{ display: "flex", flexDirection: "column" }}>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   First Name:
//                 </label>
//                 <input
//                   type="text"
//                   name="studentFirstName"
//                   value={studentData.studentFirstName}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 />
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Last Name:
//                 </label>
//                 <input
//                   type="text"
//                   name="studentLastName"
//                   value={studentData.studentLastName}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 />
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Date of Birth:
//                 </label>
//                 <input
//                   type="date"
//                   name="studentDob"
//                   value={studentData.studentDob}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 />
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Gender:
//                 </label>
//                 <select
//                   name="studentGender"
//                   value={studentData.studentGender}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Email:
//                 </label>
//                 <input
//                   type="email"
//                   name="studentEmail"
//                   value={studentData.studentEmail}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 />
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Password:
//                 </label>
//                 <input
//                   type="password"
//                   name="studentPassword"
//                   value={studentData.studentPassword}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 />
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Phone Number:
//                 </label>
//                 <input
//                   type="tel"
//                   name="studentPhoneNumber"
//                   value={studentData.studentPhoneNumber}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 />
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Semester:
//                 </label>
//                 <input
//                   type="text"
//                   name="studentSemester"
//                   value={studentData.studentSemester}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 />
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Shift:
//                 </label>
//                 <select
//                   name="studentShift"
//                   value={studentData.studentShift}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 >
//                   <option value="">Select Shift</option>
//                   <option value="morning">Morning</option>
//                   <option value="evening">Evening</option>
//                 </select>
//               </div>
//               <div style={{ marginBottom: "10px", display: "flex" }}>
//                 <label
//                   style={{
//                     color: theme.text,
//                     marginRight: "10px",
//                     flex: "1",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Program:
//                 </label>
//                 <input
//                   type="text"
//                   name="studentProgram"
//                   value={studentData.studentProgram}
//                   onChange={handleChange}
//                   style={{
//                     flex: "2",
//                     padding: "8px",
//                     borderRadius: "5px",
//                     border: `1px solid ${theme.secondary}`,
//                   }}
//                 />
//               </div>
//             </div>
//           )}

//           <button
//             type="submit"
//             style={{
//               backgroundColor: theme.text,
//               width: "100%",
//               color: theme.buttons,
//               padding: "10px",
//               marginTop: "20px",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//               fontFamily: theme.fontfamily,
//             }}
//           >
//             Sign Up
//           </button>
//           <div
//             style={{
//               marginTop: "20px",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <p style={{ marginBottom: "10px", color: theme.text }}>
//               Already have an Account?
//             </p>
//             <button
//               onClick={() => navigate("/login")}
//               style={{
//                 backgroundColor: theme.text,
//                 width: "100%",
//                 color: theme.buttons,
//                 padding: "10px",
//                 border: "none",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 fontFamily: theme.fontfamily,
//               }}
//             >
//               Login
//             </button>
//           </div>
//         </form>
//       </div>
//       <ToastContainer position="bottom-left" />
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";
import theme from "../../styles/theme";

const useStyles = makeStyles((muiTheme) => ({
  root: {
    backgroundColor: theme.prominent,
    position: "fixed",
    top: "30px",
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    fontFamily: theme.fontfamily,
    paddingLeft: "600px",
  },
  paper: {
    height: "110%",
    width: "30%",
    backgroundColor: theme.text,
    padding: "40px",
    borderRadius: "20px",
    ...(theme.primary && { backgroundColor: theme.primary }),
    display: "flex",
    flexDirection: "column",
  },
  formControl: {
    marginBottom: "10px",
    display: "flex",
  },
  label: {
    color: theme.text,
    marginRight: "10px",
    flex: "1",
    fontSize: "16px",

    // color: theme.text,
    // width: "200px",
    // marginRight: muiTheme.spacing(2),
  },
  input: {
    flex: "2",
    borderRadius: "5px",
    border: `1px solid ${theme.secondary}`,
    backgroundColor: theme.text,
    color: theme.buttons,
    padding: muiTheme.spacing(1),
    outline: "none",
    "&::placeholder": {
      color: theme.buttons,
    },
    "&:focus": {
      border: `2px solid ${theme.buttons}`,
    },
  },
  button: {
    backgroundColor: theme.text,
    width: "100%",
    color: theme.buttons,
    padding: "10px",
    marginTop: "20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontFamily: theme.fontfamily,
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isMentor, setIsMentor] = useState(true);

  const [mentorData, setMentorData] = useState({
    mentorFirstName: "",
    mentorLastName: "",
    mentorExperience: "",
    mentorCompany: "",
    mentorDob: "",
    mentorGender: "",
    mentorEmail: "",
    mentorPassword: "",
    mentorSemester: "",
    mentorPhoneNumber: "",
    mentorShift: "",
    mentorProgram: "",
  });

  const [studentData, setStudentData] = useState({
    studentFirstName: "",
    studentLastName: "",
    studentDob: "",
    studentGender: "",
    studentEmail: "",
    studentPassword: "",
    studentPhoneNumber: "",
    studentSemester: "",
    studentShift: "",
    studentProgram: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isMentor) {
      setMentorData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setStudentData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = isMentor ? mentorData : studentData;

    const isEmpty = isMentor
      ? Object.values(mentorData).some((value) => value === "")
      : Object.values(studentData).some((value) => value === "");

    if (isEmpty) {
      toast.error(
        `Please fill up all the ${isMentor ? "Mentor" : "Student"} fields`,
        { autoClose: 2000 }
      );
      return;
    }

    localStorage.setItem(
      `${isMentor ? "mentor" : "student"}Data`,
      JSON.stringify(formData)
    );

    if (isMentor) {
      setMentorData({
        mentorFirstName: "",
        mentorLastName: "",
        mentorExperience: "",
        mentorCompany: "",
        mentorDob: "",
        mentorGender: "",
        mentorEmail: "",
        mentorPassword: "",
        mentorSemester: "",
        mentorPhoneNumber: "",
        mentorShift: "",
        mentorProgram: "",
      });
    } else {
      setStudentData({
        studentFirstName: "",
        studentLastName: "",
        studentDob: "",
        studentGender: "",
        studentEmail: "",
        studentPassword: "",
        studentPhoneNumber: "",
        studentSemester: "",
        studentShift: "",
        studentProgram: "",
      });
    }

    toast.success("Signup Successful!", {
      onClose: () => {
        navigate("/login");
      },
    });
  };

  return (
    <div className={classes.root}>
      <Scrollbars style={{ width: "100%", height: "100%" }}>
        <Paper className={classes.paper}>
          <div
            style={{
              display: "flex",
              marginBottom: "20px",
              justifyContent: "center",
            }}
          >
            <h2
              style={{
                marginRight: "20px",
                cursor: "pointer",
                color: isMentor ? theme.secondary : theme.text,
                paddingBottom: isMentor ? "5px" : "0",
                transition: "color 0.3s, padding-bottom 0.3s",
                position: "relative",
              }}
              onClick={() => setIsMentor(true)}
            >
              Mentor
              {isMentor && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-5px",
                    left: "0",
                    width: "100%",
                    height: "2px",
                    backgroundColor: theme.text,
                    transition: "left 0.3s",
                  }}
                />
              )}
            </h2>
            <h2
              style={{
                cursor: "pointer",
                color: !isMentor ? theme.secondary : theme.text,
                paddingBottom: !isMentor ? "5px" : "0",
                transition: "color 0.3s, padding-bottom 0.3s",
                position: "relative",
              }}
              onClick={() => setIsMentor(false)}
            >
              Student
              {!isMentor && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "-5px",
                    left: "0",
                    width: "100%",
                    height: "2px",
                    backgroundColor: theme.text,
                    transition: "left 0.3s",
                  }}
                />
              )}
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            {isMentor ? (
              // Mentor Form
              <div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>First Name:</InputLabel>
                  <Input
                    type="text"
                    name="mentorFirstName"
                    value={mentorData.mentorFirstName}
                    onChange={handleChange}
                    className={classes.input}
                  />
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>Last Name:</InputLabel>
                  <Input
                    type="text"
                    name="mentorLastName"
                    value={mentorData.mentorLastName}
                    onChange={handleChange}
                    className={classes.input}
                  />
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>
                    Experience (years):
                  </InputLabel>
                  <Input
                    type="number"
                    name="mentorExperience"
                    value={mentorData.mentorExperience}
                    onChange={handleChange}
                    className={classes.input}
                  />
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>Company:</InputLabel>
                  <Input
                    type="text"
                    name="mentorCompany"
                    value={mentorData.mentorCompany}
                    onChange={handleChange}
                    className={classes.input}
                  />
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>
                    Date of Birth:
                  </InputLabel>
                  <Input
                    type="date"
                    name="mentorDob"
                    value={mentorData.mentorDob}
                    onChange={handleChange}
                    className={classes.input}
                  />
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>Gender:</InputLabel>
                  <Select
                    name="mentorGender"
                    value={mentorData.mentorGender}
                    onChange={handleChange}
                    className={classes.input}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>Email:</InputLabel>
                  <Input
                    type="email"
                    name="mentorEmail"
                    value={mentorData.mentorEmail}
                    onChange={handleChange}
                    className={classes.input}
                  />
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>Password:</InputLabel>
                  <Input
                    type="password"
                    name="mentorPassword"
                    value={mentorData.mentorPassword}
                    onChange={handleChange}
                    className={classes.input}
                  />
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>Semester:</InputLabel>
                  <Input
                    type="text"
                    name="mentorSemester"
                    value={mentorData.mentorSemester}
                    onChange={handleChange}
                    className={classes.input}
                  />
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>
                    Phone Number:
                  </InputLabel>
                  <Input
                    type="tel"
                    name="mentorPhoneNumber"
                    value={mentorData.mentorPhoneNumber}
                    onChange={handleChange}
                    className={classes.input}
                  />
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>Shift:</InputLabel>
                  <Select
                    name="mentorShift"
                    value={mentorData.mentorShift}
                    onChange={handleChange}
                    className={classes.input}
                  >
                    <MenuItem value="morning">Morning</MenuItem>
                    <MenuItem value="evening">Evening</MenuItem>
                  </Select>
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>Program:</InputLabel>
                  <Input
                    type="text"
                    name="mentorProgram"
                    value={mentorData.mentorProgram}
                    onChange={handleChange}
                    className={classes.input}
                  />
                </div>
              </div>
            ) : (
              // Student Form
              <div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>First Name:</InputLabel>
                  <Input
                    type="text"
                    name="studentFirstName"
                    value={studentData.studentFirstName}
                    onChange={handleChange}
                    className={classes.input}
                  />
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>Last Name:</InputLabel>
                  <Input
                    type="text"
                    name="studentLastName"
                    value={studentData.studentLastName}
                    onChange={handleChange}
                    className={classes.input}
                  />
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>
                    Date of Birth:
                  </InputLabel>
                  <Input
                    type="date"
                    name="studentDob"
                    value={studentData.studentDob}
                    onChange={handleChange}
                    className={classes.input}
                  />
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>Gender:</InputLabel>
                  <Select
                    name="studentGender"
                    value={studentData.studentGender}
                    onChange={handleChange}
                    className={classes.input}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>Email:</InputLabel>
                  <Input
                    type="email"
                    name="studentEmail"
                    value={studentData.studentEmail}
                    onChange={handleChange}
                    className={classes.input}
                  />
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>Password:</InputLabel>
                  <Input
                    type="password"
                    name="studentPassword"
                    value={studentData.studentPassword}
                    onChange={handleChange}
                    className={classes.input}
                  />
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>
                    Phone Number:
                  </InputLabel>
                  <Input
                    type="tel"
                    name="studentPhoneNumber"
                    value={studentData.studentPhoneNumber}
                    onChange={handleChange}
                    className={classes.input}
                  />
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>Semester:</InputLabel>
                  <Input
                    type="text"
                    name="studentSemester"
                    value={studentData.studentSemester}
                    onChange={handleChange}
                    className={classes.input}
                  />
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>Shift:</InputLabel>
                  <Select
                    name="studentShift"
                    value={studentData.studentShift}
                    onChange={handleChange}
                    className={classes.input}
                  >
                    <MenuItem value="morning">Morning</MenuItem>
                    <MenuItem value="evening">Evening</MenuItem>
                  </Select>
                </div>
                <div className={classes.formControl}>
                  <InputLabel className={classes.label}>Program:</InputLabel>
                  <Input
                    type="text"
                    name="studentProgram"
                    value={studentData.studentProgram}
                    onChange={handleChange}
                    className={classes.input}
                  />
                </div>
              </div>
            )}
            <Button type="submit" className={classes.button}>
              Sign Up
            </Button>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <p style={{ marginBottom: "10px", color: theme.text }}>
                Already have an Account?
              </p>
              <Button
                onClick={() => navigate("/login")}
                className={classes.button}
              >
                Login
              </Button>
            </div>
          </form>
        </Paper>
      </Scrollbars>
      <ToastContainer position="bottom-left" />
    </div>
  );
};

export default SignUp;
