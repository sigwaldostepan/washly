import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (image: File) => {
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<{ url: string; id: string }>((resolve, reject) =>
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: 'auto',
          folder: '/washly/payment-proof',
          transformation: {
            width: 800,
            crop: 'limit',
          },
        },
        (err, res) => {
          if (err) {
            console.log(err);
            reject(new Error('Gagal mengupload gambar'));
          }

          resolve({
            url: res?.secure_url ?? '',
            id: res?.public_id ?? '',
          });
        },
      )
      .end(buffer),
  );

  return result;
};
