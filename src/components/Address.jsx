import { useState } from "react";
import api from "../Router/api";
import { useNavigate } from "react-router-dom";

const Address = ({ onclose }) => {
  const navigate = useNavigate();
  const userid = localStorage.getItem("userid");

  const [address, setAddress] = useState({
    flatNo: "",
    city: "",
    state: "",
    zipCode: "",
    street: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/ecom/customer-address/${userid}`, address);

      alert("Address Added Successfully");

      navigate(`/user/profile/${userid}`);

      onclose();

      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to Add Address");

      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "rgba(0,0,0,0.65)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          width: "100%",
          maxWidth: "500px",
          padding: "30px",
          boxShadow: "0 10px 35px rgba(0,0,0,0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onclose}
          style={{
            position: "absolute",
            top: "18px",
            right: "20px",
            border: "none",
            background: "#f1f5f9",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            fontSize: "22px",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          ×
        </button>

        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <h2
            style={{
              color: "#082b4d",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            Add Address
          </h2>

          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Fill your delivery address
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {[
            {
              label: "Flat No",
              name: "flatNo",
              placeholder: "Enter flat number",
            },
            {
              label: "Street",
              name: "street",
              placeholder: "Enter street name",
            },
            {
              label: "City",
              name: "city",
              placeholder: "Enter city",
            },
            {
              label: "Zip Code",
              name: "zipCode",
              placeholder: "Enter zip code",
            },
            {
              label: "State",
              name: "state",
              placeholder: "Enter state",
            },
          ].map((field) => (
            <div
              key={field.name}
              style={{
                marginBottom: "18px",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: "#334155",
                }}
              >
                {field.label}
              </label>

              <input
                type="text"
                name={field.name}
                value={address[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: "1px solid #d1d5db",
                  outline: "none",
                  fontSize: "15px",
                  background: "#f8fafc",
                  boxSizing: "border-box",
                }}
              />
            </div>
          ))}

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <button
              type="button"
              onClick={onclose}
              style={{
                flex: 1,
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                background: "#f8fafc",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={{
                flex: 1,
                padding: "14px",
                border: "none",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #082b4d, #0d4d85)",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Address;
