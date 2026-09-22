import axios from "axios";
import React, { useEffect, useState } from "react";

function useGet(path, id) {
  console.log(id);

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `https://api.escuelajs.co/api/v1/${path}${id ? `/${id}` : ""}`,
        );
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, [path, id]);

  return [data];
}

export default useGet;
