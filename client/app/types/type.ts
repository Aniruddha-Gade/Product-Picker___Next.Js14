export interface IProduct {
    _id: string;
    title: string;
    description: string;
    price: number;
    status: 'pending' | 'approved' | 'rejected';
}




export interface IProduct1 {
    _id: string;
    title: string;
    status: 'pending' | 'approved' | 'rejected';
}

interface IUpdatedFields {
    title?: string;
    description?: string;
    price?: number;
}

interface ISubmittedBy {
    _id: string;
    name: string;
    email: string;
}

export interface IRequest {
    _id: string;
    productId: IProduct1;
    updatedFields: IUpdatedFields;
    status: string;
    submittedBy: ISubmittedBy;
    __v: number;
}

