import { NextApiRequest, NextApiResponse } from "next";
import { promises as fsPromises } from "fs";
import { AnalyticsResponseData } from "@/app/admin/types";
const { BetaAnalyticsDataClient } = require("@google-analytics/data");
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
      type: "service_account",
      project_id: "modified-media-400723",
      private_key_id: "e798d780420f5a70767856425de91ffd0a860b32",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDwrTDq3lwxDLFF\nW8hLHKgaOMwmzki2RC9mlqgK/eeBKMJA0jQDeuO0VQTEuXGT2EUpPk1MYjOkYAnd\nClDBVL1ZiDRhx78ElaHIZeIRLqRA/GtN7y5/Zye9EkFzmU3jJkjGrPo+TN2p5QNU\nxw6FfhAfN1QWfCXVkB58clxv//fZtcQCkMgAB0tYVlmN91xr9Xc8vXDBo1y3RogW\n+ZbQMnkMjOLBc1kPLrA1WDbFJGSW5S5SSNWM/RB5zZHuKUf16cSw6dghNRDklLNw\n2LRiMTk/7RFuZiFrelJJ+Z6YdrrAYgVxvQ5c/orMbavkGtmSEb28a41dn0jwpROp\nt4bdwKYtAgMBAAECggEAAuEPhL/EOpH8TOgcLUnaePXU+2HcXNHT/1YuDHOdIV5r\ndHsPRDtkHfQmanQNd8dOjH/CTPefxoeflpVZAfcRjNCkT8cj8doYZV1SpwH31Q8v\n+W6zD7McNpbRUaCz3dPHaxkGpVgmDrI+p/T5p38qkjUHPH2ftj5THwn/MRfOzzvn\ne7I/vkwfTNwpP+ONJp7ecswQGpTascAFsOOwVjU71ppM/eLHSR7NhtzOUK0i6X2i\nLoJyBUMuDB8Ex7hKN6nc4ZXb0dPYNf1s4tNnkcUF1UXaG4SiQOz2GKUGlgA61ReO\nqm+xbRs5IH1+FRzg6YWfLu1OqezgMY4wwIZxNGZOAQKBgQD9dw+GjRFw0jhpLkw0\nVgCsZ4q5J70RNrYN+d75+mmoA8APW2vGEtkaf1mcZoEC+MenocRJU7sXySIfF1on\numfd/GE3wqEOO2x3SyodChtRvWsM/fmGAK42aisbieh0K5Ld6kKSo0NUKVZi2hMD\n42l0PT0x+0ye8JKXXsVcm8w+tQKBgQDzFWNl15NfbXn8HMt4WyybRLRh1vl4XbfX\n21jn+Il0WmMpiq0Rtm2JaXpM0w/sg9CSZd0w4/e/cu8SmRJpY/iUmYQ/0aBn8HWp\nx4vZkqrumNCWRwoRw962x0btK61ZvdMm4NSmkQeLoO30mLy5eEdnW8Ft6526L57L\nFFoXC0H8mQKBgBizqMSxLNj08+B0TaLwGsKymJdw4wExds6n4m40VGW2b9pPS5KT\nNataa+5NIxeaDUMuBcYrrdkklfm3ueaTSRoeRY88nZuYePqrTaBk4sK1liA/BDlm\nCZRuBmN5rjjcIkUUVoaZ+K7UFIIvxJilahqU+UjMt+vpgC/WYZ+j42TdAoGAcOID\n0K11kKEkPsGYc4HTix8yrSTJoO3Ui/ceqEqweknnNslhaZJP97n1w2tYP7tOxk1r\nlGKpEEztXLOc6zgznb5UvdY5KUtvOLKj7RvBKR/p7X9725gb+sE73LOlwsD2J13N\nIrTCzkKjfizXp0GF1yezAbqi+m1WznPbCkx+DjECgYAF3tBEXM+DbVB18sTkVGLQ\nw8klq87xMJJq5cD7XLbOm09Zr8S6fFYCjWvFCjNcTxe2Am1Zv2LCwT9cR7eu4vqz\nJn569VhmKSvmAZi5GdsTS/e2dyRib0j+9FRV7JvDfnqQMqZA5ejvUL2IHUu38VAb\nvgt/kAs9H0NqBcCAeWTKBQ==\n-----END PRIVATE KEY-----\n",
      client_email:
        "google-analytics@modified-media-400723.iam.gserviceaccount.com",
      client_id: "111887823537949629350",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/google-analytics%40modified-media-400723.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    },
  });

  // Define the property ID
  const propertyId = "404295076";

  // Define a common date range for all reports
  const dateRange = {
    startDate: req.body.startDate,
    // startDate: "2023-09-28",
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
