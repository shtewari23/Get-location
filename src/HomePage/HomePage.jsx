import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const but = {
    width: "100px",
    height: "30px",
    backgroundColor: "red",
    border: "1px solid white",
    borderRadius: "10px",
  };
  const b = {
    marginRight: "80%",
  };
  const user = useSelector((state) => state.authentication.user);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  return (
    <div className="col-lg-8 offset-lg-2">
      <h1>Hi {user.firstName}!</h1>
      <button onClick={getLocation}>Get Location</button>
      <p>{status}</p>
      <p>Coordinates:</p>
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Longitude: {lng}</p>}
      <Link to="/login">
        <button style={but}>Logout</button>
      </Link>
    </div>
  );
}

export { HomePage };
