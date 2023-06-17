export interface Marker {
  vehicleId: number;
  modelId: string;
  latCords: number;
  lngCords: number;
  duration: string;
  energyLevel: number;
  costPerMinute: number;
}

export interface GoogleMarker {
  position: google.maps.LatLngLiteral;
  label: string;
  title: string;
}
