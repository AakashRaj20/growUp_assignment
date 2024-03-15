"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  cartDetails,
  incrementItemQuantity,
  decrementItemQuantity,
} from "@/lib/features/cartDetailsSlice";
import Image from "next/image";

const OrderList = () => {
  const dispatch = useDispatch();

  const orders = useSelector(cartDetails);

  return (
    <div className="flex flex-col gap-10">
      {orders &&
        orders?.products?.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-start gap-6 shadow-md rounded-lg px-2 py-3"
            >
              <Image src={item.image} alt={item.name} width={50} height={50} />
              <div className="flex flex-col w-full gap-6">
                <p className="text-gray-600 font-bold">{item.title}</p>
                <div className="flex whitespace-nowrap justify-between items-center">
                  <p className="font-bold">{`$${item.price}`}</p>
                  <div className="flex items-center bg-gray-100 rounded-md px-2 py-1 gap-5 font-bold">
                    <button
                      onClick={() =>
                        dispatch(incrementItemQuantity({ productId: item.id }))
                      }
                    >
                      +
                    </button>
                    <button>{item.quantity}</button>
                    <button
                      onClick={() =>
                        dispatch(decrementItemQuantity({ productId: item.id }))
                      }
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default OrderList;
