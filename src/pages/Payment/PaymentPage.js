import React, { useEffect, useState } from "react";
import classes from "./paymentpage.module.css";
import { getNewOrderForCurrentUser } from "../../services/orderService.js";
import Title from "../../Components/Title/Title";
import OrderItemsList from "../../Components/OrderItemsList/OrderItemsList.js";
import Map from "../../Components/Map/Map.js";
import PaypalButtons from "../../Components/PaypalButtons/PaypalButtons.js";

export default function PaymentPage() {
  const [order, setOrder] = useState();

  // useEffect(() => {
  //   getNewOrderForCurrentUser().then((data) => setOrder(data));
  // }, []);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getNewOrderForCurrentUser();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    fetchOrder();
  }, []);

  if (!order) return;
  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.summary}>
            <div>
              <h3>Name:</h3>
              <span>{order.name}</span>
            </div>
            <div>
              <h3>Address:</h3>
              <span>{order.address}</span>
            </div>
          </div>
          <OrderItemsList order={order} />
        </div>
        <div className={classes.map}>
          <Title title="Your location" fontSize="1.6rem" />
          <Map readonly={true} location={order.addressLatLng} />
        </div>
        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
            <PaypalButtons order={order} />
          </div>
        </div>
      </div>
    </>
  );
}
