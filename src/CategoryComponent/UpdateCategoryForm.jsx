import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateCategoryForm = () => {
  const location = useLocation();
  const category = location.state;
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  const [id, setId] = useState(category.id);
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [errors, setErrors] = useState({ name: "", description: "" });

  let navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!name.trim()) {
      errors.name = "Category title is required";
      isValid = false;
    }

    if (!description.trim()) {
      errors.description = "Category description is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const saveCategory = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    let data = { id, name, description };

    fetch(`${process.env.REACT_APP_API_URL}/category/update`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${admin_jwtToken}`,
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/admin/job/category/all");
          }, 2000); // Redirect after 2 seconds
        } else {
          toast.error(res.responseMessage || "Something went wrong", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => window.location.reload(true), 2000); // Reload after 2 seconds
        }
      })
      .catch((error) => {
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
        setTimeout(() => window.location.reload(true), 2000); // Reload after 2 seconds
      });
  };

  return (
    <div>
      <div className="mt-2 d-flex align-items-center justify-content-center">
        <div className="form-card border-color" style={{ width: "30rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "38px",
              }}
            >
              <h5 className="card-title">Update PC Builder Category</h5>
            </div>
            <div className="card-body text-color mt-3">
              <form onSubmit={saveCategory}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    <b>Category Title</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Enter title..."
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    <b>Category Description</b>
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    placeholder="Enter description..."
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                  {errors.description && <div className="text-danger">{errors.description}</div>}
                </div>

                <div className="d-flex align-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    className="btn bg-color custom-bg-text"
                  >
                    Update Category
                  </button>
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

export default UpdateCategoryForm;
