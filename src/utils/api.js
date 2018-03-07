const API_PATH = 'http://localhost:8080/';

export const get = async path => {
  try {
    let result = await fetch(API_PATH.concat(path));
    return result.json();
  } catch (err) {
    console.log(err);
  }
};

export const post = async (path, payload) => {
  try {
    let result = await fetch(API_PATH.concat(path), {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return result.json();
  } catch (err) {
    console.log(err);
  }
};
