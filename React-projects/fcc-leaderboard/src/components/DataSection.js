import React from 'react';

import HeaderFilter from './HeaderFilter';
import Table from './Table';

const DataSection = props => {
  if (props.data.length === 0) return <div>LOADING . . .</div>;
  else
    return (
      <div>
        <HeaderFilter
          active={props.active}
          setAll={props.setAll}
          setRecent={props.setRecent}
        />
        <div className="dataSection">
          <Table data={props.data} />
        </div>
      </div>
    );
};

export default DataSection;
