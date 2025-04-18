export interface ProfileType {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    newPassword: string;
    confirmPassword: string;
  }
  
  export interface OrderType {
    id: string;
    date: string;
    total: number;
    status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: number;
  }
  
  export interface AddressType {
    id: number;
    type: string;
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    isDefault: boolean;
  }
  