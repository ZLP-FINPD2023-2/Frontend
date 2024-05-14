import ky from 'ky';

// export const API_URL: string = process.env.NEXT_PUBLIC_SERVER || "";
export const API_URL: string = "https://zlp-lfp.ru/api/v1";

const kyInstance = ky.create({
  prefixUrl: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  hooks: {
    beforeRequest: [
      async (request, options) => {
        const token = localStorage.getItem('token');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});

export default kyInstance;
