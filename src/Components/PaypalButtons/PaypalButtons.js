import {
  PayPalScriptProvider,
  PayPalButtons as ReactPayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import React, { useEffect } from "react";
import { useLoading } from "../../Hooks/useLoading.js";
import { pay } from "../../services/orderService.js";
import { useCart } from "../../Hooks/useCart.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PaypalButtons({ order }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AaGkuKBr3WZWrNNHu5_y7FkfPNC5o0QWr6tJTh4Wdja7T2ccMzwwjT1XIarkH5UhGX3HgSBd5FaAVMRJ",
      }}
    >
      <Buttons order={order} />
    </PayPalScriptProvider>
  );
}

function Buttons({ order }) {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [{ isPending }] = usePayPalScriptReducer();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    isPending ? showLoading() : hideLoading();
  }, [isPending, showLoading, hideLoading]);

  const createOrder = (data, actions) => {
    console.log("Creating order with:", order);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: parseFloat(order.totalPrice).toFixed(2),
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const payment = await actions.order.capture();
      const orderId = await pay(payment.id);
      clearCart();
      toast.success("Payment saved successfully", "Success");
      navigate("/track/" + orderId);
    } catch (error) {
      console.error("Payment capture error:", error);
      toast.error("Payment Save Failed", "Error");
    }
  };

  const onError = (err) => {
    console.error("PayPal error:", err);
    toast.error("Payment Failed", "Error");
  };

  return (
    <ReactPayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
    />
  );
}
