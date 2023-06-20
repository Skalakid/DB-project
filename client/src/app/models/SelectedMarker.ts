import { Marker } from './Marker';

export interface SelectedMarker {
  type: 'available' | 'rented' | 'unavailable';
  marker: Marker | null;
}
