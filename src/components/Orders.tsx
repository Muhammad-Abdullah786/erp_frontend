// "use client";
// import React, { useState } from "react";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input"
// import useSWR from "swr";
// import axios from "axios";
// import { url } from "@/apiURL";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import Skeleton_Loading from "./Skeleton_Loading";

// const Order_Container = () => {

//     const {register , handleSubmit , reset } = useForm();
//     const [container_data , set_container_data] = useState([]);

//     const fetcher = async () => {
//         try {
//           const fetch_data = await axios.get(`${url}/container/all_orders_container`);
//           set_container_data(fetch_data.data.data)
//           return fetch_data.data.data;
//         } catch (error) {
//           console.log(error);
//         }
//       };

//     const { data, error, isLoading } = useSWR("/api/containers", fetcher);

//     function removeEmptyKeys(obj: Record<string, any>): Record<string, any> {
//         return Object.fromEntries(
//           Object.entries(obj).filter(([_, value]) => value !== undefined && value !== null && value !== "")
//         );
//       }

//     const onsubmit = async(data : any) => {
//         try{
//            const new_Data =  removeEmptyKeys(data);
//             const response = await axios.post(`${url}/container/filter_container_orders`, new_Data);
//             set_container_data(response.data.data);
//         }
//         catch(e){
//          console.log(e);
//         }
//     }

//     if (isLoading) return <Skeleton_Loading />;
//     if (error) return <p>Error loading data: {error.message}</p>;

//   return (
//     <>
//     <form onSubmit={handleSubmit(onsubmit)} >
//      <div className=" mx-20  gap-5 my-10 flex justify-evenly flex-wrap">
//      <div><Input type="text" {...register('container_type')} placeholder="Container Type" /></div>
//      <div><Input type="text" {...register('weight')} placeholder="weight" /></div>
//      <div><Input type="text" {...register('size')} placeholder="Size" /></div>
//      <div><Input type="text" {...register('price')} placeholder="Amount" /></div>
//      <div><Input type="text" {...register('handle_type')} placeholder="Handle Type" /></div>
//      <div><Input type="text" {...register('tracking_status')} placeholder="Tracking Status" /></div>
//      <div><Input type="text" {...register('status')} placeholder="Installement Status" /></div>
//      <div><Input type="text" {...register('startDate')} placeholder="Date" /></div>
//      <div><Button type="submit" >Search</Button></div>
//      </div>
//     </form>

//      {container_data.length > 0 ?

//      <div className=" my-10">
//         <div className="flex gap-5  justify-evenly flex-wrap">
//           {container_data?.map((e: any) => {
//             const s = e.tracking_stages.delivered.status;
//             const s_d = new Date(
//               e.tracking_stages.delivered.timestamp
//             ).toLocaleDateString();
//             const p = e.tracking_stages.pickup.status;
//             const p_d = new Date(
//               e.tracking_stages.pickup.timestamp
//             ).toLocaleDateString();
//             const t = e.tracking_stages.inTransit.status;
//             const t_d = new Date(
//               e.tracking_stages.inTransit.timestamp
//             ).toLocaleDateString();
//             return (
//               <>
//                 <Card
//                   key={e._id}
//                   className=" w-2/5 mx-auto shadow-md hover:shadow-lg transition-shadow duration-300 "
//                 >
//                   <CardContent className="mt-4">
//                     <h4 className="text-lg font-semibold mt-2">
//                       Container : {e.container_type}
//                     </h4>
//                     <Table className="mt-2">
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead className="w-[100px]">Sno</TableHead>
//                           <TableHead>Conatainer Size</TableHead>
//                           <TableHead>Quantity</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {e?.containers?.map((installment: any, index: any) => (
//                           <TableRow key={index}>
//                             <TableCell className="font-medium">
//                               {index + 1}
//                             </TableCell>
//                             <TableCell>{installment.size}</TableCell>
//                             <TableCell>{installment.quantity}</TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                     <p className="text-sm text-gray-600 mt-2">
//                       Material Weight : {e.weight} Tons
//                     </p>
//                     <p className="text-sm text-gray-600 mt-2">Material Security : {e.handle_type}</p>
//                     <div className="mt-2">
//                       <h4 className="text-lg font-semibold mt-2">
//                         Receiver Details:
//                       </h4>
//                       <p className="text-sm text-gray-600  mt-2">
//                         Name : {e?.receiver_details?.name}
//                       </p>
//                       <p className=" text-sm text-gray-600 mt-2">
//                         Address : {e?.receiver_details?.address}
//                       </p>
//                       <p className="text-sm text-gray-600 mt-2">
//                         Phone : <span className="">{e?.receiver_details?.country_code }</span> {e?.receiver_details?.phone}
//                       </p>
//                     </div>
//                     <div className="mt-4">
//                       <h4 className="text-lg font-semibold">
//                         Installment Details{" "}
//                       </h4>
//                       <Table className="mt-2">
//                         <TableHeader>
//                           <TableRow>
//                             <TableHead className="w-[100px]">
//                               Installment
//                             </TableHead>
//                             <TableHead>Amount</TableHead>
//                             <TableHead>Due Date</TableHead>
//                             <TableHead>Status</TableHead>
//                             <TableHead>Pay</TableHead>
//                           </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                           {e?.installmentDetails?.map(
//                             (installment: any, index: any) => (
//                               <TableRow key={index}>
//                                 <TableCell className="font-medium">
//                                   {installment.installment_number}
//                                 </TableCell>
//                                 <TableCell>{installment.amount}$</TableCell>
//                                 {installment?.due_date ? (
//                                   <>
//                                     {" "}
//                                     <TableCell>
//                                       {new Date(
//                                         installment.due_date
//                                       ).toLocaleDateString()}
//                                     </TableCell>{" "}
//                                   </>
//                                 ) : (
//                                   <>
//                                     {" "}
//                                     <TableCell>no Due</TableCell>{" "}
//                                   </>
//                                 )}
//                                 <TableCell>{installment.status}</TableCell>
//                                 <TableCell>
//                                   {installment.status === "paid" ? "✔️" : "✖️"}
//                                 </TableCell>
//                               </TableRow>
//                             )
//                           )}
//                         </TableBody>
//                         <TableFooter>
//                           <TableRow>
//                             <TableCell colSpan={4}>Remainig Amount </TableCell>
//                             <TableCell className="text-right">
//                               ${e?.remaining_amount}
//                             </TableCell>
//                           </TableRow>
//                         </TableFooter>
//                       </Table>
//                     </div>

//                     <h4 className="text-lg font-semibold mt-4">
//                       Tracking Details
//                     </h4>

//                     <Table className="mt-2">
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead className="w-[100px]">Sno</TableHead>
//                           <TableHead>Booked</TableHead>
//                           <TableHead>Pickup</TableHead>
//                           <TableHead>Transit</TableHead>
//                           <TableHead>Delivered</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         <TableRow>
//                           <TableCell className="font-medium">1</TableCell>
//                           <TableCell>{e.tracking_status ? "✔️" : ""}</TableCell>

//                           <TableCell>{p ? "✔️" : "✖️"}</TableCell>
//                           <TableCell>{t ? "✔️" : "✖️"}</TableCell>
//                           <TableCell>{s ? "✔️" : "✖️"}</TableCell>
//                         </TableRow>
//                         <TableRow>
//                           <TableCell className="font-medium">2</TableCell>
//                           <TableCell>
//                             {new Date(e?.created_at).toLocaleDateString()}
//                           </TableCell>

//                           <TableCell>{p_d}</TableCell>
//                           <TableCell>{t_d}</TableCell>
//                           <TableCell>{s_d}</TableCell>
//                         </TableRow>
//                       </TableBody>
//                     </Table>
//                   </CardContent>
//                   <CardFooter className="text-right mt-2">
//                     <p className="text-xs text-gray-400">
//                       Booked At: {new Date(e?.created_at).toLocaleString()}
//                     </p>
//                   </CardFooter>
//                 </Card>
//               </>
//             );
//           }).reverse()}
//         </div>
//       </div>
           
//       :
//       <div className="my-10">
//         <div className="boxes flex justify-center items-center">
//              <h1 className="text-4xl">No Orders Found</h1>
//         </div>
//       </div> 
//       }
//     </>
//   )
// }

// export default Order_Container

"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import useSWR from "swr";
import axios from "axios";
import { url } from "@/apiURL";
import Skeleton_Loading from "./Skeleton_Loading";

const Order_Container = () => {
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

  if (isLoading) return <Skeleton_Loading />;
  if (error) return <p>Error loading data: {error.message}</p>;

  const highlightText = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  return (
    <>
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
              const s = e.tracking_stages.delivered.status;
              const s_d = new Date(e.tracking_stages.delivered.timestamp).toLocaleDateString();
              const p = e.tracking_stages.pickup.status;
              const p_d = new Date(e.tracking_stages.pickup.timestamp).toLocaleDateString();
              const t = e.tracking_stages.inTransit.status;
              const t_d = new Date(e.tracking_stages.inTransit.timestamp).toLocaleDateString();

              return (
                <Card key={e._id} className="w-2/5 mx-auto shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="mt-4">
                    <h4 className="text-lg font-semibold mt-2">
                      Container: <span dangerouslySetInnerHTML={{ __html: highlightText(e.container_type) }} />
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

                    <p className="text-sm text-gray-600 mt-2">Material Weight: <span dangerouslySetInnerHTML={{ __html: highlightText(String(e.weight)) }} /></p>
                    <p className="text-sm text-gray-600 mt-2">Material Security: {e.handle_type}</p>

                    {/* Receiver details */}
                    <div className="mt-2">
                      <h4 className="text-lg font-semibold mt-2">Receiver Details:</h4>
                      <p className="text-sm text-gray-600 mt-2">Name: {e?.receiver_details?.name}</p>
                      <p className="text-sm text-gray-600 mt-2">Address: {e?.receiver_details?.address}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Phone: <span>{e?.receiver_details?.country_code}</span> {e?.receiver_details?.phone}
                      </p>
                    </div>

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

                    {/* Tracking Details */}
                    <h4 className="text-lg font-semibold mt-4">Tracking Details</h4>
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
                          <TableCell>{new Date(e?.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>{p_d}</TableCell>
                          <TableCell>{t_d}</TableCell>
                          <TableCell>{s_d}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
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

export default Order_Container;
