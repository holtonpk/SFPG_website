import { NextApiRequest, NextApiResponse } from "next";
import { promises as fsPromises } from "fs";
import { AnalyticsResponseData } from "@/app/admin/types";
const { BetaAnalyticsDataClient } = require("@google-analytics/data");
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: JSON.parse(
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_CREDENTIALS as any
    ),
  });

  // Define the property ID
  const propertyId = "404295076";

  // Define a common date range for all reports
  const dateRange = {
    // startDate: req.body.startDate,
    startDate: "2023-09-28",
    endDate: "today",
  };

  async function fetchReportData(dimensionsName: string) {
    const [reportData] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [dateRange],
      dimensions: [{ name: dimensionsName }],
      metrics: [{ name: "activeUsers" }],
    });

    return reportData.rows.map((row: any) => ({
      title: row.dimensionValues[0].value,
      value: row.metricValues[0].value,
    }));
  }

  const pageReferrerDataRaw = await fetchReportData("pageReferrer");
  const pageReferrerData = removeItemsWithLocalhostTitle(pageReferrerDataRaw);

  const operatingSystemData = await fetchReportData("operatingSystem");

  const browserData = await fetchReportData("browser");

  const topPagesDataRaw = await fetchReportData("fullPageUrl");
  const topPagesData = combineItemsWithSameURL(
    removeItemsWithLocalhostTitle(topPagesDataRaw)
  );

  const [country] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [dateRange],
    dimensions: [
      {
        name: "countryId",
      },
      {
        name: "country",
      },
    ],

    metrics: [
      {
        name: "activeUsers",
      },
      {
        name: "screenPageViews",
      },
    ],
  });

  const countryData = country.rows.map((row: any) => ({
    code: row.dimensionValues[0].value,
    name: row.dimensionValues[1].value,
    value: row.metricValues[0].value,
  }));

  const [siteTraffic] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [dateRange],

    metrics: [
      {
        name: "activeUsers",
      },
      {
        name: "screenPageViews",
      },
    ],
  });

  const siteTrafficData: { users: string; pageViews: string } = {
    users: siteTraffic.rows[0].metricValues[0].value,
    pageViews: siteTraffic.rows[0].metricValues[1].value,
  };

  const [siteTrafficByDate] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [dateRange],
    dimensions: [
      {
        name: req.body.units == "days" ? "date" : "dateHour",
      },
    ],
    metrics: [
      {
        name: "activeUsers",
      },
    ],
  });

  const siteTrafficByDateData: { date: string; value: string }[] =
    siteTrafficByDate.rows.map((row: any) => {
      return {
        date: row.dimensionValues[0].value,
        value: row.metricValues[0].value,
      };
    });

  const responseData: AnalyticsResponseData = {
    siteTrafficData,
    siteTrafficByDateData,
    countryData,
    pageReferrerData,
    operatingSystemData,
    browserData,
    topPagesData,
  };

  res.status(200).json(responseData);
}

function removeItemsWithLocalhostTitle(data: any[]): any[] {
  return data.filter(
    (item) =>
      !item.title.includes("localhost") && !item.title.includes("/admin")
  );
}

function combineItemsWithSameURL(data: any[]): any[] {
  const urlMap: Record<string, any> = {};

  // Iterate through the data array and group items by URL
  data.forEach((item) => {
    const url = item.title.split("?")[0]; // Extract the URL without parameters
    if (url in urlMap) {
      // If URL already exists in the map, add the values
      urlMap[url].value = String(
        Number(urlMap[url].value) + Number(item.value)
      );
    } else {
      // Otherwise, add the item to the map
      urlMap[url] = { ...item };
    }
  });

  // Convert the map back to an array
  const result = Object.values(urlMap);

  return result;
}
