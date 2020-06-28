import React, { useState, useEffect } from "react";
import { useApi } from "@bahachammakhi/hooks";
import axios from "axios";

const getPeople = () => axios.get("https://swapi.dev/api/people/");

const Example = () => {
  const { ...calls } = useApi({ getPeople });
  const [people, setPeople] = useState<any>([]);

  useEffect(() => {
    calls.getPeople.call();
  }, []);
  useEffect(() => {
    setPeople(calls.getPeople.data);
  }, [calls.getPeople.success]);

  return (
    <>
      {people?.results?.map((element: any) => {
        return <div>{element.name}</div>;
      })}
    </>
  );
};
export default Example;
