import { NextApiRequest, NextApiResponse } from "next";
import { promises as fsPromises } from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { body } = req; // Get the entire JSON body from the request

    // Write the entire new JSON data to the file
    const filePath = "config/pagesConfig.json";
    await fsPromises.writeFile(filePath, JSON.stringify(body, null, 2), "utf8");

    res.status(200).json({
      success: true,
      message: "JSON file has been successfully updated.",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
}
