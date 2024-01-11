import React, { useEffect, useReducer, useCallback } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { constructHeader } from "../util";

const url = "http://localhost:5000/v1/petDetails";

const initialState = { pet: null, loading: true };

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { pet: action.payload, loading: false };
    default:
      throw new Error();
  }
}

export const PetDetails = () => {
    const { id } = useParams();  
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();

    const redirect = useCallback(() => {
        localStorage.clear();
        history.push("/login");
      }, [history]);
    
      useEffect(() => {
        fetch(`${url}/${id}`, { headers: constructHeader() })
          .then((res) => (res.status === 401 ? redirect() : res.json()))
          .then((data) => {
            if (data) {
              dispatch({ type: 'FETCH_SUCCESS', payload: data.pet });
            }
          })
          .catch((err) => console.log("Error fetching pets ", err.message));
      }, [id, redirect]);
  
    if (state.loading) {
        return <div>Loading...</div>;
      }
  
    return (
      <div>
        <h1>Details</h1>
        <div>Pet id {id}</div>
        <h2>Name: {state.pet.name}</h2>
        <p>Type: {state.pet.type}</p>
        <p>Gender: {state.pet.gender}</p>
        <p>Breed: {state.pet.breed}</p>
        </div>
    );
  };