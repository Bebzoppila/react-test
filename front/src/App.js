import React, { useState, useEffect } from "react";
import Menu from "./conponents/Table-menu";
import Table from "./conponents/Table";

const test_table_data = [
  {
    id: 1,
    date: "10.19.2001",
    name: "Бананы",
    quantity: 6,
    distance: 180,
  },
  {
    id: 2,
    date: "13.27.2001",
    name: "Груши",
    quantity: 10,
    distance: 90,
  },
  {
    id: 3,
    date: "15.20.2000",
    name: "Яблоки",
    quantity: 5,
    distance: 30,
  },
];

function App() {
  const [sorted_input, set_sorted_input] = useState("");
  const [table_data, set_table_data] = useState(test_table_data);
  const [filter_date, set_filter_date] = useState({
    colum: "id",
    active_condition: ">",
    text: "",
  });

  // Установка значения в переменную  sorted_input
  function ChangeSortedInput(event) {
    set_sorted_input(event.target.value.trim());
  }
  //Устанавливаются новые данные фильтра
  function UpdateFilterDate(object) {
    set_filter_date(object);
  }

  // Сбрасываются значения
  function CombackToDefault() {
    set_filter_date({
      colum: "id",
      active_condition: ">",
      text: "",
    });
  }

  // Проходил ли элемент фильтрацию
  function ConditionFilter(value) {
    const condition = {
      ">": (el1, el2) => el1 > el2,
      "<": (el1, el2) => el1 < el2,
      "===": (el1, el2) => el1 == el2,
    };
    return condition[filter_date.active_condition](
      value[filter_date.colum],
      filter_date.text
    );
  }

  // Фунция заргузки данных
  async function FethingDate() {
    const fetchind_response = await fetch(
      "http://127.0.0.1:5000/api/v1/table-data"
    );
    const fetchind_date = await fetchind_response.json();
    set_table_data(fetchind_date);
  }

  // Абстрактная функция проверки, содержиться ли в строке значение из input input
  function TableIncludesValueInput(keys, table_row) {
    return keys.some((key) =>
      String(table_row[key])
        .toUpperCase()
        .includes(String(sorted_input).toUpperCase())
    );
  }

  // Хук загрузки данных
  useEffect(() => {
    FethingDate();
  }, []);

  // Сортировка после изменения значения инпута
  useEffect(() => {
    const new_sorted_data = [...table_data];
    const table_data_keys = Object.keys(new_sorted_data[0]).filter(
      (key) => key !== "date"
    );
    new_sorted_data.sort((el1, el2) => {
      const el1_includes_values = TableIncludesValueInput(table_data_keys, el1);
      const el2_includes_values = TableIncludesValueInput(table_data_keys, el2);
      if (el1_includes_values) {
        return -1;
      }
      if (el2_includes_values) {
        return 1;
      }
      return 0;
    });
    set_table_data(new_sorted_data);
  }, [sorted_input]);

  return (
    <div className="App">
      <Menu
        CombackToDefault={CombackToDefault}
        filter_date={filter_date}
        sorted={sorted_input}
        ChangeSortedInput={ChangeSortedInput}
        UpdateFilterDate={UpdateFilterDate}
        filter_columns={Object.keys(table_data[0] || {})}
      ></Menu>
      <Table data={table_data.filter((el) => ConditionFilter(el))}></Table>
    </div>
  );
}

export default App;
