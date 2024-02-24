export const uploadImage = (target, cb) => {
  const imageAsBase64 = target.files[0];

  const reader = new FileReader();
  reader.onloadend = () => {
    cb(reader.result);
  };
  if (imageAsBase64) reader.readAsDataURL(imageAsBase64);
  else cb(null);
};
