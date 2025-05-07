const validatePaymentRequest = (req) => {
  const { pid, md, prn, amt, crn, dt, r1, r2, ru } = req.body;

  // Validate RU
  if (ru.length > 150)
    return "RU must be a string with a maximum length of 150.";

  // Validate PID
  if (pid.length < 3 || pid.length > 20)
    return "PID must be a string between 3 and 20 characters.";

  // Validate PRN
  if (prn.length < 3 || prn.length > 25)
    return "PRN must be a string between 3 and 25 characters.";

  // Validate AMT
  if (isNaN(amt) || amt.toString().length > 18)
    return "AMT must be a valid number with a maximum length of 18.";

  // Validate CRN
  if (crn !== "NPR" || crn.length !== 3) return "CRN must be exactly 'NPR'.";

  // Validate DT
  const datePattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/; // MM/DD/YYYY format
  if (!datePattern.test(dt) || dt.length !== 10)
    return "DT must be a string in MM/DD/YYYY format and exactly 10 characters long.";

  // Validate R1
  if (r1.length > 160)
    return "R1 must be a string with a maximum length of 160.";

  // Validate R2
  if (r2.length > 50) return "R2 must be a string with a maximum length of 50.";

  // Validate MD
  if (md.length < 1 || md.length > 3)
    return "MD must be a string between 1 and 3 characters.";

  return null; // No validation errors
};

export default validatePaymentRequest
