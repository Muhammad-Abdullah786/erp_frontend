import {create} from 'zustand';
import axios from 'axios';
import { url } from '@/apiURL';

const useStore = create<any>((set : any , get: any) => ({
  payment_loading : false,
  client_secret : "", // initial state
  form_data :  null ,
  installment_amount : null,
  client_container_installment_id : "",
  client_container_id : "",
  tracking_id : "",
  set_tracking_id : (trace_id : any) => set(() => ({tracking_id : trace_id})),
  set_payment_loading : (loading : any) => set(() => ({ payment_loading : loading })),  // Loading state for payment process
  set_client_secret : (client_id : any) => set(() => ({ client_secret : client_id })),
  set_installment_amount : (amount : any) => set(() => ({installment_amount : amount})), 
  save_form_data : (data : any) => set(() => ({form_data : data})),
  set_client_container_installment_id : (id : any) => set(() => ({ client_container_installment_id : id})),
  set_client_container_id  : (id : any) => set(() => ({ client_container_id : id})),
  post_container_booking : async() => {
   try {
        const form_data = get().form_data;
        console.log(form_data);
      const post_data = await axios.post(`${url}/container/booked_container` , form_data , {
        headers : {
          token : localStorage.getItem('token')
        }
      });
      if(post_data.status === 200) {
        console.log(post_data);
      }
   } catch (error) {
      console.log(error);
   }
  },
  update_installment_payment : async() => {
    const { client_container_installment_id, installment_amount , client_container_id } = get();
    try {
      const response = await axios.post("http://localhost:3000/v1/container/update_client_container_installment", {
        containerId : client_container_id,
        installmentId : client_container_installment_id,
        amount : installment_amount,
      });
      console.log(response);
      return response.data;
    } catch (error) {
       console.log(error);
    }
  }
}));

export default useStore;