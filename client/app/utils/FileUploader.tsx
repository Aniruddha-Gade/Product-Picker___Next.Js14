'use client'

// import { useCallback, Dispatch, SetStateAction } from 'react'
// import Image from 'next/image'
// import type { FileWithPath } from '@uploadthing/react'
// import { useDropzone } from '@uploadthing/react/hooks'
// import { generateClientDropzoneAccept } from 'uploadthing/client'
// import { FormikHelpers } from 'formik';

// import { Button } from '../components/ui/button'
// import { convertFileToUrl } from '../../lib/convertFileToUrl'





// export function FileUploader({ imageUrl, setFiles, setFieldValue }: FileUploaderProps) {
//     const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
//         setFiles(acceptedFiles[0]);
//         const imageUrl = convertFileToUrl(acceptedFiles[0]);
//         setFieldValue('image', imageUrl);  // Directly setting the value in Formik
//     }, [setFiles, setFieldValue]);

//     const { getRootProps, getInputProps } = useDropzone({
//         onDrop,
//         accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
//     });



//     return (
//         <div
//             {...getRootProps()}
//             className="flex-center bg-green-200 dark:bg-green-950 flex w-full md:w-[50%] h-72 cursor-pointer flex-col overflow-hidden rounded-xl">
//             <input {...getInputProps()} name="images" className="cursor-pointer" />

//             {imageUrl ? (
//                 <div className="flex h-full w-full flex-1 justify-center ">
//                     <Image
//                         src={imageUrl}
//                         alt="image"
//                         width={250}
//                         height={250}
//                         className="w-full object-cover object-center"
//                     />
//                 </div>
//             ) : (
//                 <div className="flex-center flex-col py-5 text-grey-500">
//                     <Image src="/assets/images/upload.gif" width={95} height={95} alt="file upload" />
//                     <h3 className="mb-2 mt-2">Drag photo here</h3>
//                     <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
//                     <Button type="button" className="rounded-full">
//                         Select from computer
//                     </Button>
//                 </div>
//             )}
//         </div>
//     );
// }



import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"



type FileUploaderProps = {
    setFieldValue: FormikHelpers<any>['setFieldValue'];
    imageUrl: string
    setFiles: Dispatch<SetStateAction<File[]>>
}

export default function FileUploader({ imageUrl, setFiles, setFieldValue }: FileUploaderProps) {

    const [selectedFile, setSelectedFile] = useState(null)
    const [previewSource, setPreviewSource] = useState("")
    const inputRef = useRef(null)

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (file) {
            previewFile(file)
            setSelectedFile(file)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "image/*": [".jpeg", ".jpg", ".png"] },
        onDrop,
    })

    const previewFile = (file) => {
        // console.log(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    useEffect(() => {
        setFieldValue("image", { required: true })
    }, [setFieldValue])


    useEffect(() => {
        setFieldValue("image", selectedFile)
    }, [selectedFile, setFieldValue])

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="image">
                Product Image
            </label>

            <div
                className={`${isDragActive ? "bg-richblack-600" : "bg-richblack-700"}
         flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
            >
                {previewSource ? (
                    <div className="flex w-full flex-col p-6">

                        <img
                            src={previewSource}
                            alt="Preview"
                            className="h-full w-full rounded-md object-cover"
                        />

                        {/* <button
                type="button"
                onClick={() => {
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button> */}

                    </div>
                )

                    :

                    <div
                        className="flex w-full flex-col items-center p-6"
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} ref={inputRef} />
                        <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">

                        </div>
                        <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                            Drag and drop an image or click to{" "}
                            <span className="font-semibold text-yellow-50">Browse</span> a
                            file
                        </p>
                        <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
                            <li>Aspect ratio 16:9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>
                    </div>
                }
            </div>

            {/* {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )} */}
        </div>
    )
}