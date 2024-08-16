import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    shopName: "",
    emailId: "",
    password: "",
    phoneNo: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    shopName: "",
    emailId: "",
    password: "",
    phoneNo: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
  });

  useEffect(() => {
    if (document.URL.indexOf("customer") !== -1) {
      setUser((prev) => ({ ...prev, role: "Customer" }));
    } else if (document.URL.indexOf("tech-expert") !== -1) {
      setUser((prev) => ({ ...prev, role: "Tech Expert" }));
    }
  }, []);

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input change
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {
      firstName: "",
      lastName: "",
      shopName: "",
      emailId: "",
      password: "",
      phoneNo: "",
      street: "",
      city: "",
      pincode: "",
      role: "",
    };

    if (!user.firstName) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }

    if (!user.lastName) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }

    if (user.role === "Tech Expert" && !user.shopName) {
      newErrors.shopName = "Shop Name is required for Tech Experts";
      isValid = false;
    }

    if (!user.emailId || !/\S+@\S+\.\S+/.test(user.emailId)) {
      newErrors.emailId = "Valid Email Id is required";
      isValid = false;
    }

    if (!user.password || user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (!user.phoneNo.trim() || !/^\d{10}$/.test(user.phoneNo) || user.phoneNo === "0") {
      newErrors.phoneNo = "Valid 10-digit Phone Number is required and cannot be '0'";
      isValid = false;
    }

    if (!user.street) {
      newErrors.street = "Street Address is required";
      isValid = false;
    }

    if (!user.city) {
      newErrors.city = "City is required";
      isValid = false;
    }

    if (!user.pincode || !/^\d{6}$/.test(user.pincode)) {
      newErrors.pincode = "Valid 6-digit Pincode is required";
      isValid = false;
    }

    if (user.role === "0" || !user.role) {
      newErrors.role = "Role is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const saveUser = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success(result.responseMessage, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/user/login");
        }, 1000);
      } else {
        toast.error(result.responseMessage || "Registration failed", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("It seems server is down", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <div className="mt-2 d-flex align-items-center justify-content-center ms-2 me-2 mb-2">
        <div className="form-card border-color text-color" style={{ width: "50rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{ borderRadius: "1em", height: "45px" }}
            >
              <h5 className="card-title">
                Register{" "}
                {user.role === "Tech Expert" ? "Tech Expert" : "Customer"} Here!!!
              </h5>
            </div>
            <div className="card-body mt-3">
              <form className="row g-3" onSubmit={saveUser}>
                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="firstName" className="form-label">
                    <b>First Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    onChange={handleUserInput}
                    value={user.firstName}
                    required
                  />
                  {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                </div>

                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="lastName" className="form-label">
                    <b>Last Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    onChange={handleUserInput}
                    value={user.lastName}
                    required
                  />
                  {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                </div>

                {user.role === "Tech Expert" && (
                  <div className="col-md-6 mb-3 text-color">
                    <label htmlFor="shopName" className="form-label">
                      <b>Shop Name</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="shopName"
                      name="shopName"
                      onChange={handleUserInput}
                      value={user.shopName}
                      required
                    />
                    {errors.shopName && <div className="text-danger">{errors.shopName}</div>}
                  </div>
                )}

                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="emailId" className="form-label">
                    <b>Email Id</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    onChange={handleUserInput}
                    value={user.emailId}
                    required
                  />
                  {errors.emailId && <div className="text-danger">{errors.emailId}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="password" className="form-label">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={handleUserInput}
                    value={user.password}
                    required
                  />
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="phoneNo" className="form-label">
                    <b>Contact No</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phoneNo"
                    name="phoneNo"
                    onChange={handleUserInput}
                    value={user.phoneNo}
                    required
                  />
                  {errors.phoneNo && <div className="text-danger">{errors.phoneNo}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="street" className="form-label">
                    <b>Street</b>
                  </label>
                  <textarea
                    className="form-control"
                    id="street"
                    name="street"
                    rows="3"
                    onChange={handleUserInput}
                    value={user.street}
                    required
                  />
                  {errors.street && <div className="text-danger">{errors.street}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="city" className="form-label">
                    <b>City</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    onChange={handleUserInput}
                    value={user.city}
                    required
                  />
                  {errors.city && <div className="text-danger">{errors.city}</div>}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="pincode" className="form-label">
                    <b>Pincode</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="pincode"
                    name="pincode"
                    onChange={handleUserInput}
                    value={user.pincode}
                    required
                  />
                  {errors.pincode && <div className="text-danger">{errors.pincode}</div>}
                </div>

                <div className="d-flex align-items-center justify-content-center">
                  <input
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    value="Register User"
                  />
                </div>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
