import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";

const ListView = ({ setDetailId }) => {
  const flightState = useSelector((store) => store);

  // GOSTERİLCEK İLK ELEMANIN STATEI
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 10;

  //  son gosterilcek elemanı belirler

  const endOffset = itemOffset + itemsPerPage;

  // belirlenen aralıktaki elemanları slice yardımıyla alır
  const currentItems = flightState.flights.slice(itemOffset, endOffset);
  // maks sayfa sayısınıı bulur
  const pageCount = Math.ceil(flightState.flights.length / itemsPerPage);

  // her yeni sayfa secildiğinde calısır
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % flightState.flights.length;

    setItemOffset(newOffset);
  };

  return (
    <div className="p-4">
      <table className="table table-dark table-striped table-hover table-responsive mt-5">
        <thead>
          <tr>
            <th>Id</th>
            <th>Kuyruk Kodu</th>
            <th>Enlem</th>
            <th>Boylam</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.slice(0, 10).map((i) => (
            <tr>
              <td>{i.id}</td>
              <td>{i.code}</td>
              <td>{i.lat}</td>
              <td>{i.lng}</td>
              <td>
                <button onClick={() => setDetailId(i.id)}>Detay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< önceki"
        nextLabel="sonraki >"
        className="pagination"
      />
    </div>
  );
};

export default ListView;
