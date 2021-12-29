import './App.css';
import React, { useState }  from "react";
import BusinessResults from "./BusinessResult"
import { useAuth0 } from "@auth0/auth0-react";
import { gql, useQuery } from "@apollo/client";
import Profile from "./Profile";



function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();


  console.log("왜그래 ??? ",isAuthenticated )
  const BUSINESS_DETAILS_FRAGMENT = gql`
    fragment businessDetails on Business {
      businessId
      name
      address
      # ${isAuthenticated ? "averageStars" : ""}
      in_category {
        name
      }
      isStarred @client
    }
    `;

  const GET_BUSINESSES_QUERY = gql`
  query BusinessesByCategory($selectedCategory: String!) {
    Business(
      filter: { in_category_some: { name_contains: $selectedCategory } }
    ) {
       ...businessDetails
    }
  }
  ${BUSINESS_DETAILS_FRAGMENT}
`;

  const { loading, error, data } = useQuery(GET_BUSINESSES_QUERY, {
    variables: { selectedCategory },
  });

  console.log("data:", data)

  if (error) {
    console.log("error:", error);
    
  } 
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
      {isAuthenticated && <button onClick={() => logout()}>Log Out</button>}
      <Profile />
      <h1>Business Search</h1>
      <form>
        <label>
          Select Business Category:
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="">All</option>
            <option value="Library">Library</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Car Wash">Car Wash</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>

      <BusinessResults businesses={data.Business} />
    </div>
  );
}

export default App;