import { useEffect, useState } from "react";

import api from "../Router/api";
import Address from "../components/Address";
import UpdateAddress from "../components/UpdateAddress";

const userid = localStorage.getItem("userid");

const passData = {
  newPassword: "",
};

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  const [add, setAdd] = useState(null);

  const [addressModal, setAddressModal] = useState(false);

  const [updateaddressModal, setUpdateAddressModal] = useState(false);

  const [showPassSection, setShowPassSection] = useState(false);

  const [passform, setPassform] = useState(passData);

  const [refresh, setRefresh] = useState(false);

  const handleChange = (e) => {
    setPassform({
      ...passform,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passform.newPassword.trim()) {
      alert("Password cannot be empty");
      return;
    }

    api
      .put(`/ecom/customers/updatedPassword/${userid}`, passform)
      .then(() => {
        alert("Password updated successfully");

        setShowPassSection(false);

        setPassform(passData);
      })
      .catch((error) => {
        alert(error.response?.data?.message || "Password update failed");
      });
  };

  const handlerUpdateAddress = (latestAddress) => {
    setAdd(latestAddress);

    setUpdateAddressModal(true);
  };

  const showUpdateAddAddressModal = () => {
    setUpdateAddressModal(false);

    setRefresh(!refresh);
  };

  const showAddAddressModal = () => {
    setAddressModal(false);

    setRefresh(!refresh);
  };

  useEffect(() => {
    api
      .get(`/ecom/customers/${userid}`)
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refresh]);

  const latestAddress = profileData?.address?.length
    ? profileData.address[profileData.address.length - 1]
    : null;

  return (
    <div className="container py-4">
      {addressModal && <Address onclose={showAddAddressModal} />}

      {updateaddressModal && (
        <UpdateAddress address={add} onclose={showUpdateAddAddressModal} />
      )}

      {/* Heading */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">
          <i className="bi bi-person-circle text-primary me-2"></i>
          My Profile
        </h1>

        <p className="text-muted">Manage your account details</p>
      </div>

      <div className="row g-4">
        {/* Profile Details */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-lg rounded-4 h-100">
            <div className="card-body p-4">
              <h3 className="fw-bold mb-4">
                <i className="bi bi-person-badge-fill text-primary me-2"></i>
                Profile Details
              </h3>

              {profileData ? (
                <>
                  <div className="mb-3">
                    <strong>Account Status:</strong>

                    <span className="badge bg-success ms-2">
                      {profileData.accountStatus}
                    </span>
                  </div>

                  <p>
                    <strong>Name:</strong> {profileData.firstName}{" "}
                    {profileData.lastName}
                  </p>

                  <p>
                    <strong>Email:</strong> {profileData.email}
                  </p>

                  <p>
                    <strong>Phone:</strong> {profileData.phoneNumber}
                  </p>

                  <p>
                    <strong>Registration:</strong>{" "}
                    {profileData?.registerTime?.substring(0, 10) || "N/A"}
                  </p>
                </>
              ) : (
                <div className="text-center">
                  <div className="spinner-border text-primary"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-lg rounded-4 h-100">
            <div className="card-body p-4">
              <h3 className="fw-bold mb-4">
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                Address
              </h3>

              {latestAddress ? (
                <>
                  <p>
                    <strong>Building:</strong> {latestAddress.flatNo}
                  </p>

                  <p>
                    <strong>Street:</strong> {latestAddress.street}
                  </p>

                  <p>
                    <strong>City:</strong> {latestAddress.city}
                  </p>

                  <p>
                    <strong>State:</strong> {latestAddress.state}
                  </p>

                  <p>
                    <strong>Zip:</strong> {latestAddress.zipCode}
                  </p>

                  <button
                    className="btn btn-warning rounded-pill px-4 mt-2"
                    onClick={() => handlerUpdateAddress(latestAddress)}
                  >
                    <i className="bi bi-pencil-square me-2"></i>
                    Update Address
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <i className="bi bi-house-x display-4 text-secondary"></i>

                  <h5 className="mt-3">No Address Found</h5>

                  <button
                    className="btn btn-primary rounded-pill px-4"
                    onClick={() => setAddressModal(true)}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Address
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="col-12">
          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body p-4">
              <h3 className="fw-bold mb-4">
                <i className="bi bi-lock-fill text-success me-2"></i>
                Security
              </h3>

              {showPassSection ? (
                <form onSubmit={handleSubmit} className="row g-3">
                  <div className="col-md-8">
                    <input
                      type="password"
                      className="form-control rounded-3"
                      placeholder="Enter New Password"
                      name="newPassword"
                      value={passform.newPassword}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-success rounded-pill w-100"
                    >
                      Update
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger rounded-pill w-100"
                      onClick={() => setShowPassSection(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  className="btn btn-primary rounded-pill px-4"
                  onClick={() => setShowPassSection(true)}
                >
                  <i className="bi bi-key-fill me-2"></i>
                  Change Password
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
