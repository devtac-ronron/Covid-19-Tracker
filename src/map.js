// import React from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import styled from "styled-components";

// const Wrapper = styled.div`
//   id: $(props => props.id);
//   width: $(props => props.width);
//   heigth: $(props => props.heigth);
// `;

// export default class Map extends React.Component {
//   componentDidMount() {
//     this.map = L.map("map", {
//       center: [58, 16],
//       zoom: 6,
//       zoomControl: false
//     });
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       detectRetina: true,
//       maxZoom: 20,
//       maxNativeZoom: 17
//     }).addTo(this.map);

//     L.marker([51.5, -0.9]).addTo(this.map);
//   }

//   render() {
//     setTimeout(() => {
//       this.map.invalidateSize(true);
//     }, 100);
//     return <Wrapper height="720px" id="map" />;
//   }
// }
