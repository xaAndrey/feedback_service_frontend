import React, { useEffect, useState } from "react";
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
  const [count, setCount] = useState(0);
  const [value, setValue] = useState();

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
  }, [count, value]);

  const handleChangeCount = () => {
    if (count === 0) {
      setCount(1);
    } else {
      setCount(0);
    }
  }

  setTimeout(handleChangeCount, 300000)

  return (
    <div>
      <Navbar />
      {isFetching && <div>Loading...</div>}
      {error && <div>Error occurred while fetching data</div>}
      {registrationsData ? (
        <RegistrationsContentPage
          registrations={registrationsData}
          isFetching={isFetching}
          setValue={setValue}
        />
      ) : (
        <div>No data yet</div>
      )}
    </div>);
}
