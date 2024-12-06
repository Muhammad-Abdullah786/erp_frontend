
"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useSWR from "swr";
import axios from "axios";
import { url } from "@/apiURL";
import Skeleton_Loading from "./Skeleton_Loading";

const Order_Container = () => {

  const [filtered_data, set_filtered_data] = useState([]);


  const fetcher = async () => {
    try {
      const fetch_data = await axios.get(`${url}/container/all_orders_container`);
      set_filtered_data(fetch_data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading } = useSWR("/api/containers", fetcher);


  if (isLoading) return <Skeleton_Loading />;
  if (error) return <p>Error loading data: {error.message}</p>;


  return (
    <>
    
        <div className="my-10">
          <div className="flex gap-5 justify-center flex-wrap">
            {filtered_data.map((e: any) => {
    
              return (
                <Card key={e._id} className="w-2/5 mx-auto shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="mt-4">
                    <h4 className="text-lg font-semibold mt-2">
                      Container:  {e.container_type}
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
                        {e?.containers?.map((container: any, index: any) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{container.size}</TableCell>
                            <TableCell>{container.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <p className="text-sm text-gray-600 mt-2">Material Weight:  {e.weight} </p>
                    <p className="text-sm text-gray-600 mt-2">Material Security: {e.handle_type}</p>

                    {/* Installment Details */}
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold">Installment Details</h4>
                      <Table className="mt-2">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">Installment</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {e?.installmentDetails?.map((installment: any, index: any) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{installment.installment_number}</TableCell>
                              <TableCell>{installment.amount}$</TableCell>
                              <TableCell>{installment.due_date ? new Date(installment.due_date).toLocaleDateString() : "No Due"}</TableCell>
                              <TableCell>{installment.status}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TableCell colSpan={4}>Remaining Amount</TableCell>
                            <TableCell className="text-right">${e?.remaining_amount}</TableCell>
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </div>

                  
                  </CardContent>
                  <CardFooter className="text-right mt-2">
                    <p className="text-xs text-gray-400">Booked At: {new Date(e?.created_at).toLocaleString()}</p>
                  </CardFooter>
                </Card>
              );
            }).reverse()}
          </div>
        </div>
     
    </>
  );
};

export default Order_Container;
