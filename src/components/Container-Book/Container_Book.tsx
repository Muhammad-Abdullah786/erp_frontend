"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { url } from "@/apiURL";
import useStore from "@/store/Zustand_Store";

type FormValues = {
  container_type: string;
  weight: number;
  containers: { size: string; quantity: number }[];
  price: number;
  handling_type: string;
  installments: string;
  installment_period: number;
  installmentDetails: {
    installment_number: number;
    amount: number;
    status: string;
  }[];
  sender_details: {
    name: string;
    email: string;
    phone: string;
  };
  receiver_details: {
    name: string;
    address: string;
    country_code: string;
    phone: string;
  };
};
const Container_Book = () => {
  const [step, setStep] = useState(1); // Track the step

  const set_client_secret = useStore((state) => state.set_client_secret);

  const save_form_data = useStore((state) => state.save_form_data);
  const set_payment_loading = useStore((state) => state.set_payment_loading);
  const payment_loading = useStore((state) => state.payment_loading);
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

  const weight = watch("weight");
  const price = watch("price");
  const installments = watch("installments");
  const installment_period = watch("installment_period");

  useEffect(() => {
    if (weight) {
      const containerDetails: { size: string; quantity: number }[] = [];
      let remainingWeight = weight;
      let totalPrice = 0;

      const price20 = 1000;
      const price40 = 2000;

      if (remainingWeight >= 4) {
        const quantity40 = Math.floor(remainingWeight / 4);
        containerDetails.push({ size: "40 feet", quantity: quantity40 });
        totalPrice += quantity40 * price40;
        remainingWeight -= quantity40 * 4;
      }

      if (remainingWeight > 0) {
        const quantity20 = Math.ceil(remainingWeight / 2);
        containerDetails.push({ size: "20 feet", quantity: quantity20 });
        totalPrice += quantity20 * price20;
        remainingWeight -= quantity20 * 2;
      }

      const installmentDetails: {
        installment_number: number;
        amount: number;
        status: string;
      }[] = [];
      for (let i = 1; i <= installment_period; i++) {
        installmentDetails.push({
          installment_number: i,
          amount: parseFloat((totalPrice / installment_period).toFixed(2)),
          status: i === 1 ? "paid" : "pending",
        });
      }

      setValue("installmentDetails", installmentDetails);
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
      setValue("installment_period", 1);
    }
  }, [installments, setValue]);

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

  const onsubmit = async (data: any) => {
    set_payment_loading(true);
    save_form_data(data);
    client_verify();

    console.log(data);

    try {
      // Send the request directly to book the container without authentication
      const response = await axios.post(
        `${url}/container/booked_container`,
        data ,
        {
          headers: {
            token: localStorage.getItem("accessToken"),
          },
        }
      );
      if (response.status === 200) {
        toast.success("Container Booking Successfully Saved")
        router.push("/payment"); 
      }
    } catch (error) {
      toast.error("Failed to book container");
      console.error(error);
    } finally {
      set_payment_loading(false);
    }
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Container Booking Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onsubmit)}>
            {/* Step 1: Container Information */}
            {step === 1 && (
              <div>
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

                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              </div>
            )}

            {/* Step 2: Sender Information */}
            {step === 2 && (
              <div>
                <div>
                  <Label htmlFor="sender_details.name">Sender Name</Label>
                  <Input
                    id="sender_details.name"
                    placeholder="Sender's Name"
                    {...register("sender_details.name", {
                      required: "Sender's name is required",
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="sender_details.email">Sender Email</Label>
                  <Input
                    id="sender_details.email"
                    placeholder="Sender's Email"
                    type="email"
                    {...register("sender_details.email", {
                      required: "Sender's email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor="sender_details.phone">Sender Phone</Label>
                  <Input
                    id="sender_details.phone"
                    placeholder="Sender's Phone"
                    type="tel"
                    {...register("sender_details.phone", {
                      required: "Sender's phone is required",
                    })}
                  />
                </div>

                <Button type="button" onClick={handlePrev}>
                  Previous
                </Button>
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              </div>
            )}

            {/* Step 3: Receiver Information */}
            {step === 3 && (
              <div>
                <div>
                  <Label>Receiver Details</Label>
                  <Input
                    placeholder="Name"
                    {...register("receiver_details.name", {
                      required: "Receiver's name is required",
                    })}
                  />
                  <Input
                    placeholder="Address"
                    {...register("receiver_details.address", {
                      required: "Receiver's address is required",
                    })}
                  />
                  <Select
                    value={watch("receiver_details.country_code")}
                    onValueChange={(code) =>
                      setValue("receiver_details.country_code", code)
                    }
                  ></Select>
                  <Input
                    placeholder="Phone Number"
                    {...register("receiver_details.phone", {
                      required: "Phone number is required",
                    })}
                  />
                </div>

                <Button type="button" onClick={handlePrev}>
                  Previous
                </Button>
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              </div>
            )}

            {/* Step 4: Payment and Installment */}
            {step === 4 && (
              <div>
                <div>
                  <Label htmlFor="installments">Installments</Label>
                  <Select
                    onValueChange={(value) => setValue("installments", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Installment Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full_payment">Full Payment</SelectItem>
                      <SelectItem value="installments">Installments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  {installments === "installments" && (
                    <>
                      <Label htmlFor="installment_period">
                        Installment Period (months)
                      </Label>
                      <Input
                        type="number"
                        placeholder="Enter number of months"
                        {...register("installment_period", {
                          required: "Installment period is required",
                          min: 1,
                        })}
                      />
                    </>
                  )}
                </div>

                <Button type="button" onClick={handlePrev}>
                  Previous
                </Button>
                <Button type="submit" disabled={payment_loading}>
                  {payment_loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Container_Book;
