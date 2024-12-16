"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import axios from "axios";
import { toast } from "react-toastify";
import useStore from "@/store/Zustand_Store";
import { url } from "@/apiURL";
import Skeleton_Loading from "../Skeleton_Loading";
const Client_Container_History = () => {
  const router = useRouter();
  const set_client_secret = useStore((state) => state.set_client_secret);
  const set_client_container_installment_id = useStore((state) => state.set_client_container_installment_id);
  const set_client_container_id = useStore((state) => state.set_client_container_id);
  const set_installment_amount = useStore((state) => state.set_installment_amount);
  const [card, setcard] = useState([]);

  const fetcher = async () => {
    try {
      const fetch_data = await axios.get(
        `${url}/container/container_client_history`,
        {
          headers: {
            token: localStorage.getItem("accessToken"),
          },
        }
      );
      console.log(fetch_data);
      setcard(fetch_data.data.data);
      return fetch_data.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const client_verify = async (amount: any, container_id: any, installment_id: any) => {
    try {
      set_client_container_id(container_id);
      set_client_container_installment_id(installment_id);
      set_installment_amount(amount);
      const client_id = await axios.post(`${url}/container/payment_container`, {
        down_payment: amount,
      });
      if (client_id.status === 200) {
        set_client_secret(client_id.data.data);
        toast.success(
          `Payment Processing on ${new Date().toLocaleString()}`
        );
        router.push("/payment");
      }
    } catch (error) {
      toast.error(
        `Payment Failed! Please try Again  ${new Date().toLocaleString()}`
      );
    }
  };

  const { data, error, isLoading } = useSWR("/api/containers", fetcher);

  if (isLoading) return <Skeleton_Loading />;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <>
      <div className=" my-10">
        <div className="flex gap-5 justify-between flex-wrap">
          {card.map((e: any) => {
            const s = e.tracking_stages.delivered.status;
            const s_d = new Date(
              e.tracking_stages.delivered.timestamp
            ).toLocaleDateString();
            const p = e.tracking_stages.pickup.status;
            const p_d = new Date(
              e.tracking_stages.pickup.timestamp
            ).toLocaleDateString();
            const t = e.tracking_stages.inTransit.status;
            const t_d = new Date(
              e.tracking_stages.inTransit.timestamp
            ).toLocaleDateString();
            return (
              <>
                <Card
                  key={e._id}
                  className=" w-2/5 mx-auto border-2 border-gray-400 hover:bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300 "
                >
                  <CardContent className="mt-4">
                    <h4 className="text-lg font-semibold mt-2">
                      Container : {e.container_type}
                    </h4>
                    <Table className="mt-2">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Sno</TableHead>
                          <TableHead>Container Size</TableHead>
                          <TableHead>Quantity</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {e?.containers?.map((installment: any, index: any) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {index + 1}
                            </TableCell>
                            <TableCell>{installment.size}</TableCell>
                            <TableCell>{installment.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <p className="text-sm text-gray-600 mt-2">
                      Material Weight : {e.weight} Tons
                    </p>
                    {/* <p className="text-sm text-gray-600 mt-2">Material Security : {e.handle_type}</p> */}
                    <div className="mt-2">
                      <h4 className="text-lg font-semibold mt-2">
                        Receiver Details:
                      </h4>
                      <p className="text-sm text-gray-600  mt-2">
                        Name : {e?.receiver_details?.name}
                      </p>
                      <p className=" text-sm text-gray-600 mt-2">
                        Address : {e?.receiver_details?.address}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Phone : <span className="">{e?.receiver_details?.country_code}</span> {e?.receiver_details?.phone}
                      </p>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold">
                        Installment Details{" "}
                      </h4>
                      <Table className="mt-2">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">
                              Installment
                            </TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Pay</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {e?.installmentDetails?.map(
                            (installment: any, index: any) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">
                                  {installment.installment_number}
                                </TableCell>
                                <TableCell>{installment.amount}$</TableCell>
                                {installment?.due_date ? (
                                  <>
                                    {" "}
                                    <TableCell>
                                      {new Date(
                                        installment.due_date
                                      ).toLocaleDateString()}
                                    </TableCell>{" "}
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <TableCell>no Due</TableCell>{" "}
                                  </>
                                )}
                                <TableCell>{installment.status}</TableCell>
                                <TableCell>
                                  {installment.status === "paid" ? (
                                    "✔️"
                                  ) : (
                                    <Button
                                      variant={"outline"}
                                      onClick={() => client_verify(installment.amount, e._id, installment._id)}
                                      className="px-3 py-1 text-sm hover:bg-black  hover:text-white"
                                    >
                                      Pay Now
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TableCell colSpan={4}>Remainig Amount </TableCell>
                            <TableCell className="text-right">
                              ${e?.remaining_amount}
                            </TableCell>
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </div>

                    <h4 className="text-lg font-semibold mt-4">
                      Tracking Details
                    </h4>

                    <Table className="mt-2">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Sno</TableHead>
                          <TableHead>Booked</TableHead>
                          <TableHead>Pickup</TableHead>
                          <TableHead>Transit</TableHead>
                          <TableHead>Delivered</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">1</TableCell>
                          <TableCell>{e.tracking_status ? "✔️" : ""}</TableCell>

                          <TableCell>{p ? "✔️" : "✖️"}</TableCell>
                          <TableCell>{t ? "✔️" : "✖️"}</TableCell>
                          <TableCell>{s ? "✔️" : "✖️"}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">2</TableCell>
                          <TableCell>
                            {new Date(e?.created_at).toLocaleDateString()}
                          </TableCell>

                          <TableCell>{p_d}</TableCell>
                          <TableCell>{t_d}</TableCell>
                          <TableCell>{s_d}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="text-right mt-2">
                    <p className="text-xs text-gray-400">
                      Booked At: {new Date(e?.created_at).toLocaleString()}
                    </p>
                  </CardFooter>
                </Card>
              </>
            );
          }).reverse()}
        </div>
      </div>
    </>
  );
};

export default Client_Container_History;