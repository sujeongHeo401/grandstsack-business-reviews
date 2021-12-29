import React from "react";

function BusinessResults(props) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { businesses } = props;
  return (
    
      <form>
      <label>
        Select Business Category:
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="All">All</option>
          <option value="Library">Library</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Car Wash">Car Wash</option>
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default BusinessResults;