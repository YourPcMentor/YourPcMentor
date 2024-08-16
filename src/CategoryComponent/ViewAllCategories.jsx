import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewAllCategories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true); // New state for loading
  const [error, setError] = useState(""); // New state for error messages
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");
  
  let navigate = useNavigate();

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/category/fetch/all`);
        setAllCategories(response.data.categories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    getAllCategory();
  }, []);

  const deleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/category/delete?categoryId=${categoryId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin_jwtToken}`,
          },
        }
      );
      
      const result = await response.json();
      if (result.success) {
        toast.success(result.responseMessage, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setAllCategories(allCategories.filter((cat) => cat.id !== categoryId));
      } else {
        toast.error(result.responseMessage || "Failed to delete category", {
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
      console.error("Failed to delete category:", error);
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

  const updateCategory = (category) => {
    navigate("/admin/category/update", { state: category });
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{ height: "45rem" }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{ borderRadius: "1em", height: "50px" }}
        >
          <h2>All Categories</h2>
        </div>
        <div
          className="card-body"
          style={{ overflowY: "auto" }}
        >
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Category Id</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allCategories.length > 0 ? (
                  allCategories.map((category) => (
                    <tr key={category.id}>
                      <td><b>{category.id}</b></td>
                      <td><b>{category.name}</b></td>
                      <td><b>{category.description}</b></td>
                      <td>
                        <button
                          onClick={() => updateCategory(category)}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => deleteCategory(category.id)}
                          className="btn btn-sm bg-color custom-bg-text ms-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No categories available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllCategories;
