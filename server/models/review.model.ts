import { Schema, model, models } from 'mongoose';
import { IProduct } from './product.model';


interface IReview {
    productId: Schema.Types.ObjectId;
    updatedFields?: Partial<IProduct>;
    status: 'pending' | 'approved' | 'rejected';
    submittedBy: Schema.Types.ObjectId;
    reviewedBy?: Schema.Types.ObjectId;   // mark as optional, initially the review is not reviewed
}


const reviewSchema = new Schema<IReview>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    updatedFields: {
        type: Schema.Types.Mixed,
        required: false
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    submittedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timeStamps:true});


const ReviewModel = models.Review || model<IReview>('Review', reviewSchema);
export default ReviewModel;
