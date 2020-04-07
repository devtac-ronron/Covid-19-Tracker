import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
const Wrapper = styled.div`
  id: $(props => props.id);
  width: $(props => props.width);
  heigth: $(props => props.heigth);
`;
class Map extends Component {
  componentDidMount() {
    this.map = L.map("map", {
      center: [58, 16],
      zoom: 6,
      scrollWheelZoom: false,
      zoomControl: false,
    }).setView(new L.LatLng(11.5529, 122.7407), 6);
    L.tileLayer(
      "https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png",
      {
        detectRetina: true,
        maxZoom: 20,
        maxNativeZoom: 17,
      }
    ).addTo(this.map);
    this.map.once("focus", function () {
      this.scrollWheelZoom.enable();
    });
    let myIcon = L.icon({
      iconUrl:
        "https://www.stickpng.com/assets/images/58afdad6829958a978a4a693.png",
      iconSize: [5, 5],
      iconAnchor: [12.5, 41],
    });
    L.marker([51.505, -0.09], {
      icon: myIcon,
    }).addTo(this.map);
  }
  render() {
    let { latLong } = this.props;
    setTimeout(() => {
      this.map.invalidateSize(true);
      L.circle([6.9214, 122.079], {
        color: "red",
        size: [50, 50],
        fillColor: "#f03",
        fillOpacity: 0.2,
        radius: 2400,
      }).addTo(this.map);
      L.circle([12.0676, 124.593], {
        color: "red",
        size: [50, 50],
        fillColor: "#f03",
        fillOpacity: 0.2,
        radius: 2400,
      }).addTo(this.map);
      latLong.map((item) => {
        let rad;
        if (item.total <= 5) {
          rad = 2500;
        } else {
          rad = 4000;
        }
        let circle = L.circle(
          [parseFloat(item.latitude), parseFloat(item.longitude)],
          {
            color: "red",
            size: [50, 50],
            fillColor: "#f03",
            fillOpacity: 0.2,
            radius: rad,
          }
        ).addTo(this.map);
        return circle.bindPopup(item.address);
      });
    }, 5000);
    return <Wrapper height="720px" id="map" />;
  }
}

export default Map;
