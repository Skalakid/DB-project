export const get = (endpoint: string, params: any) => {
  return async () => {
    let uri = `http://localhost:3000${endpoint}`;
    if (params) {
      uri = `${uri}?${new URLSearchParams(params)}`;
    }

    const res = await fetch(uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
    throw new Error(res.status.toString());
  };
};

export const post = (endpoint: string, body: any) => {
  return async () => {
    const res = await fetch(`http://localhost:3000${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const contentType = res.headers.get('Content-Type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const data = await res.json();
        return data;
      }
      return null;
    }
    throw new Error(res.status.toString());
  };
};
