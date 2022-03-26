import React from 'react';

const HeaderFilter = props => (
  <div className="headerToggle">
    <Button
      dClass={props.active === 'all' ? 'selected' : 'toggleButtons'}
      name="All Time"
      click={props.setAll}
    />
    <Button
      dClass={props.active === 'recent' ? 'selected' : 'toggleButtons'}
      name="Past 30"
      click={props.setRecent}
    />
  </div>
);

const Button = props => (
  <div onClick={props.click} className={props.dClass}>
    {props.name}
  </div>
);

export default HeaderFilter;
