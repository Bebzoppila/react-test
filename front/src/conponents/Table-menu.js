import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
TableMenu.propTypes = {
  sorted_input: PropTypes.string,
  ChangeSortedInput: PropTypes.func,
  filter_date: PropTypes.object,
  filter_columns: PropTypes.array,
  UpdateFilterDate: PropTypes.func,
  CombackToDefault: PropTypes.func,
};


function TableMenu({
  sorted_input,
  ChangeSortedInput,
  filter_columns,
  filter_date,
  UpdateFilterDate,
  CombackToDefault,
}) {
  const [filter_value, set_filter_value] = useState(filter_date);

  function RenderColumOptions() {
    return filter_columns.map((el, indx) => (
      <option key={indx} value={el}>
        {el}{" "}
      </option>
    ));
  }
  useEffect(()=> set_filter_value(filter_date),[filter_date])
  useEffect(() => UpdateFilterDate(filter_value), [filter_value.text]);

  function UpdateValueFilters(event, name) {
    let new_filter = { ...filter_value };
    new_filter[name] = event.target.value;
    set_filter_value(new_filter);
  }

  return (
    <div className="TableMenu">
      <div className="menu-item">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Поле для сортировки
          </label>
          <input
            value={sorted_input}
            onBlur={ChangeSortedInput}
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder=""
          />
        </div>
      </div>
      <div className="menu-item">
        <div>
          <p>Имя столбца</p>
          <select
            onInput={(event) => UpdateValueFilters(event, "colum")}
            value={filter_value.colum}
            className="form-select"
          >
            {RenderColumOptions()}
          </select>
        </div>
      </div>
      <div className="menu-item">
        <div>
          <p>Знак</p>
          <select
            onInput={(event) => UpdateValueFilters(event, "active_condition")}
            value={filter_value.active_condition}
            className="form-select"
          >
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value="===">===</option>
          </select>
        </div>
      </div>
      <div className="menu-item">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Значение
          </label>
          <input
            onChange={(event) => UpdateValueFilters(event, "text")}
            value={filter_value.text}
            type="text"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder=""
          />
        </div>
      </div>
      <button onClick={CombackToDefault} type="button" className="btn btn-primary">
        сбросить
      </button>
    </div>
  );
}

export default TableMenu;
