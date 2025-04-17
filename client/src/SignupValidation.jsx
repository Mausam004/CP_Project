function Validation(key = "", values) {
    let error = {};

    // Email & Password regex patterns (corrected)
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

    // ✅ Name validation
    if (!key || key === "" || key === "checkName") {
        if (!values.name || values.name.trim() === "") {
            error.name = "Name should not be empty";
        }
    }

    // ✅ Email validation
    if (!key || key === "" || key === "checkEmail") {
        if (!values.email || values.email.trim() === "") {
            error.email = "Email should not be empty";
        } else if (!email_pattern.test(values.email)) {
            error.email = "Invalid email format";
        }
    }

    // ✅ Password validation
    if (!key || key === "" || key === "checkPassword") {
        if (!values.password || values.password.trim() === "") {
            error.password = "Password should not be empty";
        } else if (!password_pattern.test(values.password)) {
            error.password = "Password must contain at least 6 characters, including special characters,uppercase, lowercase, and number";
        }
    }

    return error;
}

export default Validation;