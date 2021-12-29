import React from "react";
import { starredVar } from "./index";
import { useAuth0 } from "@auth0/auth0-react";

function BusinessResults(props) {
  const { businesses } = props;
  const starredItems = starredVar();
  const { isAuthenticated } = useAuth0();

  console.log("!!!!!!!!!!1 isAuthenticated:", isAuthenticated);

  return (
    <div>
      <h2>Results</h2>
      <table>
        <thead>
          <tr>
            <th>Star</th>
            <th>Name</th>
            <th>Address</th>
            <th>Category</th>
            {isAuthenticated ? <th>Average Stars</th> : null}
          </tr>
        </thead>
        <tbody>
          {businesses.map((b) => (
            <tr key={b.businessId}>
              <td>
                <button
                  onClick={() => starredVar([...starredItems, b.businessId])}
                >
                  Star
                </button>
              </td>

              <td style={b.isStarred ? { fontWeight: "bold" } : null}>
                {b.name}
              </td>
              <td>{b.address}</td>
              <td>
                {b.in_category.reduce(
                  (acc, c, i) => acc + (i === 0 ? " " : ", ") + c.name,
                  ""
                )}
              </td>
              {/* {isAuthenticated ? <td>{b.averageStars}</td> : null} */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BusinessResults;