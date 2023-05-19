import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export default function Mapss() {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [autocomplete, setautocomplete] = useState(null);
    const [infoWindow, setInfoWindow] = useState(null);
    const addressEl = useRef(null);
    const latEl = useRef(null);
    const longEl = useRef(null);
    const city = useRef(null);
    const mapCanvas = useRef(null);
    useEffect(() => {
        const mapOptions = {
            zoom: 8,
            center: new window.google.maps.LatLng(18.5204, 73.8567),
            disableDefaultUI: false,
            scrollWheel: true,
            draggable: true,
        };

        const map = new window.google.maps.Map(mapCanvas.current, mapOptions);
        setMap(map);

        const marker = new window.google.maps.Marker({
            position: mapOptions.center,
            map: map,
            draggable: true,
        });
        setMarker(marker);

        const autocomplete = new window.google.maps.places.Autocomplete(addressEl.current);
        setautocomplete(autocomplete);

        window.google.maps.event.addListener(autocomplete, "places_changed", () => {
            const places = autocomplete.getPlaces();
            const bounds = new window.google.maps.LatLngBounds();

            places.forEach((place) => {
                bounds.extend(place.geometry.location);
                marker.setPosition(place.geometry.location);
            });

            map.fitBounds(bounds);
            map.setZoom(15);

            const lat = marker.getPosition().lat();
            const lng = marker.getPosition().lng();

            latEl.current.value = lat;
            longEl.current.value = lng;

            const resultArray = places[0].address_components;

            for (let i = 0; i < resultArray.length; i++) {
                if (
                    resultArray[i].types[0] &&
                    resultArray[i].types[0] === "administrative_area_level_2"
                ) {
                    city.current.value = resultArray[i].long_name;
                    break;
                }
            }

            if (infoWindow) {
                infoWindow.close();
            }

            const address = places[0].formatted_address;
            const newInfoWindow = new window.google.maps.InfoWindow({
                content: address,
            });
            newInfoWindow.open(map, marker);
            setInfoWindow(newInfoWindow);
        });

        window.google.maps.event.addListener(marker, "dragend", () => {
            const lat = marker.getPosition().lat();
            const lng = marker.getPosition().lng();

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ latLng: marker.getPosition() }, (result, status) => {
                if (status === "OK") {
                    const address = result[0].formatted_address;
                    const resultArray = result[0].address_components;

                    for (let i = 0; i < resultArray.length; i++) {
                        if (
                            resultArray[i].types[0] &&
                            resultArray[i].types[0] === "administrative_area_level_2"
                        ) {
                            city.current.value = resultArray[i].long_name;
                            break;
                        }
                    }

                    addressEl.current.value = address;
                    latEl.current.value = lat;
                    longEl.current.value = lng;

                    if (infoWindow) {
                        infoWindow.close();
                    }

                    const newInfoWindow = new window.google.maps.InfoWindow({
                        content: address,
                    });
                    newInfoWindow.open(map, marker);
                    setInfoWindow(newInfoWindow);
                } else {
                    console.log("Geocode was not successful for the following reason: " + status);
                }
            });
        });
    }, []);
  return (
    <div>
          <div id="map-canvas" ref={mapCanvas}></div>
          <input id="map-search" ref={addressEl} />
          <input className="latitude" ref={latEl} />
          <input className="longitude" ref={longEl} />
          <input className="reg-input-city" ref={city} />
          <div id="map-canvas"  style={{ height: "400px" }} />

    </div>
  )
}
