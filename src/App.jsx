import { useEffect, useState } from "react";
import Header from "./components/Header";
import ListView from "./pages/ListView";
import MapView from "./pages/MapView";
import { useDispatch } from "react-redux";
import { getFlights } from "./redux/actions/flightaActions";
import Modal from "./components/Modal";
const App = () => {
  // harita gorunumu aktif mi statei
  const [isMapView, setIsMapView] = useState(true);
  // detayı gosterilecek elkeamnın id si
  const [detailId, setDetailId] = useState(null);
  const dispatch = useDispatch();

  // ucus verilerini al
  useEffect(() => {
    dispatch(getFlights());
    setInterval(() => {
      dispatch(getFlights());
    }, 5000);
  }, []);
  return (
    <div>
      <Header />
      <div className="view-buttons">
        <button
          onClick={() => setIsMapView(true)}
          className={isMapView ? "active" : ""}
        >
          Harita Görünümü
        </button>
        <button
          className={isMapView ? "" : "active"}
          onClick={() => setIsMapView(false)}
        >
          Liste Görünümü
        </button>
      </div>
      {/* hangi gorunumun ekrarna basılacagını belirle */}
      {isMapView ? (
        <MapView setDetailId={setDetailId} />
      ) : (
        <ListView setDetailId={setDetailId} />
      )}
      {/* detail id degeri vearsa ekrana modal bas */}
      {detailId && (
        <Modal detailId={detailId} close={() => setDetailId(null)} />
      )}
    </div>
  );
};

export default App;
