import { useEffect, useState } from "react";
import api from "../Router/api";

function AdminUserDetails() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/ecom/customers/get-all-customer")
      .then((response) => {
        const sortedUsers = response.data.map((user) => ({
          ...user,
          address:
            user.address?.sort(
              (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
            ) || [],
        }));

        setUsers(sortedUsers);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);

        setLoading(false);
      });
  }, []);

  const getLatestAddress = (user) => {
    if (user.address && user.address.length > 0) {
      return user.address[0];
    }

    return null;
  };

  // Search Filter
  const filteredUsers = users.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div>
          <h2 className="fw-bold text-dark">
            <i className="bi bi-people-fill text-primary me-2"></i>
            Customer Details
          </h2>

          <p className="text-muted mb-0">Manage all registered customers</p>
        </div>

        {/* Search */}
        <div
          className="input-group shadow-sm"
          style={{
            width: "350px",
          }}
        >
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search"></i>
          </span>

          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary"></div>

          <h5 className="mt-3">Loading Customers...</h5>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center mt-5">
          <h4 className="text-muted">No Customers Found</h4>
        </div>
      ) : (
        <div className="row">
          {filteredUsers.map((user) => {
            const latestAddress = getLatestAddress(user);

            return (
              <div className="col-lg-6 mb-4" key={user.userId}>
                <div className="card border-0 shadow-lg rounded-4 h-100">
                  <div className="card-body p-4">
                    {/* Top */}
                    <div className="d-flex align-items-center mb-4">
                      <div
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                        style={{
                          width: "65px",
                          height: "65px",
                          fontSize: "28px",
                        }}
                      >
                        <i className="bi bi-person-fill"></i>
                      </div>

                      <div>
                        <h4 className="fw-bold mb-1">
                          {user.firstName} {user.lastName}
                        </h4>

                        <span
                          className={`badge ${
                            user.accountStatus === "ACTIVE"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {user.accountStatus}
                        </span>
                      </div>
                    </div>

                    {/* User Details */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <p>
                          <strong>User ID:</strong> {user.userId}
                        </p>

                        <p>
                          <strong>Email:</strong> {user.email}
                        </p>
                      </div>

                      <div className="col-md-6">
                        <p>
                          <strong>Phone:</strong> {user.phoneNumber}
                        </p>

                        <p>
                          <strong>Register:</strong>{" "}
                          {new Date(user.registerTime).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="bg-light rounded-4 p-3">
                      <h6 className="fw-bold text-primary mb-3">
                        <i className="bi bi-geo-alt-fill me-2"></i>
                        Latest Address
                      </h6>

                      {latestAddress ? (
                        <>
                          <p className="mb-1">
                            <strong>Flat:</strong> {latestAddress.flatNo}
                          </p>

                          <p className="mb-1">
                            <strong>Street:</strong> {latestAddress.street}
                          </p>

                          <p className="mb-1">
                            <strong>City:</strong> {latestAddress.city}
                          </p>

                          <p className="mb-1">
                            <strong>State:</strong> {latestAddress.state}
                          </p>

                          <p className="mb-0">
                            <strong>Zip:</strong> {latestAddress.zipCode}
                          </p>
                        </>
                      ) : (
                        <p className="text-muted mb-0">No Address Available</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AdminUserDetails;
