import React, { Component } from "react";

class Map extends Component {
  constructor(props) {
    super(props);
    this.setDefaultMap = this.setDefaultMap.bind(this);
    this.setNewMarker = this.setNewMarker.bind(this);
    this.setMapEdit=this.setMapEdit.bind(this)
  }

  componentWillMount() {
      console.log('Props: ',this.props)
    if (this.props.lat && this.props.lng) {
        setTimeout(() => {
            this.setMapEdit()
        }, 500);
    } else {
      setTimeout(() => {
        this.setDefaultMap();
      }, 500);
    }
  }

  setMapEdit() {
      const {lat,lng}=this.props
    setTimeout(() => {
      let geocoder = new window.google.maps.Geocoder();

      let map = new window.google.maps.Map(document.getElementById("map"), {
        center: {
          lat: lat ? lat : 19.4326077,
          lng: lng ? lng : -99.13320799999997
        },
        zoom: 15,
        mapTypeId: "roadmap"
      });
      window.google.maps.event.addListener(map, "dragend", () => {
        // 0.1 seconds after the center of the map has changed,
        // set back the marker position.
        setTimeout(() => {
          let center = map.getCenter();
          geocoder.geocode({ latLng: center }, (results, status) => {
            console.log(results, status);
            console.log("result: ", results[1].formatted_address);
            this.props.setAddress(
              results[1].formatted_address,
              map.getCenter().lat(),
              map.getCenter().lng()
            );
          });
        }, 100);
      });
    }, 500);
  }

  setDefaultMap() {
    let map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 19.4326077, lng: -99.13320799999997 },
      zoom: 13,
      mapTypeId: "roadmap"
    });
    // this.setState({
    //     map
    // })
  }

  setNewMarker(location) {
    let geocoder = new window.google.maps.Geocoder();

    let map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 19.4326077, lng: -99.13320799999997 },
      zoom: 15,
      mapTypeId: "roadmap"
    });
    map.fitBounds(location[0].geometry.viewport);
    map.setCenter(location[0].geometry.location);

    window.google.maps.event.addListener(map, "dragend", () => {
      // 0.1 seconds after the center of the map has changed,
      // set back the marker position.
      setTimeout(() => {
        let center = map.getCenter();
        geocoder.geocode({ latLng: center }, (results, status) => {
          console.log(results, status);
          console.log("result: ", results[1].formatted_address);
          this.props.setAddress(
            results[1].formatted_address,
            map.getCenter().lat(),
            map.getCenter().lng()
          );
        });
      }, 100);
    });
  }
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div id="map" style={{ width: "100%", height: "100%" }} />
      </div>
    );
  }
}

export default Map;
