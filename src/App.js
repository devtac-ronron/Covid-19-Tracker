import React, { Component } from "react";
import $ from "jquery";
import Dashboard from "./component/dashboard";
import Table from "./component/covid_datatable";
import "./App.css";
class App extends Component {
  constructor(props) {
    console.log("Constructor-App", props);
    super(props);
    this.state = {
      cases: [],
      Province: [],
      global: [],
      newcases: [],
      pui: [],
      day: [],
      time: [],
      caseGender: [],
      latLong: [],
      isLoaded: false,
    };
    $("#wrapper").hide();
  }
  fetch() {
    fetch(
      "https://services5.arcgis.com/mnYJ21GiFTR97WFg/ArcGIS/rest/services/PH_masterlist/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=FID%20ASC"
    )
      .then((res) => res.json())
      .then((result) => {
        const province = [];
        for (let x = 0; x < result.features.length; x++) {
          const data = result.features[x];
          const dataRaw = data.attributes;
          const dataProvince = dataRaw.residence;
          province.push(dataProvince);
        }
        let objData = [];
        province.filter((item, index) => {
          let city = "";
          let total = 0;
          let prov;
          if (province.indexOf(item) === index) {
            prov = item;
            city = province.filter((i) => i === item);
            for (let i = 0; i < city.length; i++) {
              total++;
            }
          } else {
            total = null;
            prov = null;
          }
          if (prov !== null || total !== null) {
            const Province = { Province: prov };
            const Total = { Total: total };
            const Obj = Object.assign(Province, Total);
            return objData.push(Obj);
          } else {
            return null;
          }
        });
        const latlong = [];
        let protocol = "https:";
        setTimeout(() => {
          objData.map((i) => {
            const address = i.Province;
            const total = i.Total;
            if (address !== "For validation") {
              $.get(
                protocol +
                  "//nominatim.openstreetmap.org/search?format=json&q=" +
                  address.replace("�", "ñ"),
                function (data) {
                  const addressTotal = address + ", Total Cases: " + total;
                  const t = { total: parseInt(total) };
                  const add = { address: addressTotal };
                  const latitude = { latitude: parseFloat(data[0].lat) };
                  const longitude = { longitude: parseFloat(data[0].lon) };
                  const objectData = Object.assign(add, latitude, longitude, t);
                  latlong.push(objectData);
                }
              );
            }
            return latlong;
          });
          this.setState({
            isLoaded: true,
            Province: objData,
            latLong: latlong,
          });
        }, 2000);
      });
  }
  componentDidMount() {
    console.log("Mount-App");
    fetch("https://covid-193.p.rapidapi.com/statistics", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "9f88e68d40mshb10a7b6f1b5787bp1739bdjsn63545b7b65a2",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        let globals = [];
        for (let i = 0; i < json.response.length; i++) {
          const data = json.response[i];
          const deaths = { deaths: data.deaths };
          const country = { country: data.country };
          const dataRaw = data.cases;
          const newCase = { newCases: dataRaw.new };
          const active = { active: dataRaw.active };
          const critical = { critical: dataRaw.critical };
          const recover = { recover: dataRaw.recover };
          const total = { total: dataRaw.total };
          const dataObj = Object.assign(
            country,
            deaths,
            newCase,
            active,
            critical,
            recover,
            total
          );
          globals.push(dataObj);
        }
        this.setState({
          isLoaded: true,
          global: globals,
          day: json.response[45].day,
          time: json.response[45].time,
          newcases: json.response[45].cases,
        });
        if (json.response) {
          $("#wrapper").show();
          $("#loader").hide();
          this.fetch();
        } else {
          $("#wrapper").hide();
        }
      });
    fetch(
      "https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/age_group/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&groupByFieldsForStatistics=age_categ%2Csex&outStatistics=%5B%7B%22statisticType%22%3A%22count%22%2C%22onStatisticField%22%3A%22FID%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true"
    )
      .then((resur) => resur.json())
      .then((respo) => {
        let maleCount = 0;
        let femaleCount = 0;
        let age9 = 0;
        let age8 = 0;
        let age7 = 0;
        let age6 = 0;
        let age5 = 0;
        let age4 = 0;
        let age3 = 0;
        let age2 = 0;
        let age1 = 0;
        let age0 = 0;
        for (let i = 0; i < respo.features.length; i++) {
          const data = respo.features[i];
          const dataRaw = data.attributes;
          if (dataRaw.sex === "Male") {
            maleCount = maleCount + dataRaw.value;
          } else {
            femaleCount = femaleCount + dataRaw.value;
          }
          if (dataRaw.age_categ === "90 to 99") {
            age9 = age9 + dataRaw.value;
          } else if (dataRaw.age_categ === "80 to 89") {
            age8 = age8 + dataRaw.value;
          } else if (dataRaw.age_categ === "70 to 79") {
            age7 = age7 + dataRaw.value;
          } else if (dataRaw.age_categ === "60 to 69") {
            age6 = age6 + dataRaw.value;
          } else if (dataRaw.age_categ === "50 to 59") {
            age5 = age5 + dataRaw.value;
          } else if (dataRaw.age_categ === "40 to 49") {
            age4 = age4 + dataRaw.value;
          } else if (dataRaw.age_categ === "30 to 39") {
            age3 = age3 + dataRaw.value;
          } else if (dataRaw.age_categ === "20 to 29") {
            age2 = age2 + dataRaw.value;
          } else if (dataRaw.age_categ === "10 to 19") {
            age1 = age1 + dataRaw.value;
          } else if (dataRaw.age_categ === "0 to 9") {
            age0 = age0 + dataRaw.value;
          } else {
          }
        }

        const dataObj = Object.assign({
          male: maleCount,
          female: femaleCount,
          to99: age9,
          to89: age8,
          to79: age7,
          to69: age6,
          to59: age5,
          to49: age4,
          to39: age3,
          to29: age2,
          to19: age1,
          to9: age0,
        });

        this.setState({
          isLoaded: true,
          caseGender: dataObj,
        });
      });
    fetch(
      "https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/slide_fig/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*"
    )
      .then((resu) => resu.json())
      .then((resp) => {
        const data = resp.features[0];
        const dataRaw = data.attributes;
        this.setState({
          isLoaded: true,
          cases: dataRaw,
        });
      });
    fetch(
      "https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/conf_fac_tracking/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=count_%20ASC"
    )
      .then((result) => result.json())
      .then((resjson) => {
        let PUIs = [];
        for (let i = 0; i < resjson.features.length; i++) {
          const data = resjson.features[i];
          const dataRaw = data.attributes;
          const dataPUIs = { PUIs: dataRaw.count_ };
          const dataFacility = { Facility: dataRaw.facility };
          const dataObj = Object.assign(dataFacility, dataPUIs);
          PUIs.push(dataObj);
        }
        this.setState({
          isLoaded: true,
          pui: PUIs,
        });
      });

    $("#facilities").hide();
    $("#global").hide();
    $("#selectCases").change(function () {
      if ($(this).val() === "city-prov") {
        $("#city-province").show();
        $("#facilities").hide();
        $("#global").hide();
      } else if ($(this).val() === "facilities") {
        $("#facilities").show();
        $("#city-province").hide();
        $("#global").hide();
      } else if ($(this).val() === "global") {
        $("#global").show();
        $("#city-province").hide();
        $("#facilities").hide();
      }
    });
    $("#search_city").keyup(function () {
      let filter, input, tr, td, i, txtValue;
      input = $("#search_city").val();
      filter = input.toUpperCase();
      td = $("td")[0];
      tr = $("#myTable > tbody > tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    });
    $("#searchFacility").keyup(function () {
      let filter, input, tr, td, i, txtValue;
      input = $("#searchFacility").val();
      filter = input.toUpperCase();
      td = $("td")[0];
      tr = $("#myTable2 > tbody > tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    });
    $("#searchCountries").keyup(function () {
      let filter, input, tr, td, i, txtValue;
      input = $("#searchCountries").val();
      filter = input.toUpperCase();
      td = $("td")[0];
      tr = $("#myTable3 > tbody > tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    });
  }

  render() {
    const {
      cases,
      Province,
      global,
      pui,
      newcases,
      caseGender,
      latLong,
    } = this.state;

    return (
      <React.Fragment>
        <Dashboard cases={cases} newcases={newcases.new} globalCase={global} />
        <Table
          province={Province}
          globalCase={global}
          perFacility={pui}
          caseGender={caseGender}
          latLong={latLong}
        />
        <div className="container-fluid text-white">
          <footer className="main-footer">
            <strong className="text-white">Copyright &copy;2020 RonAnn.</strong>
            All rights reserved.
          </footer>
        </div>
      </React.Fragment>
    );
  }
}
export default App;
