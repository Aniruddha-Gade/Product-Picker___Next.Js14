import { Schema, model, models } from 'mongoose';

export interface IProduct {
    title: string;
    description: string;
    images: string[];
    price: number;
    status: 'pending' | 'approved' | 'rejected';
    createdBy: Schema.Types.ObjectId;
}


const productSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'  // New products start as 'pending'
    }

});



const ProductModel = models.Product || model<IProduct>('Product', productSchema);
export default ProductModel;
