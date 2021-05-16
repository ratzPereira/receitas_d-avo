import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 5000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : await fetch(url);

    const res = await Promise.race([timeout(TIMEOUT_SEC), fetchPro]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (e) {
    throw e;
  }
};

// export const sendJson = async (url, uploadData) => {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });
//
//     const res = await Promise.race([timeout(TIMEOUT_SEC), fetchPro]);
//     const data = await res.json();
//
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//
//     return data;
//   } catch (e) {
//     throw e;
//   }
// };
//
// export const getJson = async url => {
//   try {
//     const res = await Promise.race([timeout(TIMEOUT_SEC), fetch(url)]);
//     const data = await res.json();
//
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//
//     return data;
//   } catch (e) {
//     throw e;
//   }
// };
