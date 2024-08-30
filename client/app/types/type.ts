export interface IProduct {
    _id: string;
    title: string;
    description: string;
    price: number;
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

interface IReviewedBy {
    _id: string;
    name: string;
    email: string;
}

export interface IRequest {
    _id: string;
    productId: IProduct;
    updatedFields: IUpdatedFields;
    status: string;
    submittedBy: ISubmittedBy;
    reviewedBy: IReviewedBy;
    __v: number;
}

