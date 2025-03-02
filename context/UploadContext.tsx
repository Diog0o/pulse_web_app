import React, { createContext, useContext } from "react";
import api from "@/utils/axiosInstance";

interface UploadContextType {
  uploadImage: (image: { uri: string; type?: string; fileName?: string }) => Promise<string | null>;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const uploadImage = async (image: { uri: string; type?: string; fileName?: string }): Promise<string | null> => {
    const formData = new FormData();
    formData.append("image", {
      uri: image.uri,
      type: image.type || "image/jpeg",
      name: image.fileName || `photo_${Date.now()}.jpg`,
    } as any); // Fix for React Native FormData

    try {
      const response = await api.post("upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Uploaded Image URL:", response.data.imageUrl);
      return response.data.imageUrl;
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    }
  };

  return (
    <UploadContext.Provider value={{ uploadImage }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUpload must be used within an UploadProvider");
  }
  return context;
};
