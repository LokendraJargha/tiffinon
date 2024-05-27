import React, { useState, useEffect } from "react";
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
  FullscreenControl,
} from "react-map-gl";
import { Room, Star, StarBorder } from "@material-ui/icons";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

const MapBox = ({ user, setUser, isEdit }) => {
  const [popup, setPopup] = useState(true);

  const [viewState, setViewState] = useState({
    latitude: 28.394857,
    longitude: 84.124008,
    zoom: 6,
  });

  useEffect(() => {
    return () => {
      setUser({});
    };
  }, []);

  const handleTouch = (e) => {
    e.preventDefault();
    console.log("touch event occur");
  };

  const getAddress = async (lng, lat) => {
    return await axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX}`
      )
      .then((res) => {
        return res.data.features[1].place_name;
      });
  };

  const handleAddClick = async (e) => {
    e.preventDefault();

    const { lat, lng } = e.lngLat;
    const add = await getAddress(lng, lat).then((data) => {
      return data;
    });
    console.log("add ", add);
    setUser({
      latitude: lat,
      longitude: lng,
      address: add,
    });

    console.log("long ", lng);
    console.log("lat", lat);
  };

  return (
    <>
      <ReactMapGL
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        transitionDuration="200"
        onTouchMove={(e) => handleTouch(e)}
        // onViewportChange={(viewState) => setViewState(viewState)}
        style={{ width: "100wh", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onDblClick={(e) => handleAddClick(e)}
        doubleClickZoom={false}
        // touchZoomRotate={false}
        // onClick={}
      >
        <FullscreenControl />
        <GeolocateControl trackUserLocation={true} showUserHeading={true} />
        <NavigationControl showCompass={false} />
        {Object.keys(user).length > 0 && (
          <>
            <Marker
              latitude={user.latitude}
              longitude={user.longitude}
              offsetLeft={-3.5 * viewState.zoom}
              offsetTop={-7 * viewState.zoom}
            >
              <Room
                style={{
                  fontSize: 7 * viewState.zoom,
                  color: "tomato",
                  cursor: "pointer",
                }}
                onClick={() => setPopup(!popup)}
              />
            </Marker>
            {popup && (
              <Popup
                latitude={user.latitude}
                longitude={user.longitude}
                closeButton={false}
                closeOnClick={false}
                anchor="left"
              >
                <h6>{user.address}</h6>
              </Popup>
            )}
          </>
        )}
      </ReactMapGL>
    </>
  );
};

export default MapBox;
