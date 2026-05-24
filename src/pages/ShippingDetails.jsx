import { useState } from "react";

const ShippingDetails = () => {
  const initialShippingDetails = {
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  };

  const [shippingDetails, setShippingDetails] = useState(
    initialShippingDetails,
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddShippingDetails = (e) => {
    e.preventDefault();

    console.log("Shipping Details:", shippingDetails);

    alert("Shipping Details Added Successfully");

    setShippingDetails(initialShippingDetails);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg rounded-5 overflow-hidden">
            {/* Header */}
            <div
              className="text-white p-4"
              style={{
                background: "linear-gradient(to right, #082b4d, #0d6efd)",
              }}
            >
              <h2 className="fw-bold mb-1">
                <i className="bi bi-truck me-2"></i>
                Shipping Details
              </h2>

              <p className="mb-0 opacity-75">
                Add delivery information for your order
              </p>
            </div>

            {/* Form */}
            <div className="card-body p-5">
              <form onSubmit={handleAddShippingDetails}>
                {/* Address */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Address</label>

                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-geo-alt-fill"></i>
                    </span>

                    <textarea
                      className="form-control"
                      rows="3"
                      name="address"
                      value={shippingDetails.address}
                      onChange={handleInputChange}
                      placeholder="Enter full address"
                      required
                    />
                  </div>
                </div>

                {/* City & State */}
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-semibold">City</label>

                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-building"></i>
                      </span>

                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={shippingDetails.city}
                        onChange={handleInputChange}
                        placeholder="Enter city"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-semibold">State</label>

                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-map-fill"></i>
                      </span>

                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={shippingDetails.state}
                        onChange={handleInputChange}
                        placeholder="Enter state"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Country & Postal */}
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-semibold">Country</label>

                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-globe"></i>
                      </span>

                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        value={shippingDetails.country}
                        onChange={handleInputChange}
                        placeholder="Enter country"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-semibold">
                      Postal Code
                    </label>

                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-mailbox"></i>
                      </span>

                      <input
                        type="text"
                        className="form-control"
                        name="postalCode"
                        value={shippingDetails.postalCode}
                        onChange={handleInputChange}
                        placeholder="Enter postal code"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="btn btn-success w-100 py-3 rounded-4 fw-bold shadow"
                >
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Save Shipping Details
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
