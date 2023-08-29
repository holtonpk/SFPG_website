import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  interface SubscriptionRequestBody {
    LIST: string;
    EMAIL: string;
    SOURCE: string;
    NAME?: string;
  }

  const { LIST, EMAIL, SOURCE, NAME }: SubscriptionRequestBody = req.body;

  const fetch = require("node-fetch");
  const url = `https://a.klaviyo.com/client/subscriptions/?company_id=${process.env.NEXT_PUBLIC_KLAVIYO_API_KEY}`;
  const options = {
    method: "POST",
    headers: {
      revision: "2023-08-15",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      data: {
        type: "subscription",
        attributes: {
          custom_source: SOURCE,
          profile: {
            data: {
              type: "profile",
              attributes: {
                email: EMAIL,
                first_name: NAME ? NAME : "",
              },
            },
          },
        },
        relationships: { list: { data: { type: "list", id: LIST } } },
      },
    }),
  };

  fetch(url, options)
    .then((response: Response) => {
      if (response.status === 202) {
        return Promise.resolve(); // Resolve with no data
      } else {
        return response.text();
      }
    })
    .then((responseText: string) => {
      res
        .status(200)
        .json({ message: `${EMAIL} successfully subscribed to ${LIST}` });
    })
    .catch((err: Error) => {
      console.error("Error:", err);
      res.status(500).json({ error: `An error occurred: ${err.message}` });
    });
}
