import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  requestRegistrationsData,
  receiveRegistrationsData,
  requestRegistrationsError,
} from "./redux";
import { fetchAllRegistration } from "../../api/registrations/request";
import { RegistrationsContentPage } from "./RegistrationsContentPage";
import { Navbar } from "../../components/Navbar";

export function Registrations() {
  const dispatch = useAppDispatch();
  const { isFetching, payload: registrationsData, error } = useAppSelector(
    (state) => state.registrations
  );

  useEffect(() => {
    dispatch(requestRegistrationsData());
    fetchAllRegistration(0, 100)
      .then((data) => {
        const users = data;
        console.log(users);
        dispatch(receiveRegistrationsData(data.result))})
      .catch((error) => {
        dispatch(requestRegistrationsError(error));
      });
  }, []);

  return (
    <div>
      <Navbar />
      {isFetching && <div>Loading...</div>}
      {error && <div>Error occurred while fetching data</div>}
      {registrationsData ? (
        <RegistrationsContentPage
          registrations={registrationsData}
          isFetching={isFetching}
        />
      ) : (
        <div>No data yet</div>
      )}
    </div>);
}
