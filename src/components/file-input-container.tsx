/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export interface FileInputContainerProps {
  onFileUpload: (file: File) => Promise<void>;
  progress?: number;
}

/**
 * Shows a button to select a file for upload.
 * Also support drag&dropping the file.
 *
 * Using Tailwind for all styling.
 */
export const FileInputContainer: React.FC<FileInputContainerProps> = ({
  onFileUpload,
  progress,
}) => {
  const [isUploading, setUploading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles[0]) {
      return;
    }

    setUploading(true);
    console.log(acceptedFiles[0]);
    try {
      await onFileUpload(acceptedFiles[0]);
    } catch (e) {
      setError(e?.toString() || "Error uploading file");
    }
    setUploading(false);
  }, []);

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      onDrop,
      accept: { "image/*": [] },
      multiple: false,
      maxSize: 2 * 1024 * 1024,
      maxFiles: 1,
      disabled: isUploading,
    } as any);

  const handleFileUpload = async () => {};

  return (
    <div
      {...getRootProps({
        className: "w-full flex-1 flex flex-col items-center justify-center",
      })}
    >
      <input disabled={isUploading} {...(getInputProps() as any)} />

      {isUploading ? (
        <p className="text-gray-500">
          Uploading {acceptedFiles[0].name}
          {progress !== undefined && ` (${progress.toFixed(0)}%)`}
          ...
        </p>
      ) : (
        <button className="text-gray-300">
          Drag 'n' drop some files here, or click to select files to upload.
        </button>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {fileRejections && (
        <ul className="text-red-500">
          {fileRejections.map((fileRejection) => (
            <li key={fileRejection.file.name}>
              {fileRejection.file.name} - {fileRejection.errors[0].message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
