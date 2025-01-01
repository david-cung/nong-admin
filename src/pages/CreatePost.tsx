/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [file, setFile] = useState<any>(null);
  const [imageUploadProgress, setImageFileUploadProgress] = useState<any>(null);
  const [imageUploadError, setImageUploadError] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [publishError, setPublishError] = useState<any>(null);
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageFileUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageFileUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: url });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageFileUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/v1/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError("Failed to publish post");
        return;
      }
      console.log(data);
      setPublishError(null);
      navigate(`/posts/${data.data}`, { replace: true });
    } catch (error: any) {
      setPublishError(error.message);
    }
  };

  return (
    <div
      className='p-3 max-w-3xl mx-auto min-h-screen'
      style={{ paddingTop: "60px" }} // Khoảng cách để tránh bị header che khuất
    >
      <h1 className='text-center text-3xl my-7 font-semibold'>Create Post</h1>
      <form
        className='flex flex-col gap-4'
        style={{ minHeight: "calc(100vh - 120px)" }} // Giảm chiều cao của phần header và tạo đủ không gian cho form
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        {/* Upload image section */}
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) =>
              setFile(e.target?.files?.length ? e.target?.files[0] : null)
            }
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>

        {/* Show image upload error */}
        {imageUploadError && (
          <Alert className='mt-5' color='failure'>
            {imageUploadError}
          </Alert>
        )}

        {/* Show uploaded image */}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}

        {/* Content editor */}
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />

        {/* Publish button */}
        <Button
          type='submit'
          className='bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded mt-5'
        >
          Publish
        </Button>

        {/* Show publish error */}
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
