import axios from "axios";

const getLastLookup = () => JSON.parse(sessionStorage.getItem('last_lookup'));

const lookupRequesterIp = () => {
  const lastLookup = getLastLookup();
  if (!lastLookup || (Date.now() - lastLookup.timestamp) > 300000) {
    return axios.get(`http://api.ipstack.com/check?access_key=${process.env.GATSBY_IPSTACK_ACCESS_KEY}`)
      .then(({ data }) => {
        const result = {
          data,
          timestamp: Date.now()
        };
        sessionStorage.setItem('last_lookup', JSON.stringify(result));
        return result;
      });
  }
  return Promise.resolve(getLastLookup());
};

export { lookupRequesterIp as default };
