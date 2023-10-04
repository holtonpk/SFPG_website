// pages/api/transition.ts

import { NextApiRequest, NextApiResponse } from "next";

const fetch = require("node-fetch");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const currentDate = new Date();
  const isoDate = currentDate.toISOString().split("T")[0]; // Get today's date in ISO 8601 format (YYYY-MM-DD)

  try {
    const url = "https://a.klaviyo.com/api/metric-aggregates/";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        revision: "2023-09-15",
        "content-type": "application/json",
        Authorization: `Klaviyo-API-Key ${process.env.NEXT_PUBLIC_PRIVATE_KLAVIYO_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: "metric-aggregate",
          attributes: {
            metric_id: "WkAqM5",
            measurements: ["count"],
            interval: "day",
            page_size: 500,
            timezone: "UTC",
            filter: [
              "greater-or-equal(datetime,2023-09-04T00:00:00)",
              `less-than(datetime,${isoDate}T00:00:00)`,
            ],
          },
        },
      }),
    };

    const response = await fetch(url, options);
    const json = await response.json();
    const data = {
      dates: json.data.attributes.dates,
      values: json.data.attributes.data[0].measurements.count,
    };

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
