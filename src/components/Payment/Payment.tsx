"use client";
import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useStore from "@/store/Zustand_Store";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Payment = () => {
  const [payment_success_loading, set_payment_success_loading] =
    useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const client_secret = useStore((state) => state.client_secret); 
  const post_container_booking = useStore(
    (state) => state.post_container_booking
  ); 
  const set_payment_loading = useStore((state) => state.set_payment_loading); 
  const set_client_secret = useStore((state) => state.set_client_secret);
  const installment_amount = useStore((state) => state.installment_amount);
  const set_installment_amount = useStore(
    (state) => state.set_installment_amount
  );
  const client_container_installment_id = useStore((state) => state.client_container_installment_id);
  const client_container_id = useStore((state) => state.client_container_id); 
  const update_installment_payment = useStore((state) => state.update_installment_payment);
  const set_client_container_installment_id = useStore((state) => state.set_client_container_installment_id);
  const set_client_container_id = useStore((state) => state.set_client_container_id);


  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    set_payment_success_loading(true);
    e.preventDefault();
    if (!stripe || !elements || !client_secret) {
      console.error(
        "Stripe or Elements not loaded, or client_secret is missing"
      );
      toast.error(
        `Payment Failed! Please try Again  ${new Date().toLocaleDateString()} \n Maybe Stripe or Elements not loaded, or client_secret is missing.`
      );
      set_payment_success_loading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("Card element is not loaded.");
      toast.error(
        `Payment Failed! Please try Again  ${new Date().toLocaleDateString()} \n Maybe Card element is not loaded.`
      );
      set_payment_success_loading(false);
      return;
    }

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      client_secret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      toast.error(
        `Payment Failed! Please try Again  ${new Date().toLocaleDateString()} \n ${
          error.message || "Something went wrong with the payment."
        }`
      );
      set_payment_success_loading(false);
      set_payment_loading(false);
    } else if (paymentIntent) {
       
       if(client_container_installment_id && client_container_id && installment_amount ){
           await update_installment_payment();  
           set_client_secret("");
           set_client_container_installment_id(null);
           set_client_container_id(null);
           set_installment_amount(null);
           toast.success(
            `Installment is Paid in  ${new Date().toLocaleDateString()}`
          );
           return;
       }else{
        await post_container_booking();

        toast.success(
          `Payment Successful & Your Container Booked on ${new Date().toLocaleDateString()}`
        );
        set_client_secret("");
        set_payment_success_loading(false);
        set_payment_loading(false);
        set_installment_amount(null);
        router.push("/login");
       }
   
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-6 max-w-lg w-full shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Enter Card Details
        </h2>
        <p className="text-sm text-gray-500 my-4 text-center">
          "Thank you for choosing our services! To complete your transaction,
          please proceed to pay the amount of{" "}
          <span className="font-semibold text-black">
            {" "}
            ${installment_amount}
          </span>
          . Click the button below to make your payment securely and
          hassle-free. We appreciate your trust and look forward to serving you!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <Label htmlFor="card-element">Credit or Debit Card</Label>
            <CardElement
              id="card-element"
              className="mt-2 p-3 border rounded-md shadow-sm"
            />
          </div>

          {payment_success_loading ? (
            <Button disabled className="w-full py-3 mt-6">
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full py-3 mt-6">
              Pay Now
            </Button>
          )}
        </form>
      </Card>
    </div>
  );
};

export default Payment;
