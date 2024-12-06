

"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { url } from "@/apiURL";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useStore from "@/store/Zustand_Store";
// Define the form data type
type FormValues = {
  container_type: string;
  weight: number;
  containers: { size: string; quantity: number }[];
  price: number;
  handling_type: string;
  installments: any;
  installment_period : any ;
  installmentDetails: { installment_number: any; amount: any; status: any }[];
  receiver_details: {
    name: string;
    address: string;
    country_code : string;
    phone: string;
  };
};


const Container_Book = () => {
   

  const [codes, setCodes] = useState([]);

  useEffect(() => {
    async function fetchCountryCodes() {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countries = await response.json();
      const countryData = countries.map((country : any) => ({
        name: country.name.common,
        code: country.cca2,
        callingCode: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""),
      }));
      setCodes(countryData);
    }

    fetchCountryCodes();
  }, []);

  const set_client_secret = useStore((state) => state.set_client_secret);
  const save_form_data = useStore((state) => state.save_form_data);
  const payment_loading = useStore((state) => state.payment_loading);
  const set_payment_loading = useStore((state) => state.set_payment_loading);
  const set_installment_amount = useStore(
    (state) => state.set_installment_amount
  );

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormValues>();

  const weight = watch("weight"); // Watch the weight field for changes
  const price = watch("price"); // Watch price field dynamically
  const installments: any = watch("installments"); // Watch installments value
  const installment_period: any = watch("installment_period"); // Watch installment_period value
  console.log(installment_period);

  useEffect(() => {
    if (weight) {
      const containerDetails: { size: string; quantity: number }[] = [];
      let remainingWeight = weight; // User input ka weight
      let totalPrice = 0;

      // Container prices
      const price20 = 1000; // Price of 20 feet container
      const price40 = 2000; // Price of 40 feet container

      // Step 1: Use 40-feet containers for maximum capacity
      if (remainingWeight >= 4) {
        const quantity40 = Math.floor(remainingWeight / 4); // 40-feet containers required
        containerDetails.push({ size: "40 feet", quantity: quantity40 });
        totalPrice += quantity40 * price40; // Update price
        remainingWeight -= quantity40 * 4; // Subtract weight handled by 40-feet containers
      }

      // Step 2: Use 20-feet containers for remaining weight
      if (remainingWeight > 0) {
        const quantity20 = Math.ceil(remainingWeight / 2); // 20-feet containers required
        containerDetails.push({ size: "20 feet", quantity: quantity20 });
        totalPrice += quantity20 * price20; // Update price
        remainingWeight -= quantity20 * 2; // Subtract weight handled by 20-feet containers
      }

      // Step 3: Installments Calculation
      const installmentDetails: {
        installment_number: any;
        amount: any;
        status: any;
      }[] = [];
      for (let i = 1; i <= installment_period; i++) {
        installmentDetails.push({
          installment_number: i,
          amount: parseFloat((totalPrice / installment_period).toFixed(2)), // Divide equally and round to 2 decimal places
          status: i === 1 ? "paid" : "pending",
        });
      }

      setValue("installmentDetails", installmentDetails);
      // Step 3: Update form fields
      setValue("containers", containerDetails);
      setValue("price", totalPrice);
    } else {
      setValue("containers", []);
      setValue("price", 0);
      setValue("installmentDetails", []);
    }
  }, [weight, setValue, installment_period]);

  useEffect(() => {
    if (installments === "full_payment") {
      setValue("installment_period", 1); // Set default to 1 for full payment
    }
  }, [installments, setValue]); // Dependency to trigger when "installments" changes

  const client_verify = async () => {
    set_installment_amount(watch("installmentDetails")?.[0].amount);
    try {
      const client_id = await axios.post(`${url}/container/payment_container`, {
        down_payment: watch("installmentDetails")?.[0].amount,
      });
      if (client_id.status === 200) {
        console.log(client_id);
        set_client_secret(client_id.data.data);
        toast.success(
          `Container Booking Saved on ${new Date().toLocaleDateString()}`
        );
        router.push("/payment");
      }
    } catch (error) {
      console.log(error);
   
      toast.info(
        ` Client ID : Generated \n ${new Date().toLocaleDateString()}`
      );
    }
  };

  const onsubmit = (data: any) => {
    console.log(data);
    set_payment_loading(true);
    save_form_data(data);
    client_verify();
  };

  return (
    <>
      <div className="max-w-2xl mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Container Booking Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
              {/* Container Type */}
              <div>
                <Label htmlFor="container_type">Container Type</Label>
                <Select
                  onValueChange={(value) => setValue("container_type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Container Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Refrigerated">Refrigerated</SelectItem>
                    <SelectItem value="Dry">Dry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Weight */}
              <div>
                <Label htmlFor="weight">Weight (tons)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="Enter weight"
                  {...register("weight", {
                    required: "Weight is required",
                    min: {
                      value: 0.1,
                      message: "Weight must be at least 0.1 tons",
                    },
                  })}
                />
                {errors.weight && (
                  <p className="text-red-500 text-sm">
                    {errors.weight.message}
                  </p>
                )}
              </div>

              {/* Containers */}
              <div>
                <div className="space-y-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="">Size</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-left">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {watch("containers")?.map((container, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {container.size}
                          </TableCell>
                          <TableCell>{container.quantity}</TableCell>
                          <TableCell>
                            {container.size === "20 feet"
                              ? container.quantity * 1000
                              : container.quantity * 2000}
                            $
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">
                          {" "}
                          {watch("containers")?.reduce(
                            (total, container) =>
                              total +
                              (container.size === "20 feet"
                                ? container.quantity * 1000
                                : container.quantity * 2000),
                            0
                          )}
                          $
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </div>

              {/* Price*/}
              <div>
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  readOnly
                  id="price"
                  type="number"
                  placeholder="Enter weight"
                  {...register("price")}
                />
              </div>

              <div>
                <Label htmlFor="handling_type">Handling Type</Label>
                <Select
                  onValueChange={(value) => setValue("handling_type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Handling Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Employee">
                      Employee (Material Checked)
                    </SelectItem>
                    <SelectItem value="Anonymous">
                      Anonymous (No Guarantee)
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.handling_type && (
                  <p className="text-red-500 text-sm">
                    {errors.handling_type.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="installments">Installments</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("installments", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Installments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full_payment">Full Payment</SelectItem>
                    <SelectItem value="installment">Installments</SelectItem>
                  </SelectContent>
                </Select>
              </div>

          
              {installments == 'installment' && (
                
                 <>
                 
                       <div>
                <Label htmlFor="installments_period">Installments Period</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("installment_period", parseInt(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Installments Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 months</SelectItem>
                    <SelectItem value="6">6 months</SelectItem>
                  </SelectContent>
                </Select>
              </div> 
                 </>
              )}

              <div>
                <div>
                  <div className="space-y-2">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Installement</TableHead>
                          <TableHead>Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {watch("installmentDetails")?.map((e: any) => {
                          return (
                            <>
                              <TableRow key={e.installment_number}>
                                <TableCell className="font-medium">
                                  {e.installment_number}
                                </TableCell>
                                <TableCell>{e.amount}$</TableCell>
                              </TableRow>
                            </>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              {/* Receiver Details */}
              <h3 className="text-lg font-medium">Receiver Details</h3>
              <div>
                <Label htmlFor="receiver_name">Receiver Name</Label>
                <Input
                  id="receiver_name"
                  type="text"
                  placeholder="Receiver's Name"
                  {...register("receiver_details.name", {
                    required: "Receiver name is required",
                  })}
                />
                {errors.receiver_details?.name && (
                  <p className="text-red-500 text-sm">
                    {errors.receiver_details.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="receiver_address">Receiver Address</Label>
                <Input
                  id="receiver_address"
                  type="text"
                  placeholder="Receiver's Address"
                  {...register("receiver_details.address", {
                    required: "Receiver address is required",
                  })}
                />
                {errors.receiver_details?.address && (
                  <p className="text-red-500 text-sm">
                    {errors.receiver_details.address.message}
                  </p>
                )}
              </div>

              <div>
        <Label htmlFor="country_code" className="font-semibold">Country Code: </Label>
        <select
          id="country_code"
          {...register("receiver_details.country_code", {
            required: "Country code is required",
          })}
          className="border p-2 rounded"
        >
          <option value="">Select Country Code</option>
          {codes.map(({ code, callingCode, name }) => (
            <option key={code} value={callingCode}>
              {name} ({callingCode})
            </option>
          ))}
        </select>
        {errors.receiver_details?.country_code && (
          <p className="text-red-500 text-sm">
            {errors.receiver_details.country_code.message}
          </p>
        )}
      </div>

              <div>
                <Label htmlFor="receiver_phone">Receiver Phone</Label>
                <Input
                  id="receiver_phone"
                  type="tel"
                  placeholder="Receiver's Phone"
                  {...register("receiver_details.phone", {
                    required: "Receiver phone is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit phone number",
                    },
                  })}
                />
                {errors.receiver_details?.phone && (
                  <p className="text-red-500 text-sm">
                    {errors.receiver_details.phone.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              {payment_loading ? (
                <Button disabled className="w-full">
                  <Loader2 className="animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Payment Method
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Container_Book;