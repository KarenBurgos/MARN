import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "../assets/style/mapDesignCustom.css"
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import markerIcon from "../assets/icons/marker.png"
import { useWeatherStation } from "../pages/weatherStationProvider";

const positionSanAndres = [13.802384478207026, -89.39612985778801];
const positionSantiagoMaria = [13.485, -88.47166667];
const positionNuevaConcepcion = [14.125, -89.29]

const icon = new Icon({
  iconUrl: markerIcon,
  iconSize: [30, 30],
});

const MapSelector = () => {
  const { selectedStation, setSelectedStation } = useWeatherStation();

  return (
    <MapContainer center={[13.887439751923484, -88.85849064585942]} zoom={8.4} scrollWheelZoom={true} className="map-container">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.mapbox.com/styles/v1/karenburgos/clyt9qgz7006d01pcex9i648v/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2FyZW5idXJnb3MiLCJhIjoiY2x5dDlib3kzMHBjaTJpb2l5dmYwOGw1YyJ9.YsxdRu6U5wdveO4oSdWZkQ"
      />
      <Marker position={positionSanAndres} icon={icon} eventHandlers={{ click: () => setSelectedStation("San Andres"), }}>
        <Popup>Estación San Ándres</Popup>
      </Marker>
      <Marker position={positionSantiagoMaria} icon={icon} eventHandlers={{ click: () => setSelectedStation("Santiago de Maria"), }}>
        <Popup>Estación Santiago de Maria</Popup>
      </Marker>
      <Marker position={positionNuevaConcepcion} icon={icon} eventHandlers={{ click: () => setSelectedStation("Nueva Concepcion"), }}>
        <Popup>Estación Nueva Concepcion</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapSelector;
