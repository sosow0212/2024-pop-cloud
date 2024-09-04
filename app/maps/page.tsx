import AA from "./_components/aa";
import BB from "./_components/bb";
import MapsMap from "./_components/maps-map";

const MapPage = () => {
  return (
    <section className="relative flex h-full flex-col space-y-4">
      <MapsMap />
      <AA />
      <BB />
    </section>
  );
};

export default MapPage;
