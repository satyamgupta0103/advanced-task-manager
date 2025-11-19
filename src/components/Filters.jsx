import React from "react";

const Filters = ({ filter, setFilter }) => {
  const options = ["All", "Pending", "Completed"];
  return (
    <div className="filters" role="tablist">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => setFilter(o)}
          className={`filter-btn ${filter === o ? "active" : ""}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
};

export default React.memo(Filters);
