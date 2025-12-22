import uploadHandler from "./uploadHandler";

export const getImagePreviewLink = async (fileInputRef?: React.RefObject<HTMLInputElement | null>) => {
  const file = fileInputRef?.current?.files?.[0];
  if (!file) return undefined;
  return uploadHandler(file);
};
