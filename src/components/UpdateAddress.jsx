import { useState } from "react";
import api from "../Router/api";
import { useNavigate } from "react-router-dom";

const UpdateProductForm = ({ address, onclose }) => {
  const [updatedAddress, setUpdatedAddress] = useState({
    ...address,
  });

  const navigate = useNavigate();

  const userid = localStorage.getItem("userid");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatedAddress({
      ...updatedAddress,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(
        `/ecom/customer-address/update/${address.addressId}`,
        updatedAddress,
      );

      alert("Address Updated Successfully");

      navigate(`/user/profile/${userid}`);

      onclose();

      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");

      console.error(error);
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        background: "rgba(0,0,0,0.5)",
        zIndex: 9999,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="card border-0 shadow-lg rounded-4 overflow-hidden"
        style={{
          width: "450px",
        }}
      >
        {/* Header */}
        <div
          className="text-white p-4"
          style={{
            background: "linear-gradient(to right, #082b4d, #0d6efd)",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="m-0 fw-bold">
              <i className="bi bi-geo-alt-fill me-2"></i>
              Update Address
            </h3>

            <button className="btn btn-light rounded-circle" onClick={onclose}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {/* Flat No */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Flat No</label>

              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-house-door-fill"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  name="flatNo"
                  value={updatedAddress.flatNo}
                  onChange={handleChange}
                  placeholder="Enter flat number"
                  required
                />
              </div>
            </div>

            {/* Street */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Street</label>

              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-signpost-fill"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  name="street"
                  value={updatedAddress.street}
                  onChange={handleChange}
                  placeholder="Enter street"
                  required
                />
              </div>
            </div>

            {/* City */}
            <div className="mb-3">
              <label className="form-label fw-semibold">City</label>

              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-building"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={updatedAddress.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  required
                />
              </div>
            </div>

            {/* State */}
            <div className="mb-3">
              <label className="form-label fw-semibold">State</label>

              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-map-fill"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={updatedAddress.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  required
                />
              </div>
            </div>

            {/* ZipCode */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Zip Code</label>

              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-mailbox"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  name="zipCode"
                  value={updatedAddress.zipCode}
                  onChange={handleChange}
                  placeholder="Enter zip code"
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary w-50 rounded-3"
                onClick={onclose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary w-50 rounded-3 fw-bold"
              >
                <i className="bi bi-check-circle-fill me-2"></i>
                Update Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductForm;
