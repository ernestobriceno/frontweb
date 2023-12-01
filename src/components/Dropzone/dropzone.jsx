import Cookies from 'js-cookie';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [base64String, setBase64String] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;

        setFile(selectedFile);
        setBase64String(base64);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, []);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [loading, setLoading] = useState(false);
  const token = Cookies.get('token');
  
  const onUploadFile = async (event) => {
    event.preventDefault()

    try {
      const resp = await fetch('https://apiweb-production.up.railway.app/upload_file', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: file?.name,
          data: base64String,
        })
      });

      const data = await resp.json();

      if (data?.error) {
        toast.error(data?.error)
      } else {
        toast.success(data?.message)
        setFile(null);
        setBase64String('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    loading
      ? <p>...Loading</p>
      :
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl mb-6">Document Upload Page</h1>
        <div
          {...getRootProps()}
          className={`p-10 border-2 border-dashed ${isDragActive ? 'bg-gray-200' : 'bg-gray-100'
            } text-center cursor-pointer rounded-lg mb-6`}
        >
          <input {...getInputProps()} />
          <p>{file ? file?.name : 'Drag and drop your documents here, or click to select files'}</p>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onUploadFile}
        >
          Save
        </button>
      </div>
  );
};

export default UploadPage;
