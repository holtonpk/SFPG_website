import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const fetch = require("node-fetch");

    // Step 1: Get the list IDs
    // const listIdsResponse = await fetch("https://a.klaviyo.com/api/lists/", {
    //   method: "GET",
    //   headers: {
    //     accept: "application/json",
    //     revision: "2023-09-15",
    //     Authorization: `Klaviyo-API-Key ${process.env.NEXT_PUBLIC_PRIVATE_KLAVIYO_API_KEY}`,
    //   },
    // });
    // const lists = await listIdsResponse.json();

    const LISTID = "RMBhiE";

    const listResponse = await fetch(
      `https://a.klaviyo.com/api/lists/${LISTID}/?additional-fields[list]=profile_count&include=`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          revision: "2023-09-15",
          Authorization: `Klaviyo-API-Key ${process.env.NEXT_PUBLIC_PRIVATE_KLAVIYO_API_KEY}`,
        },
      }
    );
    const listData = await listResponse.json();
    const rawList = listData.data; // Await

    const listIdsResponse = await fetch(
      `https://a.klaviyo.com/api/lists/${LISTID}/profiles/?page[size]=5&sort=-joined_group_at`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          revision: "2023-09-15",
          Authorization: `Klaviyo-API-Key ${process.env.NEXT_PUBLIC_PRIVATE_KLAVIYO_API_KEY}`,
        },
      }
    );
    const listProfileData = await listIdsResponse.json();
    const profiles = listProfileData.data.map((profile: any) => {
      return {
        id: profile?.id,
        email: profile?.attributes?.email || "",
        date: profile?.attributes.joined_group_at || "",
        source: profile?.attributes.properties?.$source || "no source",
      };
    });

    const listsData = {
      id: LISTID,
      name: rawList.attributes.name,
      created: rawList.attributes.created,
      updated: rawList.attributes.updated,
      profile_count: rawList.attributes.profile_count,
      recent: profiles,
    };

    res.status(200).json(listsData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
