/* eslint-disable @typescript-eslint/no-unused-vars */
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

export default function CreateService() {
  const [file, setFile] = useState<any>(null);
  const [imageUploadProgress, setImageFileUploadProgress] = useState<any>(null);
  const [imageUploadError, setImageUploadError] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [publishError, setPublishError] = useState<any>(null);
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Hãy chọn ít nhất một ảnh");
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
          console.log(error);
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
      const res = await fetch("/v1/news", {
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
      navigate(`/dashboard?tab=news`, { replace: true });
    } catch (error: any) {
      setPublishError(error.message);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  const handleContentChange = (value: string) => {
    const cleanedContent = value.trim().replace(/^<p>(.*?)<\/p>$/s, "$1");
    setFormData((prevData: any) => ({
      ...prevData,
      content: cleanedContent,
    }));
  };

  return (
    <div
      className='p-3 max-w-3xl mx-auto min-h-screen'
      style={{ paddingTop: "60px" }} // Khoảng cách để tránh bị header che khuất
    >
      <h1 className='text-center text-3xl my-7 font-semibold'>Tạo tin tức</h1>
      <form
        className='flex flex-col gap-4'
        style={{ minHeight: "calc(100vh - 120px)" }} // Giảm chiều cao của phần header và tạo đủ không gian cho form
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Nhập tiêu đề'
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value='uncategorized'>Loại dịch vụ</option>
            <option value='Hiệu chuẩn, kiểm định'>Hiệu chuẩn, kiểm định</option>
            <option value='Hiệu chuẩn tận nơi'>Hiệu chuẩn tận nơi</option>
            <option value='Đào tạo và huấn luyện'>Đào tạo và huấn luyện</option>
            <option value='Bảo trì-sửa chữa'>Bảo trì-sửa chữa</option>
          </Select>
        </div>

        {/* Upload image section */}
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
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
          placeholder='Nhập nội dung...'
          className='h-72 mb-12'
          onChange={handleContentChange}
        />

        {/* Publish button */}
        <Button
          type='submit'
          className='bg-gradient-to-r from-blue-500 to-green-500 text-white p-2 rounded mt-5'
        >
          Tạo mới
        </Button>

        {/* Cancel button */}
        <Button
          type='button'
          className='bg-gray-500 text-white p-2 rounded mt-2'
          onClick={handleCancel}
        >
          Hủy bỏ
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
