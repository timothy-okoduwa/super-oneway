import React from 'react'
import './Home.css'

const Buttons = ({ filterItem, setUser, user, menuItems, originalUser }) => {
  return (
    <div className="types ">
      <button className="psd text-light" onClick={() => setUser(originalUser)}>
        All
      </button>

      {menuItems.map((val, id) => {
        return (
          <button
            className="psd text-light"
            onClick={() => filterItem(val)}
            key={id}
          >
            {val}
          </button>
        );
      })}
    </div>
  );
};

export default Buttons