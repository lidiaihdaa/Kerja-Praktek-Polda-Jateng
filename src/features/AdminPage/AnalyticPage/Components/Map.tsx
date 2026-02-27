import { MapContainer, Marker, Polygon, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const kampus = [
  { nama: "Universitas Dian Nuswantoro", kota: "Semarang", position: [-6.9828, 110.4093] as [number, number] },
  { nama: "Universitas Diponegoro", kota: "Semarang", position: [-6.9729, 110.4194] as [number, number] },
  { nama: "UIN Walisongo", kota: "Semarang", position: [-6.9836, 110.3481] as [number, number] },
  { nama: "Universitas Negeri Semarang", kota: "Semarang", position: [-7.0493, 110.3917] as [number, number] },
];

export const jawaTengahCoords: [number, number][] = [
  [-6.753840726999975, 111.69161095200012],
  [-6.821625642999944, 111.61925503500012],
  [-6.821607073000006, 111.61920162200006],
  [-7.143398226999935, 111.61015316400021],
  [-7.312661612999964, 111.42604061800009],
  [-7.244931659999924, 111.20831297700013],
  [-7.423327885999946, 111.11906433100016],
  [-7.93983741100001, 111.2725448350002],
  [-8.062421765999954, 110.95322417500023],
  [-8.21095985599997, 110.90871303000002],
  [-8.201578865999963, 110.82964094500015],
  [-7.816842044999987, 110.7856063990002],
  [-7.798240641999936, 110.53176879900016],
  [-7.541897270999957, 110.44607544000019],
  [-7.645124400999929, 110.1435089020001],
  [-7.8879987409999615, 110.00293705400017],
  [-7.687709999999985, 109.08855000000008],
  [-7.735739999999939, 108.78546000000011],
  [-7.430495171000022, 108.7228775490001],
  [-7.193068881000013, 108.5576248670001],
  [-7.134521484375, 108.714111328125],
  [-6.875, 108.78009033203125],
  [-6.769159999999978, 108.8330900000001],
  [-6.84744999999997, 109.12356000000013],
  [-6.8303999999999405, 109.56184000000013],
  [-6.922349999999959, 109.99885000000015],
  [-6.921260000000011, 110.47556000000002],
  [-6.502349999999961, 110.66432000000009],
  [-6.425079999999987, 111.04700000000005],
  [-6.6582300000000245, 111.14890000000008],
  [-6.6206700000000325, 111.49268000000012],
  [-6.753840726999975, 111.69161095200012],
];

const Map = () => {
  const centerJateng: [number, number] = [-7.1, 110.0];

  return (
    <div className="p-6 bg-white border rounded-xl">
      <h2 className="mb-4 text-lg font-bold">Peta Sebaran Asal Mahasiswa</h2>

      <MapContainer
        center={centerJateng}
        zoom={8}
        scrollWheelZoom={false}
        zoomControl={false}
        dragging={false}
        className="w-full rounded-lg"
        style={{ height: "420px", background: "#ffffff" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polygon
          positions={jawaTengahCoords}
          pathOptions={{
            color: "#0552B5",
            weight: 2,
            fillColor: "#D1D5DB", 
            fillOpacity: 0.4,
          }}
        />

        {kampus.map((item, index) => (
          <Marker key={index} position={item.position}>
            <Popup>
              <p className="text-sm font-semibold">{item.nama}</p>
              <p className="text-xs text-gray-500">{item.kota}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
