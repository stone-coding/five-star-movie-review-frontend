import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNotification } from "../../hooks";
import { uploadMovie, uploadTrailer } from "../../api/movie";
import MovieForm from "./MovieForm";
import ModalContainer from "../modals/ModalContainer";

export default function MovieUpload({ visible, onClose }) {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setvideoUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { updateNotification } = useNotification();
  const [videoInfo, setvideoInfo] = useState({});
  const [busy, setBusy] = useState(false);

  const resetState = () => {
    setVideoSelected(false)
    setvideoUploaded(false)
    setUploadProgress(0)
    setvideoInfo({})
  }

  const handleTypeError = (error) => {
    updateNotification("error", error);
  };

  const handleUploadTrailer = async (data) => {
    const { error, url, public_id } = await uploadTrailer(
      data,
      setUploadProgress
    );
    if (error) return updateNotification("error", error);
    setvideoUploaded(true);
    setvideoInfo({ url, public_id });
  };

  //   console.log(videoInfo);

  const handleChange = (file) => {
    const formData = new FormData();
    formData.append("video", file);

    setVideoSelected(true);
    handleUploadTrailer(formData);
  };

  const getUploadProgressValue = () => {
    // video still uploading on the backend, not reach cloudinary
    if (!videoUploaded && uploadProgress >= 100) {
      return "Processing";
    }
    return `Upload progress ${uploadProgress}%`;
  };

  // here data is movieInfo
  const handleSubmit = async (data) => {
    if (!videoInfo.url || !videoInfo.public_id)
      return updateNotification("error", "Trailer is missing!");

    setBusy(true);
    data.append("trailer", JSON.stringify(videoInfo));
    const { error, movie } = await uploadMovie(data);
    setBusy(false);
    if (error) return updateNotification("error", error);

    updateNotification("success", "Movie uploads successfully!");
    resetState()
    onClose();
  };

  return (
    <ModalContainer visible={visible}>
      <div className="mb-5">
        <UploadProgress
          visible={!videoUploaded && videoSelected}
          message={getUploadProgressValue()}
          width={uploadProgress}
        />
      </div>
      {!videoSelected ? (
        <TrailerSelector
          visible={!videoSelected}
          onTypeError={handleTypeError}
          handleChange={handleChange}
        ></TrailerSelector>
      ) : (
        <MovieForm
          btnTitle="Upload"
          busy={busy}
          onSubmit={!busy ? handleSubmit : null}
        />
      )}
    </ModalContainer>
  );
}

const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
  if (!visible) return null;

  return (
    <div className="h-full flex items-center justify-center">
      <FileUploader
        handleChange={handleChange}
        onTypeError={onTypeError}
        types={["mp4", "avi"]}
      >
        <label
          className="w-48 h-48 border border-dashed dark:border-dark-subtle border-light-subtle 
            rounded-full flex flex-col items-center justify-center  text-secondary dark:text-dark-subtle cursor-pointer"
        >
          <AiOutlineCloudUpload size={80} />
          <p>Drop your file here!</p>
        </label>
      </FileUploader>
    </div>
  );
};

const UploadProgress = ({ width, message, visible }) => {
  if (!visible) return null;
  return (
    <div className="dark:bg-secondary bg-white drop-shadow-lg rounded p-3">
      <div className="relative h-3 dark:bg-dark-subtle bg-light-subtle overflow-hidden">
        <div
          style={{ width: width + "%" }}
          className="h-full absolute dark:bg-white left-0 bg-secondary"
        ></div>
      </div>
      <p className="font-semibold dark:text-dark-subtle text-light-subtle animate-pulse mt-1">
        {message}
      </p>
    </div>
  );
};
