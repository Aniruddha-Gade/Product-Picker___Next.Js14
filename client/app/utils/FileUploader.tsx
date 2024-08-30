'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import type { FileWithPath } from '@uploadthing/react'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { FormikHelpers } from 'formik';

import { Button } from '../components/ui/button'
import { convertFileToUrl } from '../../lib/convertFileToUrl'

type FileUploaderProps = {
    setFieldValue: FormikHelpers<any>['setFieldValue'];
    imageUrl: string
    setFiles: Dispatch<SetStateAction<File[]>>
}



export function FileUploader({ imageUrl, setFiles, setFieldValue }: FileUploaderProps) {
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFiles(acceptedFiles);
        const imageUrl = convertFileToUrl(acceptedFiles[0]);
        setFieldValue('images', imageUrl);  // Directly setting the value in Formik
    }, [setFiles, setFieldValue]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
    });

    console.log("imageUrl = ", imageUrl);

    return (
        <div
            {...getRootProps()}
            className="flex-center bg-green-200 dark:bg-green-950 flex w-full md:w-[50%] h-72 cursor-pointer flex-col overflow-hidden rounded-xl">
            <input {...getInputProps()} name="images" className="cursor-pointer" />

            {imageUrl ? (
                <div className="flex h-full w-full flex-1 justify-center ">
                    <Image
                        src={imageUrl}
                        alt="image"
                        width={250}
                        height={250}
                        className="w-full object-cover object-center"
                    />
                </div>
            ) : (
                <div className="flex-center flex-col py-5 text-grey-500">
                    <Image src="/assets/images/upload.gif" width={95} height={95} alt="file upload" />
                    <h3 className="mb-2 mt-2">Drag photo here</h3>
                    <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
                    <Button type="button" className="rounded-full">
                        Select from computer
                    </Button>
                </div>
            )}
        </div>
    );
}
