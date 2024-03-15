"use client";

import { useSelector } from "react-redux";
import { cartDetails, totalPrice } from "@/lib/features/cartDetailsSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const PaymentBar = () => {
  const pathName = usePathname();

  const orders = useSelector(cartDetails);
  const total = useSelector(totalPrice);

  return (
    <div className="fixed left-0 bottom-0 z-10 w-full">
      <div className="flex justify-between items-center border-gray-200 border-2 bg-white p-6">
        {pathName === "/payment" ? (
          <div className="flex flex-col w-full gap-7">
            <div className="flex justify-between font-bold">
              <p className="text-gray-500">Total</p>
              <p>{`$${total}`}</p>
            </div>
            <Link href="/order-status">
              <button className="bg-blue-500 py-2 rounded-md w-full text-white font-bold whitespace-nowrap">
                Make Payment
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <p className="text-gray-400 font-medium">Total</p>
              <p className="font-bold">{orders.products && `$${total}`}</p>
            </div>
            <Link href="/payment">
            <button
              onClick={handleClick}
              className="text-white bg-blue-500 px-3 py-2 rounded-md whitespace-nowrap"
            >
              Payment
            </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentBar;
