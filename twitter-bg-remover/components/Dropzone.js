import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Dropzone({ onDrop }) {
  const handleDrop = useCallback((acceptedFiles) => {
    onDrop(acceptedFiles[0]);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop });

  return (
    <div {...getRootProps()} className="border-2 border-dashed rounded-xl p-10 text-center bg-white bg-opacity-70 cursor-pointer">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Dosyanı bırak...</p>
      ) : (
        <p>Bir Twitter fotoğrafını buraya sürükleyip bırak ya da tıkla</p>
      )}
    </div>
  );
}
