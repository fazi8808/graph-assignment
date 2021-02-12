const header = {
  method: "GET",
  headers: new Headers({
    Accept: "application/vnd.github.cloak-preview",
    "X-Api-Key": "WgMG5SnksS2L5vqon8AMr8HV2m9sqlgf7FnoQh2Z",
  }),
};

/**
 * fetch chart data
 *
 * @export
 * @param {*} origin
 * @param {*} destination
 * @returns
 */
export async function getRate(origin, destination) {
  const url = `https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod/rates?origin=${origin}&destination=${destination}`;
  try {
    const res = await fetch(url, header);
    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}

/**
 * get ports list
 *
 * @export
 * @returns
 */
export async function getPortsList() {
  try {
    const res = await fetch(
      `https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod/ports`,
      header
    );
    const result = await res.json();
    return result;
  } catch (error) {
    return error;
  }
}
