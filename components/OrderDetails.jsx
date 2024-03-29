"use client";

import OrderSummary from "./OrderSummary";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import {
  cartDetails,
  paymentmethod,
  isCartLoading,
} from "@/lib/features/cartDetailsSlice";

const OrderDetails = () => {
  const details = useSelector(cartDetails);
  const payment = useSelector(paymentmethod);
  const isLoading = useSelector(isCartLoading);
  return (
    <div className="flex flex-col gap-10">
      <h3 className="text-xl dark:text-white text-gray-500 font-bold">
        Order Details
      </h3>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h4 className="font-bold dark:text-gray-200 text-gray-500">
            Payment Method:{" "}
            <span className="text-black dark:text-white">{` ${
              payment === "CARDS" ? "Debit/Credit Card" : payment
            }`}</span>
          </h4>
          {details.products &&
            details.products.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-start gap-6 shadow-md rounded-lg px-2 py-3 md:p-6 dark:bg-neutral-900"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                  />
                  <div className="flex flex-col w-full gap-6">
                    <p className="text-gray-600 dark:text-white font-bold">
                      {item.title}
                    </p>
                    <div className="flex whitespace-nowrap justify-between items-center">
                      <p className="font-bold">{`$${item.price}`}</p>
                      <div className="flex items-center dark:bg-neutral-700 bg-gray-100 rounded-md px-2 py-1 gap-5">
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
        </>
      )}
    </div>
  );
};

export default OrderDetails;
