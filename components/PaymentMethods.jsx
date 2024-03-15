"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartDetails, setPaymentMethod } from "@/lib/features/cartDetailsSlice";

const PaymentMethods = () => {
  const dispatch = useDispatch();
  const payMethods = useSelector(cartDetails);
  console.log(payMethods.paymentMethods);

  const [payOption, setPayOption] = useState("UPI");

  const images = [
    { id: 1, src: "/images/upi.png", alt: "upi" },
    { id: 2, src: "/images/card.png", alt: "card" },
  ];

  const paymentMethods =
    payMethods.paymentMethods &&
    images.map((image, index) => ({
      ...image,
      methodname: payMethods.paymentMethods[index],
    }));

  console.log(payOption);

  useEffect(() => {
    dispatch(setPaymentMethod(payOption));
  }, []);

  const handleClick = (methodname) => {
    setPayOption(methodname);
    dispatch(setPaymentMethod(methodname));
  };

  return (
    <div className="flex flex-col gap-5">
      {paymentMethods.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-lg shadow-md p-4 cursor-pointer"
          onClick={() => handleClick(item.methodname)}
        >
          <div className="flex items-center gap-4">
            <Image src={item.src} alt={item.alt} width={50} height={50} />
            <p className="text-gray-600 font-medium">
              {item.methodname === "CARDS"
                ? "Debit/Credit Cards"
                : item.methodname}
            </p>
          </div>
          <input
            className="w-6 h-6 border-2 border-gray-400 rounded-full checked:border-blue-400 checked:border-8"
            type="radio"
            name="payment"
            id={item.id}
            checked={payOption === item.methodname}
            readOnly
          />
        </div>
      ))}
    </div>
  );
};

export default PaymentMethods;
