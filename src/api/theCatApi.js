const API_ENDPOINT = 'https://api.thecatapi.com/v1';

const request = async url => {
  try {
    const response = await fetch(url);
    if(response.ok) {
      const data = await response.json;
      return data;
    } else {
      const errorData = await response.json;
      return errorData;
    }
  } catch(err) {
    throw {
      message: e.message,
      status: e.status
    }
  }
}

const api = {
  fetchCats: async keyword => {
    console.log('fetchCats keyword', keyword);
    // keyword로 breed를 찾고 각 breed로 id를 찾는다.
    try {
      let breeds;
      await fetch(`${API_ENDPOINT}/breeds/search?q=${keyword}`)
        .then(response => {
          return response.json();
        })
        .then(json => {
          breeds = json;
        })

      // const breeds = await request(`${API_ENDPOINT}/breeds/search?q=${keyword}`);
      const requests = breeds.map(async breed => {
        return await fetch(`${API_ENDPOINT}/images/search?limit=20&breed_ids=${breed.id}`)
          .then(res => res.json());
        // return await request(`${API_ENDPOINT}/images/search?limit=20&breeds_ids=${breed.id}`);
      });

      const response = await Promise.all(requests);
      const result = Array.prototype.concat.apply([], response);

      console.log('fetchCats breeds', breeds);
      console.log('fetchCats result', result);

      return {
        isError: false,
        data: result
      };
    } catch(err) {
      return {
        isError: true,
        data: err
      };
    }
  },

  fetchRandomCats: async () => {
    /* 랜덤으로 20개의 고양이 사진 리턴 */
    try {
      const result = await fetch(`${API_ENDPOINT}/images/search?limit=20`)
        .then(res => res.json());
      // const result = await request(`${API_ENDPOINT}/images/search?limit=20`);

      console.log('fetchRandomCats result', result);

      return {
        isError: false,
        data: result
      };
    } catch(err) {
      return {
        isError: true,
        data: err
      };
    }
  }
};

export { api };