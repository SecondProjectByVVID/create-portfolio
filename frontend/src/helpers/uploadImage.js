export const uploadImage = (target, cb) => {
  const imageAsBase64 = target.files[0];
  // console.log(URL.createObjectURL(imageAsBase64));
  const reader = new FileReader();
  reader.onloadend = () => {
    cb(reader.result);
  };
  if (imageAsBase64) reader.readAsDataURL(imageAsBase64);
  else cb(null);
};
