import { Link } from "react-router-dom";
import dollor from "../images/dollor_logo.png";
import timing from "../images/timing_logo.png";
import experience from "../images/experience_logo.png";

const ServiceCard = (service) => {
  const descriptionToShow = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      const truncatedText = description.substring(0, maxLength);
      return truncatedText + "...";
    }
  };

  const formatDateFromEpoch = (time) => {
    const date = new Date(Number(time));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  return (
    <div className="col" style={{width:"735px"}}>
      <Link
        to={`/service/${service.item.id}/detail`}
        className="card job-card rounded-card h-100 shadow-lg"
        style={{ textDecoration: "none" }}
      >
        <div className="row g-0">
          {/* Left side - Company Logo */}
          {/* <div className="col-md-4 d-flex align-items-center justify-content-center"> */}
            {/* <img  src={"http://localhost:9090/api/service/" + service.item.image1  className="card-img-top rounded img-fluid"
              alt="event image"
              style={{
              maxHeight: "150px",
              }}
            /> */}
            {/* <p>{service.item.category}</p> */}
            
          {/* </div> */}
          {/* Right side - Job Details */}
          <div className="col-md-8">
            <div className="card-body text-color">
              <h3 className="card-title d-flex justify-content-between text-color-second">
                <div>
                  <b>{service.item.name}</b>
                </div>
              </h3>
              <p className="card-text text-dark">
                {descriptionToShow(service.item.description, 50)}
              </p>

              <div className="d-flex justify-content-between text-color-second mt-3">
                <b>
                  <span className="text-dark">Category: </span>
                  <span className="text-color">{service.item.category}</span>
                </b>

                {(() => {
                  if (service.item.subCategory) {
                    return (
                      <b>
                        <span className="text-dark">Sub Category: </span>
                        <span className="text-color">
                          {service.item.subCategory.name}
                        </span>
                      </b>
                    );
                  }
                })()}
              </div>

              <div className="d-flex justify-content-between text-color-second mt-3">
                <b>
                  <span className="text-dark">Delivery Time: </span>
                  <span className="text-color">
                    {service.item.deliveryTime + " Days"}
                  </span>
                </b>
                <b>
                  <span className="text-dark">Min Price: </span>
                  <span className="text-color">
                    &#8377;{service.item.minPrice}
                  </span>
                </b>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ServiceCard;
