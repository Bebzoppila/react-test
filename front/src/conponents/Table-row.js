import React from "react";
import PropTypes from 'prop-types';
TableRow.propTypes = {
    name: PropTypes.string,
    date: PropTypes.string,
    quantity: PropTypes.number,
    distance: PropTypes.number,
  };
function TableRow({name,date,quantity,distance}){
    return(
        <tr>
            <td>{date}</td>
            <td>{name}</td>
            <td>{quantity}</td>
            <td>{distance}</td>
        </tr>
    )
}

export default TableRow