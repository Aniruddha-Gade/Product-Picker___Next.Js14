'use client';

import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateProductMutation,  } from '../redux/features/product/productApi';
import { toast } from 'sonner';
import { styles } from '../styles/style';
import AsteriskSymbol from './AsteriskSymbol';

// type
export interface IProduct  {
    _id: string;
    title: string;
    price: number;
    description: string;
}

type productFormProps = {
    type: 'Create' | 'Update',
    product?: IProduct,
    productId?: string
}

const schema = Yup.object().shape({
    title: Yup.string().required("Please enter the title of the product"),
    description: Yup.string().required("Please enter the description of the product"),
    price: Yup.number().required("Please enter the price of the product"),
});

const ProductForm = ({ type, product, productId }: productFormProps) => {
    const [createProduct, { data: createData, isSuccess: isCreateSuccess, error: createError, isLoading: isCreateLoading }] = useCreateProductMutation();

    const formik = useFormik({
        initialValues: {
            title: product?.title || "",
            description: product?.description || "",
            price: product?.price || 0,
        },
        validationSchema: schema,
        onSubmit: async ({ title, description, price }) => {
            if (type === 'Create') {
                await createProduct({ title, description, price });
            } 
        }
    });
    const { errors, touched, values, handleChange, handleSubmit, handleBlur } = formik

    useEffect(() => {
        if (isCreateSuccess) {
            toast.success("Product created successfully");
            formik.resetForm();
        }
        if (createError) {
            const errorData = createError as any;
            toast.error(errorData?.data?.message || "Error creating product");
        }
    }, [isCreateSuccess, createError]);

   

    return (
        <div className='flex-center p-4 rounded-md'>
            <form onSubmit={handleSubmit} className='w-[60%] bg-white/10 p-5 rounded-2xl'>
                <div className="mb-4">
                    <label  className={`${styles.label}`} htmlFor="title">
                        Title <AsteriskSymbol />
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Enter Title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        className={`border rounded w-full focus:outline-none py-2 px-3 ${
                            touched.title && errors.title ? 'border-red-500' : 'border-black'
                          } ${styles.input}`}
                       />
                    {
                    errors.title && touched.title &&
                    <span className='text-red-500 pt-2 block'>{errors.title}</span>
                }

                </div>

                <div className="mb-4">
                    <label  className={`${styles.label}`} htmlFor="description">
                        Description <AsteriskSymbol />
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter Description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        className={`h-[90px] border rounded w-full focus:outline-none py-2 px-3 ${
                            touched.description && errors.description ? 'border-red-500' : 'border-black'
                          } ${styles.input}`}
                    />
                    {
                    errors.description && touched.description &&
                    <span className='text-red-500 pt-2 block'>{errors.description}</span>
                }
                </div>

                <div className="mb-4">
                    <label  className={`${styles.label}`} htmlFor="price">
                        Price <AsteriskSymbol />
                    </label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="Enter Price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                        className={`border rounded w-full focus:outline-none py-2 px-3 ${
                            touched.price && errors.price ? 'border-red-500' : 'border-black'
                          } ${styles.input}`}
                    />
                    {
                    errors.price && touched.price &&
                    <span className='text-red-500 pt-2 block'>{errors.price}</span>
                }
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={isCreateLoading }
                    >
                        {type === 'Create' ? 'Create Product' : 'Update Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;
