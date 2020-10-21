import React, { Component } from 'react';
import { render } from 'react-dom';
import { withScriptjs } from "react-google-maps";
import MapBuilder from './MapBuilder';

const Maps = () => {
  const MapLoader = withScriptjs(MapBuilder);

  return (
    <MapLoader
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCwpDhxfo8aygIX4ZrfdC4NULGK8KKteVc"
      loadingElement={<div style={{ height: `100%` }} />}
    />
  );
};


export default Maps;