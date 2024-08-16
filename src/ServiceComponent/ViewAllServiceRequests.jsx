import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

const ViewAllServiceRequests = () => {
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));

  const [showModalViewResponse, setShowModalViewResponse] = useState(false);

  const handleCloseViewResponse = () => setShowModalViewResponse(false);
  const handleShowViewResponse = () => setShowModalViewResponse(true);

  const [serviceRequestId, setServiceRequestId] = useState(0);

  const [serviceNegotiations, setServiceNegotiations] = useState([]);

  const viewResponse = (serviceNegotiations) => {
    setServiceNegotiations(serviceNegotiations);
    handleShowViewResponse();
  };

  const [serviceRequests, setServiceRequests] = useState([
    {
      service: {
        name: "",
        image1: "",
        category: "",
        subCategory: {
          name: "",
        },
        techExpert: {
          shopName: "",
          firstName: "",
          lastName: "",
          phoneNo: "",
        },
      },
      customer: {
        firstName: "",
        lastName: "",
        phoneNo: "",
      },
    },
  ]);

  useEffect(() => {
    const getAllServiceRequests = async () => {
      const allServiceRequests = await retrieveAllServiceRequests();
      if (allServiceRequests) {
        setServiceRequests(allServiceRequests.serviceRequests);
      }
    };

    getAllServiceRequests();
  }, []);

  const retrieveAllServiceRequests = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/service/request/fetch/all`
    );
    return response.data;
  };


  const downloadRequirement = async (request) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/service/request/requirement/${request.requirement_filename}/download`,
        {
          responseType: "blob", // Important to handle binary data
        }
      );

      // Create a Blob from the response data
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      // Create a download link and trigger the download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = request.requirement_filename;
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading requirement:", error);
      // Handle error as needed
    }
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2>My Services</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Service</th>
                  <th scope="col">Service Name</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Customer Contact</th>
                  <th scope="col">Requirement</th>
                  <th scope="col">Requirement File</th>
                  <th scope="col">Status</th>
                  <th scope="col">Expert Response</th>
                </tr>
              </thead>
              <tbody>
                {serviceRequests.map((request) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={
                            `${process.env.REACT_APP_API_URL}/service/` +
                            request.service.image1
                          }
                          class="img-fluid"
                          alt="service_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{request.service.name}</b>
                      </td>

                      <td>
                        <b>
                          {request.customer.firstName +
                            " " +
                            request.customer.lastName}
                        </b>
                      </td>
                      <td>
                        <b>{request.customer.phoneNo}</b>
                      </td>
                      <td>
                        <b>{request.requirement_description}</b>
                      </td>
                      <td>
                        <input
                          type="submit"
                          className="btn btn-sm bg-color custom-bg-text mb-5"
                          value="Download"
                          onClick={() => downloadRequirement(request)}
                        />
                      </td>
                      <td>
                        <b>{request.status}</b>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            viewResponse(request.serviceNegotiations)
                          }
                          className="btn btn-sm bg-color custom-bg-text ms-2 mt-2"
                        >
                          View Response
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        show={showModalViewResponse}
        onHide={handleCloseViewResponse}
        size="xl"
      >
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            View Service Response
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ms-3 mt-3 mb-3 me-3">
            <div className="table-responsive">
              <table className="table table-hover text-color text-center">
                <thead className="table-bordered border-color bg-color custom-bg-text">
                  <tr>
                    <th scope="col">Plan</th>
                    <th scope="col">Estimated Time</th>
                    <th scope="col">Price (&#8377;)</th>
                    <th scope="col">Customer Message</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceNegotiations.map((negotiation) => {
                    return (
                      <tr>
                        <td>
                          <b>{negotiation.plan}</b>
                        </td>

                        <td>
                          <b>{negotiation.estimatedTime}</b>
                        </td>
                        <td>
                          <b>{negotiation.price}</b>
                        </td>
                        <td>
                          <b>{negotiation.message}</b>
                        </td>
                        <td>
                          <b>{negotiation.status}</b>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewResponse}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewAllServiceRequests;
