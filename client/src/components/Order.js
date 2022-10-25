import React, { useEffect } from "react";

function Order() {
  useEffect(() => {
    fetch("/order", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((response) => console.log(response));
  }, []);
  return <div></div>;
}

export default Order;
