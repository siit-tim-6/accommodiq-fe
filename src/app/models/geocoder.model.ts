export type GeocoderResponse = {
  status: string;
  error_message: string;
  results: google.maps.GeocoderResult[];
};
