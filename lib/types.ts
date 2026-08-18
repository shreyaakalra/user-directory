export interface UserAddress {
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface UserCompany {
  name: string;
  title: string;
  department: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  age: number;
  address: UserAddress;
  company: UserCompany;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}