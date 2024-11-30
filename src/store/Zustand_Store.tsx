
import {create} from 'zustand';
import axios from 'axios';
import { url } from '@/apiURL';

const useStore = create<any>((set : any , get: any) => ({
  payment_loading : false,
  client_secret : "", // initial state
  form_data :  null ,
  installment_amount : null,
  set_payment_loading : (loading : any) => set(() => ({ payment_loading : loading })),  // Loading state for payment process
  set_client_secret : (client_id : any) => set(() => ({ client_secret : client_id })),
  set_installment_amount : (amount : any) => set(() => ({installment_amount : amount})), 
  save_form_data : (data : any) => set(() => ({form_data : data})),
  post_container_booking : async() => {
   try {
        const form_data = get().form_data;
        console.log(form_data);
      const post_data = await axios.post(`${url}/container/booked_container` , form_data );
      if(post_data.status === 200) {
        console.log(post_data);
      }
   } catch (error) {
      console.log(error);
   }
  }
}));

export default useStore;
