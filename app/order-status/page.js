"use client";

import { useDispatch } from "react-redux";
import { resetCart } from "@/lib/features/cartDetailsSlice";
import Link from "next/link";
import ThemeSwitch from "@/components/ThemeSwitcher";
import OrderDetails from "@/components/OrderDetails";

const OrderStatus = () => {
  const dispatch = useDispatch();

  const statusArray = ["Success", "Pending", "Failed"];
  const randomIndex = Math.floor(Math.random() * statusArray.length);
  const status = statusArray[randomIndex];

  let textColor = "";
  let statusText = "";

  if (status === "Success") {
    textColor = "text-green-500";
    statusText = "Order Placed Successfully, Your Order is on the way!";
  } else if (status === "Pending") {
    textColor = "text-yellow-500";
    statusText = "Your Order is Pending, We will notify you once it is done!";
  } else {
    textColor = "text-red-500";
    statusText =
      "Your Order has Failed, Amount paid will be paid back to you within 7-days, Please Try Again!";
  }

  return (
    <div className="flex flex-col gap-8 lg:gap-16">
      <div className="flex justify-between pl-24 md:pl-8">
        <h1 className="text-gray-500 dark:text-white font-bold text-2xl text-center">
          Order Status
        </h1>
        <ThemeSwitch />
      </div>
      <div className="flex flex-col md:px-24 lg:px-48 gap-10">
        <p className={`${textColor} font-bold text-xl`}>{statusText}</p>
        <OrderDetails />
        <div className="fixed bg-white dark:bg-neutral-900 dark:border-none w-full left-0 bottom-0 p-5 border-t-gray-300 border-t-2">
          <Link href="/">
            <button
              className="w-full bg-blue-500 rounded-md text-white p-3"
              onClick={() => dispatch(resetCart())}
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
