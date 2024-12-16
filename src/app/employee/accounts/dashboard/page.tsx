
"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import useSWR from "swr";
import axios from "axios";
import { url } from "@/apiURL";
// import Skeleton_Loading from "./Skeleton_Loading";

import AdminNavbar from "@/components/AdminNavbar";
import Orders from "../../../../components/Orders";



const page = () => {
  const [container_data, set_container_data] = useState([]);
  const [filtered_data, set_filtered_data] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetcher = async () => {
    try {
      const fetch_data = await axios.get(`${url}/container/all_orders_container`);
      set_container_data(fetch_data.data.data);
      set_filtered_data(fetch_data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading } = useSWR("/api/containers", fetcher);

  useEffect(() => {
    if (searchTerm) {
      const filtered = container_data.filter((order) =>
        Object.values(order).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      set_filtered_data(filtered);
    } else {
      set_filtered_data(container_data);
    }
  }, [searchTerm, container_data]);

  if (isLoading) return <h1>loading</h1>;
  if (error) return <p>Error loading data: {error.message}</p>;
  return (
    <>
      <AdminNavbar
        title="Accounts"
        menuItems={[
          { label: "Orders", href: "" },
          { label: "payments", href: "" },
        ]}
      />
         
         {filtered_data.length > 0 && (
        <div className="mx-20 gap-5 my-10 flex justify-start">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search orders"
          />
        </div>
      )}

      {filtered_data.length > 0 ? (
        <div className="my-10">
          <div className="flex gap-5 justify-center flex-wrap">
            {filtered_data.map((e: any) => {
        

              return (
                <Card key={e._id} className="w-2/5 mx-auto shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="mt-4">
                    <h4 className="text-lg font-semibold mt-2">
                      Container:  {e.container_type}
                    </h4>
                    

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
      ) : (
        <div className="my-10">
          <div className="boxes flex justify-center items-center">
            <h1 className="text-2xl text-red-400">No orders to show</h1>
          </div>
        </div>
      )}


    </>
  );
};

export default page;
