export interface IProduct {
    _id: string;
    title: string;
    description: string;
    price: number;
    status: 'pending' | 'approved' | 'rejected';
  }