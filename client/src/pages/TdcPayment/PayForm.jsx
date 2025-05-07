// import { useState } from "react";
// import axios from "axios";
// import getCurrentDate from "./newDate";
// import { useLocation } from "react-router-dom";
// import { Container, Button, Alert } from "react-bootstrap";
// import "./payment.scss";

// const PayForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const location = useLocation();
//   const { formData, fee, prn } = location.state;
//   console.log("payfomr location stare", { formData, fee, prn });

//   const merchantCodeenv = import.meta.env.VITE_MERCHANT_CODE;
//   const returnUrlenv = import.meta.env.VITE_RETURN_URL;
//   const paymentUrlenv = import.meta.env.VITE_PAYMENT_URL;

//   const PID = merchantCodeenv;
//   const MD = "P";
//   const AMT = parseFloat(fee).toFixed(2);
//   const CRN = "NPR";
//   const DT = getCurrentDate();
//   const R1 = String(formData?.fullName || "").substring(0, 160);
//   const R2 = String(JSON.stringify(formData?.sports) || "N/A").substring(0, 50);
//   const RU = `${returnUrlenv}/#/tdc-payment-response`;
//   const PRN = prn;

//   const generatePaymentUrl = async () => {
//     setLoading(true);
//     setError(null);

//     // Validation
//     if (!formData || !fee || !prn) {
//       setError("Form data or fee is missing.");
//       setLoading(false);
//       return;
//     }

//     // Ensure the fields are not undefined
//     const requiredFields = { PID, MD, PRN, AMT, CRN, DT, R1, R2, RU };
//     for (const [key, value] of Object.entries(requiredFields)) {
//       if (value === undefined || value === null || value === "") {
//         console.error(`Missing required field: ${key}`);
//         setError(`Missing required field: ${key}`);
//         setLoading(false);
//         return;
//       }
//     }

//     try {
//       const response = await axios.post(
//         "/api/tdc/generate-hash",

//         {
//           md: MD,
//           prn: PRN,
//           amt: AMT,
//           crn: CRN,
//           dt: DT,
//           r1: R1,
//           r2: R2,
//           ru: RU,
//           pid: PID,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("generate hash", response.data);

//       const { dv } = response.data;
//       console.log("dv", dv);
//       const paymentUrl = `${paymentUrlenv}/api/merchantRequest?PID=${PID}&MD=${MD}&AMT=${AMT}&CRN=${CRN}&DT=${encodeURIComponent(
//         DT
//       )}&R1=${encodeURIComponent(R1)}&R2=${encodeURIComponent(
//         R2
//       )}&DV=${dv}&RU=${encodeURIComponent(RU)}&PRN=${PRN}`;

//       window.location.href = paymentUrl;
//       console.log("payment url", paymentUrl);
//       setTimeout(() => {
//         window.location.href = paymentUrl;
//       }, 5000);
//     } catch (err) {
//       console.error("Payment generation error:", err);
//       if (err.response) {
//         setError(
//           `Error: ${err.response.data.message || "Failed to generate hash"}`
//         );
//       } else if (err.request) {
//         setError("No response from the server. Please try again later.");
//       } else {
//         setError("An unexpected error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="here-payment-form ">
//       <Container>
//         <h1 className="form-title">Processed Fonepay Payment</h1>

//         <h2 className="total-amount">
//           TOTAL AMOUNT:
//           <small className="text-muted">
//             <em>NPR.&nbsp;</em>
//           </small>
//           <span>{fee}</span>
//         </h2>

//         {/* Important Note */}
//         <p className="payment-note text-danger fw-bold mb-3">
//           ⚠️ Note: Please use <u>Mobile Banking Service only</u> to complete
//           your payment .
//         </p>

//         {error && (
//           <Alert variant="danger" className="error-message">
//             {error}
//           </Alert>
//         )}

//         <Button
//           onClick={generatePaymentUrl}
//           disabled={loading}
//           className="pay-button"
//         >
//           {loading ? "Processing..." : "Pay with Fonepay"}
//         </Button>
//       </Container>
//     </div>
//   );
// };

// export default PayForm;

// import { Container, Button, Alert, Card, Row, Col } from "react-bootstrap";
// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./payment.scss";

// const PayForm = () => {
//   const location = useLocation();
//   const [formData, setFormData] = useState(location.state?.formData || null);

//   useEffect(() => {
//     if (!formData) {
//       const storedData = sessionStorage.getItem("formData");
//       if (storedData) setFormData(JSON.parse(storedData));
//     }
//   }, [formData]);

//   return (
//     <div className="here-payment-form">
//       <Container className="my-5">
//         <Card className="shadow-lg">
//           <Card.Body>
//             <h2 className="text-center text-success mb-4">
//               🎉 Registration Successful!
//             </h2>

//             <Alert variant="info">
//               Thank you for registering with{" "}
//               <strong>Thunderbolts Development Center</strong>!
//             </Alert>

//             <Row className="mb-4">
//               <Col md={6}>
//                 <h5>Participant Details:</h5>
//                 <ul className="list-unstyled">
//                   <li>
//                     <strong>Name:</strong> {formData?.fullName}
//                   </li>
//                   <li>
//                     <strong>Sport:</strong> {formData?.sports}
//                   </li>
//                   <li>
//                     <strong>Category:</strong> {formData?.category}
//                   </li>
//                   <li>
//                     <strong>Time:</strong> {formData?.time}
//                   </li>
//                   <li>
//                     <strong>Days:</strong> {formData?.days}
//                   </li>
//                   <li>
//                     <strong>Amount:</strong> NPR. 10,000 /-
//                   </li>
//                 </ul>
//               </Col>
//             </Row>

//             <Alert variant="warning">
//               After making the payment, please send a screenshot of the payment confirmation to:
//               <br />
//               <strong>Email:</strong>{" "}
//               <a href="mailto:info@thunderbolts.com.np">
//                 info@thunderbolts.com.np
//               </a>
//               <br />
//               <strong>WhatsApp:</strong>{" "}
//               <a
//                 href="https://wa.me/9779801973975"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 +977 9801973975
//               </a>
//             </Alert>

//             <div className="text-center mt-4">
//               <Button
//                 variant="primary"
//                 href="https://thunderbolts.com.np/"
//                 target="_blank"
//               >
//                 🌐 Go to Thunderbolts Website
//               </Button>
//             </div>
//           </Card.Body>
//         </Card>
//       </Container>
//     </div>
//   );
// };

// export default PayForm;

import { Container, Alert, Card, Row, Col, Badge } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./payment.scss";

const PayForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState(location.state?.formData || null);

  useEffect(() => {
    if (!formData) {
      const storedData = sessionStorage.getItem("formData");
      if (storedData) setFormData(JSON.parse(storedData));
    }
  }, [formData]);

  return (
    <div className="here-payment-form">
      <Container>
        <Card
          className="border-0 shadow-lg"
          style={{ borderRadius: "15px", overflow: "hidden" }}
        >
          <Card.Body className="p-4">
            {/* Success Confirmation */}
            <Alert
              variant="success"
              className="border-0"
              style={{ backgroundColor: "#E8F4FD" }}
            >
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <span className="fs-3">🎉</span>
                </div>
                <div>
                  <h4 className="alert-heading text-primary ">
                    Successfully Registered!
                  </h4>
                  <p className="mb-0">
                    Thank you for joining{" "}
                    <strong className="text-primary">
                      Thunderbolts Development Center
                    </strong>
                    . Your journey to excellence begins now!
                  </p>
                </div>
              </div>
            </Alert>

            {/* Participant Details */}
            <Row className="">
              <Col md={12}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Header className="bg-primary text-white py-3">
                    <h5 className="mb-0">Participant Information</h5>
                  </Card.Header>
                  <Card.Body>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="fw-bold">Full Name:</span>
                        <span>{formData?.fullName}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="fw-bold">Email:</span>
                        <span>{formData?.email}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="fw-bold">Phone:</span>
                        <span>{formData?.contactNo}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="fw-bold">Sports:</span>
                        <Badge bg="info" pill>
                          {formData?.sports?.charAt(0).toUpperCase() +
                            formData?.sports?.slice(1)}
                        </Badge>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="fw-bold">Category:</span>
                        <span>{formData?.category}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="fw-bold">Time:</span>
                        <Badge bg="warning" text="dark">
                          {formData?.time}
                        </Badge>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="fw-bold">Days:</span>
                        <span>{formData?.days}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        <span className="fw-bold">Amount:</span>
                        <span>NPR 10,000/-</span>
                      </li>
                    </ul>
                    <Alert
                      variant="warning"
                      className="mt-auto mb-0 d-flex flex-column text-start "
                    >
                      <h5 className="fw-bold">⚠️ Important:</h5>
                      <ul>
                        <li>
                          <strong>Check your email</strong> - we've sent a
                          confirmation email with a QR code
                        </li>
                        <li>
                          <strong>Scan the QR code</strong> and pay one-time
                          registration fee <strong>NPR. 10,000/-</strong>which includes
                          a kit bag, jersey set, and medical tests. Monthly
                          registration fees for the selected sport will be
                          charged separately.
                        </li>
                        <li>
                          <strong>
                            Reply to that email with your payment slip
                          </strong>{" "}
                          (screenshot or PDF)
                        </li>
                        
                      </ul>
                      <p>
                        That's it - once we confirm your payment, you're
                        officially in!
                      </p>
                      <ul className="mb-0 list-unstyled">
                        <li>
                          <strong>Email:</strong>{" "}
                          <a
                            href="mailto:info@thunderbolts.com.np"
                            className="text-decoration-none"
                          >
                            info@thunderbolts.com.np
                          </a>
                        </li>
                        <li>
                          <strong>WhatsApp:</strong>{" "}
                          <a
                            href="https://wa.me/9779801973975"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none"
                          >
                            +977 9801973975
                          </a>
                        </li>
                      </ul>
                    </Alert>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>

          {/* Footer */}
          <Card.Footer
            className="text-center text-muted py-3"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <small>
              Need help? Call us: +977 9801973975 or email:
              info@thunderbolts.com.np
            </small>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
};

export default PayForm;
