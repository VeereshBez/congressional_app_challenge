const apiKey = 'aa798775-5423-4f10-8ab1-6df23f5ffafb'

export async function fetchStates() {
  const url = 'https://v3.openstates.org/jurisdictions';
  const response = await fetch(url, { headers: { 'X-API-Key': apiKey } });
  const data = await response.json();
  console.log(data)
  return data.results.map(j => j.abbreviation);
}

export async function fetchBillsForState(state) {
  const url = `https://v3.openstates.org/bills?jurisdiction=${state}&page=1`;
  const response = await fetch(url, { headers: { 'X-API-Key': apiKey } });
  const data = await response.json();
  console.log(data)
  return data;
}

export async function fetchAllBills() {
  const states = await fetchStates();
  let allBills = [];

  for (const state of states) {
    let page = 1;
    let keepFetching = true;

    while (keepFetching) {
      const data = await fetchBillsForState(state, page);
      allBills = allBills.concat(data.results);

      if (data.pagination && data.pagination.page < data.pagination.pages) {
        page++;
      } else {
        keepFetching = false;
      }
    }
  }

  return allBills;
}