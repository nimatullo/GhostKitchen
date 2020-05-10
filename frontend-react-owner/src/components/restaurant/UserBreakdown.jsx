import React from "react";
import { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import "./UserBreakdown.css";

const UserBreakdown = () => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchUrl();
  }, []);
  async function fetchUrl() {
    Axios.get("/restaurants/getListOfCustomers", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((res) => {
      console.log(res.data);

      if (res.data) {
        res.data.map((orders) => {
          const newLabel = labels;
          newLabel.push(orders.user.email);
          setLabels(newLabel);
          setData([...data, orders.numberOfPreviousOrders]);
          return null;
        });
      }
    });
  }
  return (
    <div className="customerBreakdownContainer">
      <h2>Customer List Breakdown</h2>
      <Pie
        width={500}
        data={{
          labels: labels,
          datasets: [
            {
              data,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#b0ea1f",
                "#e6c518",
                "#27f97f",
                "#c545aa",
                "#4296b0",
              ],
            },
          ],
        }}
      />
    </div>
  );
};

export default UserBreakdown;
