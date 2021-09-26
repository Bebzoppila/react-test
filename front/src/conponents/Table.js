import React from "react";
import TableRow from "./Table-row";
import PropTypes from 'prop-types';
Table.propTypes = {
  data: PropTypes.array,
};


function Table({ data }) {
  function RenderTableRows() {
    return data.map((item) => (
      <TableRow
        key={item.id}
        quantity={item.quantity}
        date={item.date}
        name={item.name}
        distance={item.distance}
      ></TableRow>
    ));
  }

  return (
    <div className="table-main ">
      <table className="table table-primary" border="1">
        <caption>Табилца с данными</caption>
        <thead>
          <tr>
            <th scope="col">Дата</th>
            <th scope="col">Название</th>
            <th scope="col">Количество</th>
            <th scope="col">Расстояние</th>
          </tr>
        </thead>
        <tbody>{RenderTableRows()}</tbody>
      </table>
    </div>
  );
}

export default Table;
