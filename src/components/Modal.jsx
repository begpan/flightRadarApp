import axios from "axios";
import { useEffect, useState } from "react";
import { headerOpt } from "../constants";
import formatDate from "../utils/formatDate";
import { setPath } from "../redux/slices/flightSlice";
import { useDispatch } from "react-redux";

const Modal = ({ detailId, close }) => {
  // ucus detay verisini sadece bu modal içeriisnde kullanacagınmız için baska bi bileşende
  // ihtiyacımızz olmadıgı için state olarak tuttuk
  const [d, setDetail] = useState(null);

  const dispatch = useDispatch();
  //   id her guncellendiğinde calısır
  useEffect(() => {
    // önceki ucusun verilerini temilze
    setDetail(null);
    // yeni ucusun detay verilerini al
    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        headerOpt
      )
      .then((res) => {
        dispatch(setPath(res.data.trail));
        setDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, [detailId]);

  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <p className="close-area">
          <span onClick={close}>X</span>
        </p>
        {!d ? (
          <div className="wrapper">
            <div className="loader">
              <span></span>
            </div>
          </div>
        ) : !d.aircraft?.model || !d.airport.origin ? (
          <div>
            <p>Bu uçuşun verileri gizlidir</p>
          </div>
        ) : (
          <>
            <h3>{d.aircraft.model.text}</h3>
            <h3>{d.aircraft.model.code}</h3>

            <p>
              <span>Kuyruk Kodu:</span>
              <span>{d.aircraft.registration}</span>
            </p>

            <img src={d.aircraft.images.large[0].src} alt="" />
            <p>
              <span>Şirket</span>
              <span>{d.airline.short}</span>
            </p>
            <p>
              <span>Kalkış: </span>
              <a target="blank" href={d.airport.origin?.website}>
                {d.airport.origin.name}({d.airport.origin.position.country.name}
                )
              </a>
            </p>
            <p>
              <span>Hedef: </span>
              <a target="blank" href={d.airport.destination?.website}>
                {d.airport.destination.name}(
                {d.airport.origin.position.country.name})
              </a>
            </p>

            <p>
              <span>Kalkış Zamanı</span>
              <span>{formatDate(d.time.scheduled.departure)}</span>
            </p>

            <p>
              <span>Varış Zamanı</span>
              <span>{formatDate(d.time.scheduled.arrival)}</span>
            </p>

            <p className={d.status.icon}>
              <span>{d.status.text}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
