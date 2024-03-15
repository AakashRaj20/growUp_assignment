"use client";

import OrderSummary from "./OrderSummary";
import { useSelector } from "react-redux";
import { cartDetails, paymentmethod } from "@/lib/features/cartDetailsSlice";

const OrderDetails = () => {
  const details = useSelector(cartDetails);
  const payment = useSelector(paymentmethod);
  return (
    <div className="flex flex-col gap-10">
      <h3 className="text-xl text-gray-500 font-bold">Order Details</h3>
      <h4 className="font-medium text-gray-500">
        Payment Method:{" "}
        <span className="font-bold text-black">{` ${
          payment === "CARDS" ? "Debit/Credit Card" : payment
        }`}</span>
      </h4>
      {details.products &&
        details.products.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-start gap-6 shadow-md rounded-lg px-2 py-3"
            >
              <img src={item.image} alt={item.name} width={50} height={50} />
              <div className="flex flex-col w-full gap-6">
                <p className="text-gray-600 font-bold">{item.title}</p>
                <div className="flex whitespace-nowrap justify-between items-center">
                  <p className="font-bold">{`$${item.price}`}</p>
                  <div className="flex items-center bg-gray-100 rounded-md px-2 py-1 gap-5">
                    <p className="font-bold">{`Quantity: ${item.quantity}`}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <div className="rounded-lg flex flex-col items-center">
        <OrderSummary />
      </div>
    </div>
  );
};

export default OrderDetails;
