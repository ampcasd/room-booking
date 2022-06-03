export async function post<ResponseType>(
  url: string,
  body: any
): Promise<ResponseType> {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("user") || "{}").token
      }`,
    },
  })
    .then(async (response: any) => {
      if (
        response.status === 200 ||
        response.statusCode === 200 ||
        response.status === 201 ||
        response.statusCode === 201
      ) {
        return (await response.json()) as ResponseType;
      } else {
        console.error(await response.json());
      }
    })
    .catch((err) => err);
}

export async function get<ResponseType>(url: string): Promise<ResponseType> {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("user") || "{}").token
      }`,
    },
  }).then(async (response: any) => {
    return (await response.json()) as ResponseType;
  });
}
