import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "./Carousel";
import Footer from "../NavbarComponent/Footer";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../ServiceComponent/ServiceCard";
import ".././css/HomePage.css"

const HomePage = () => {
  const navigate = useNavigate();
  const [subCategories, setSubCategories] = useState([]);

  const [category, setCategory] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");

  const [tempCategory, setTempCategory] = useState("");
  const [tempSubCategoryId, setTempSubCategoryId] = useState("");

  const [services, setServices] = useState([]);

  useEffect(() => {
    const getAllServices = async () => {
      const allServices = await retrieveAllServices();
      if (allServices) {
        setServices(allServices.services);
      }
    };

    const getSearchedServices = async () => {
      const allServices = await searchServices();
      if (allServices) {
        setServices(allServices.services);
      }
    };

    const getAllCategories = async () => {
      const res = await retrieveAllCategories();
      if (res) {
        setSubCategories(res.categories);
      }
    };

    if (category !== "" || subCategoryId !== "") {
      getSearchedServices();
    } else {
      getAllServices();
    }

    getAllCategories();
  }, [category, subCategoryId]);

  const retrieveAllServices = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/service/fetch/all`
    );
    return response.data;
  };

  const retrieveAllCategories = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/category/fetch/all`
    );
    return response.data;
  };

  const searchServices = async () => {
    if (category !== "") {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/service/fetch/category-wise?category=` +
          category
      );

      return response.data;
    } else if (subCategoryId !== "" || subCategoryId !== "0") {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/service/fetch/sub-category-wise?subCategoryId=` +
          subCategoryId
      );
      return response.data;
    }
  };

  const searchServicesByCategory = (e) => {
    e.preventDefault();
    setCategory(tempCategory);

    setTempCategory("");
    setSubCategoryId("");
  };

  const searchServicesBySubCategory = (e) => {
    e.preventDefault();
    setSubCategoryId(tempSubCategoryId);
    setCategory("");
    setTempCategory("");
    setTempSubCategoryId("");
  };

  return (
    <div className="container-fluid mb-4">
      <Carousel />
      <h5 className="text-color-second text-center mt-5 mb2 ">
        Select the Services which you want here
      </h5>

      <div className="d-flex aligns-items-center justify-content-center">
        <div className="row">
          <div className="col-auto">
            <div className="mt-3">
              <form class="row g-3">
                <div class="col-auto">
                  <select
                    name="tempCategory"
                    onChange={(e) => setTempCategory(e.target.value)}
                    className="form-control"
                    required
                    style={{cursor:"pointer"}}
                  >
                    <option value="">Select service Category from here</option>
                    <option   style={{cursor:"pointer"}} value="PC Builder">PC Builder</option>
                    <option   style={{cursor:"pointer"}} value="Service">Service</option>
                  </select>
                </div>

                <div class="col-auto">
                  <button
                    type="submit"
                    class="btn bg-color custom-bg-text mb-3"
                    onClick={searchServicesByCategory}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col">
            <div className="mt-3">
              <form class="row g-3">
                <div class="col-auto">
                  <select
                    name="tempSubCategoryId"
                    onChange={(e) => setTempSubCategoryId(e.target.value)}
                    className="form-control"
                    required
                    style={{cursor:"pointer"}}
                  >
                    <option value="">Select type of Pc Build Category</option>

                    {subCategories.map((category) => {
                      return (
                        <option value={category.id}> {category.name} </option>
                      );
                    })}
                  </select>
                </div>

                <div class="col-auto">
                  <button
                    type="submit"
                    class="btn bg-color custom-bg-text mb-3"
                    onClick={searchServicesBySubCategory}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-12 mt-5 mb-5 m-4">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {services.map((service) => {
            return <ServiceCard item={service} key={service.id} />;
          })}
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default HomePage;
