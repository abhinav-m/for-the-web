import React from 'react';

const Table = props => (
  <table className="dataTable">
    <tbody>
      <tr className="dataRow">
        <th>#</th>
        <th>Logo</th>
        <th>User</th>
        <th>Points (All time)</th>
        <th>Points (Last 30 days)</th>
      </tr>
      {props.data.map((content, i) => (
        <RowData key={i + 1} idx={i + 1} content={content} />
      ))}
    </tbody>
  </table>
);

const RowData = props => (
  <tr className="dataRow">
    <td className="index">{props.idx}</td>
    <td>
      <img
        className="logo"
        src={props.content.img}
        alt={props.content.username}
      />
    </td>
    <td className="userArea">{props.content.username}</td>
    <td className="points">{props.content.alltime}</td>
    <td className="points">{props.content.recent}</td>
  </tr>
);

export default Table;
