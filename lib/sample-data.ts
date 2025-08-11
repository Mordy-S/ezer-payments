// Sample data based on your Google Sheets export
// This represents the structure of your actual data

export interface DonationRecord {
  "1. Receipt #": number;
  "2. Payment Date": string;
  "3. Hebcal Converter JSON": string;
  "4. Hebcal Shabbat JSON": string;
  "5. Hebrew Weekday Letter": string;
  "6. Full Hebrew Date (e.g., ג' אב תשפ\"ה)": string;
  "7. Parsha Name (Hebrew)": string;
  "8. Final Hebrew Format (weekday, parsha, date)": string;
  "9. Month and year": string;
  "10. Number": number;
  "11. Donor Jewish Name": string;
  "12. Created Date & Time": string;
  "13. Amount": number;
  "14. Payment Type": string;
  "15. Ref #": string;
  "16. Status": string;
  "17. Campaign": string;
  "18. Reason": string;
}

// Sample data from your actual Google Sheet
export const sampleDonations: DonationRecord[] = [
  {
    "1. Receipt #": 10166,
    "2. Payment Date": "2024-08-14",
    "3. Hebcal Converter JSON": "{\"gy\":2024,\"gm\":8,\"gd\":14,\"afterSunset\":false,\"hy\":5784,\"hm\":\"Av\",\"hd\":10,\"hebrew\":\"י׳ בְּאָב תשפ״ד\",\"heDateParts\":{\"y\":\"תשפ״ד\",\"m\":\"אב\",\"d\":\"י׳\"},\"events\":[\"Parashat Vaetchanan\"]}",
    "4. Hebcal Shabbat JSON": "{\"title\":\"Hebcal New York City August 2024\",\"date\":\"2025-08-05T20:10:11.507Z\",\"version\":\"5.10.1-3.4.3\",\"location\":{\"title\":\"New York City, New York, USA\",\"city\":\"New York City\",\"tzid\":\"America/New_York\",\"latitude\":40.71427,\"longitude\":-74.00597,\"cc\":\"US\",\"country\":\"United States\",\"elevation\":57,\"admin1\":\"New York\",\"asciiname\":\"New York City\",\"geo\":\"geoname\",\"geonameid\":5128581},\"range\":{\"start\":\"2024-08-16\",\"end\":\"2024-08-19\"},\"items\":[{\"title\":\"הַדְלָקַת נֵרוֹת: 7:33pm\",\"date\":\"2024-08-16T19:33:00-04:00\",\"category\":\"candles\",\"title_orig\":\"Candle lighting\",\"hebrew\":\"הדלקת נרות\",\"memo\":\"פָּרָשַׁת וָאֶתְחַנַּן\"},{\"title\":\"שַׁבַּת נַחֲמוּ\",\"date\":\"2024-08-17\",\"hdate\":\"13 Av 5784\",\"category\":\"holiday\",\"subcat\":\"shabbat\",\"title_orig\":\"Shabbat Nachamu\",\"hebrew\":\"שבת נחמו\",\"link\":\"https://hebcal.com/h/shabbat-nachamu-2024?us=js&um=api\",\"memo\":\"Shabbat after Tish'a B'Av (Shabbat of Consolation). The first of seven Shabbatot leading up to Rosh Hashanah. Named after the Haftarah (from Isaiah 40) which begins with the verse נַחֲמוּ נַחֲמוּ, עַמִּי (\\\"Comfort, oh comfort my people\\\")\"},{\"title\":\"פָּרָשַׁת וָאֶתְחַנַּן\",\"date\":\"2024-08-17\",\"hdate\":\"13 Av 5784\",\"category\":\"parashat\",\"title_orig\":\"Parashat Vaetchanan\",\"hebrew\":\"פרשת ואתחנן\",\"leyning\":{\"1\":\"Deuteronomy 3:23-4:4\",\"2\":\"Deuteronomy 4:5-4:40\",\"3\":\"Deuteronomy 4:41-4:49\",\"4\":\"Deuteronomy 5:1-5:18\",\"5\":\"Deuteronomy 5:19-6:3\",\"6\":\"Deuteronomy 6:4-6:25\",\"7\":\"Deuteronomy 7:1-7:11\",\"torah\":\"Deuteronomy 3:23-7:11\",\"haftarah\":\"Isaiah 40:1-26\",\"maftir\":\"Deuteronomy 7:9-7:11\",\"triennial\":{\"1\":\"Deuteronomy 5:1-5:18\",\"2\":\"Deuteronomy 5:19-5:24\",\"3\":\"Deuteronomy 5:25-5:30\",\"4\":\"Deuteronomy 6:1-6:3\",\"5\":\"Deuteronomy 6:4-6:9\",\"6\":\"Deuteronomy 6:10-6:19\",\"7\":\"Deuteronomy 6:20-6:25\",\"maftir\":\"Deuteronomy 6:23-6:25\"}},\"link\":\"https://hebcal.com/s/5784/45?us=js&um=api\"},{\"title\":\"הַבְדָּלָה: 8:34pm\",\"date\":\"2024-08-17T20:34:00-04:00\",\"category\":\"havdalah\",\"title_orig\":\"Havdalah\",\"hebrew\":\"הבדלה\"},{\"title\":\"ט״וּ בְּאָב\",\"date\":\"2024-08-19\",\"hdate\":\"15 Av 5784\",\"category\":\"holiday\",\"subcat\":\"minor\",\"title_orig\":\"Tu B'Av\",\"hebrew\":\"ט״ו באב\",\"link\":\"https://hebcal.com/h/tu-bav-2024?us=js&um=api\",\"memo\":\"Minor Jewish holiday of love. Observed on the 15th day of the Hebrew month of Av\"}]}",
    "5. Hebrew Weekday Letter": "ד'",
    "6. Full Hebrew Date (e.g., ג' אב תשפ\"ה)": "י׳ בְּאָב תשפ״ד",
    "7. Parsha Name (Hebrew)": "ואתחנן",
    "8. Final Hebrew Format (weekday, parsha, date)": "ד' ואתחנן, י׳ בְּאָב תשפ״ד",
    "9. Month and year": "אב תשפ״ד",
    "10. Number": 101,
    "11. Donor Jewish Name": "אשר איינהארן",
    "12. Created Date & Time": "2025-07-31",
    "13. Amount": 400,
    "14. Payment Type": "Credit Card",
    "15. Ref #": "Master-9129",
    "16. Status": "Success",
    "17. Campaign": "הרב מנשה באכנער",
    "18. Reason": "Evaluation"
  },
  {
    "1. Receipt #": 10167,
    "2. Payment Date": "2024-08-19",
    "3. Hebcal Converter JSON": "{\"gy\":2024,\"gm\":8,\"gd\":19,\"afterSunset\":false,\"hy\":5784,\"hm\":\"Av\",\"hd\":15,\"hebrew\":\"ט״ו בְּאָב תשפ״ד\",\"heDateParts\":{\"y\":\"תשפ״ד\",\"m\":\"אב\",\"d\":\"ט״ו\"},\"events\":[\"Tu B'Av\",\"Parashat Eikev\"]}",
    "4. Hebcal Shabbat JSON": "{\"title\":\"Hebcal New York City August 2024\",\"date\":\"2025-08-05T20:10:11.275Z\",\"version\":\"5.10.1-3.4.3\",\"location\":{\"title\":\"New York City, New York, USA\",\"city\":\"New York City\",\"tzid\":\"America/New_York\",\"latitude\":40.71427,\"longitude\":-74.00597,\"cc\":\"US\",\"country\":\"United States\",\"elevation\":57,\"admin1\":\"New York\",\"asciiname\":\"New York City\",\"geo\":\"geoname\",\"geonameid\":5128581},\"range\":{\"start\":\"2024-08-19\",\"end\":\"2024-08-24\"},\"items\":[{\"title\":\"ט״וּ בְּאָב\",\"date\":\"2024-08-19\",\"hdate\":\"15 Av 5784\",\"category\":\"holiday\",\"subcat\":\"minor\",\"title_orig\":\"Tu B'Av\",\"hebrew\":\"ט״ו באב\",\"link\":\"https://hebcal.com/h/tu-bav-2024?us=js&um=api\",\"memo\":\"Minor Jewish holiday of love. Observed on the 15th day of the Hebrew month of Av\"},{\"title\":\"הַדְלָקַת נֵרוֹת: 7:23pm\",\"date\":\"2024-08-23T19:23:00-04:00\",\"category\":\"candles\",\"title_orig\":\"Candle lighting\",\"hebrew\":\"הדלקת נרות\",\"memo\":\"פָּרָשַׁת עֵקֶב\"},{\"title\":\"פָּרָשַׁת עֵקֶב\",\"date\":\"2024-08-24\",\"hdate\":\"20 Av 5784\",\"category\":\"parashat\",\"title_orig\":\"Parashat Eikev\",\"hebrew\":\"פרשת עקב\",\"leyning\":{\"1\":\"Deuteronomy 7:12-8:10\",\"2\":\"Deuteronomy 8:11-9:3\",\"3\":\"Deuteronomy 9:4-9:29\",\"4\":\"Deuteronomy 10:1-10:11\",\"5\":\"Deuteronomy 10:12-11:9\",\"6\":\"Deuteronomy 11:10-11:21\",\"7\":\"Deuteronomy 11:22-11:25\",\"torah\":\"Deuteronomy 7:12-11:25\",\"haftarah\":\"Isaiah 49:14-51:3\",\"maftir\":\"Deuteronomy 11:22-11:25\",\"triennial\":{\"1\":\"Deuteronomy 9:4-9:10\",\"2\":\"Deuteronomy 9:11-9:14\",\"3\":\"Deuteronomy 9:15-9:21\",\"4\":\"Deuteronomy 9:22-9:29\",\"5\":\"Deuteronomy 10:1-10:5\",\"6\":\"Deuteronomy 10:6-10:8\",\"7\":\"Deuteronomy 10:9-10:11\",\"maftir\":\"Deuteronomy 10:9-10:11\"}},\"link\":\"https://hebcal.com/s/5784/46?us=js&um=api\"},{\"title\":\"הַבְדָּלָה: 8:23pm\",\"date\":\"2024-08-24T20:23:00-04:00\",\"category\":\"havdalah\",\"title_orig\":\"Havdalah\",\"hebrew\":\"הבדלה\"}]}",
    "5. Hebrew Weekday Letter": "ב'",
    "6. Full Hebrew Date (e.g., ג' אב תשפ\"ה)": "ט״ו בְּאָב תשפ״ד",
    "7. Parsha Name (Hebrew)": "עקב",
    "8. Final Hebrew Format (weekday, parsha, date)": "ב' עקב, ט״ו בְּאָב תשפ״ד",
    "9. Month and year": "אב תשפ״ד",
    "10. Number": 102,
    "11. Donor Jewish Name": "יואל דוד קעסטענבוים",
    "12. Created Date & Time": "2025-07-31",
    "13. Amount": 1350,
    "14. Payment Type": "Credit Card",
    "15. Ref #": "Visa-6426",
    "16. Status": "Success",
    "17. Campaign": "הרב מנשה באכנער",
    "18. Reason": "Evaluation"
  },
  {
    "1. Receipt #": 10170,
    "2. Payment Date": "2024-08-20",
    "3. Hebcal Converter JSON": "{\"gy\":2024,\"gm\":8,\"gd\":20,\"afterSunset\":false,\"hy\":5784,\"hm\":\"Av\",\"hd\":16,\"hebrew\":\"ט״ז בְּאָב תשפ״ד\",\"heDateParts\":{\"y\":\"תשפ״ד\",\"m\":\"אב\",\"d\":\"ט״ז\"},\"events\":[\"Parashat Eikev\"]}",
    "4. Hebcal Shabbat JSON": "{\"title\":\"Hebcal New York City August 2024\",\"date\":\"2025-08-05T20:10:11.396Z\",\"version\":\"5.10.1-3.4.3\",\"location\":{\"title\":\"New York City, New York, USA\",\"city\":\"New York City\",\"tzid\":\"America/New_York\",\"latitude\":40.71427,\"longitude\":-74.00597,\"cc\":\"US\",\"country\":\"United States\",\"elevation\":57,\"admin1\":\"New York\",\"asciiname\":\"New York City\",\"geo\":\"geoname\",\"geonameid\":5128581},\"range\":{\"start\":\"2024-08-23\",\"end\":\"2024-08-24\"},\"items\":[{\"title\":\"הַדְלָקַת נֵרוֹת: 7:23pm\",\"date\":\"2024-08-23T19:23:00-04:00\",\"category\":\"candles\",\"title_orig\":\"Candle lighting\",\"hebrew\":\"הדלקת נרות\",\"memo\":\"פָּרָשַׁת עֵקֶב\"},{\"title\":\"פָּרָשַׁת עֵקֶב\",\"date\":\"2024-08-24\",\"hdate\":\"20 Av 5784\",\"category\":\"parashat\",\"title_orig\":\"Parashat Eikev\",\"hebrew\":\"פרשת עקב\",\"leyning\":{\"1\":\"Deuteronomy 7:12-8:10\",\"2\":\"Deuteronomy 8:11-9:3\",\"3\":\"Deuteronomy 9:4-9:29\",\"4\":\"Deuteronomy 10:1-10:11\",\"5\":\"Deuteronomy 10:12-11:9\",\"6\":\"Deuteronomy 11:10-11:21\",\"7\":\"Deuteronomy 11:22-11:25\",\"torah\":\"Deuteronomy 7:12-11:25\",\"haftarah\":\"Isaiah 49:14-51:3\",\"maftir\":\"Deuteronomy 11:22-11:25\",\"triennial\":{\"1\":\"Deuteronomy 9:4-9:10\",\"2\":\"Deuteronomy 9:11-9:14\",\"3\":\"Deuteronomy 9:15-9:21\",\"4\":\"Deuteronomy 9:22-9:29\",\"5\":\"Deuteronomy 10:1-10:5\",\"6\":\"Deuteronomy 10:6-10:8\",\"7\":\"Deuteronomy 10:9-10:11\",\"maftir\":\"Deuteronomy 10:9-10:11\"}},\"link\":\"https://hebcal.com/s/5784/46?us=js&um=api\"},{\"title\":\"הַבְדָּלָה: 8:23pm\",\"date\":\"2024-08-24T20:23:00-04:00\",\"category\":\"havdalah\",\"title_orig\":\"Havdalah\",\"hebrew\":\"הבדלה\"}]}",
    "5. Hebrew Weekday Letter": "ג'",
    "6. Full Hebrew Date (e.g., ג' אב תשפ\"ה)": "ט״ז בְּאָב תשפ״ד",
    "7. Parsha Name (Hebrew)": "עקב",
    "8. Final Hebrew Format (weekday, parsha, date)": "ג' עקב, ט״ז בְּאָב תשפ״ד",
    "9. Month and year": "אב תשפ״ד",
    "10. Number": 103,
    "11. Donor Jewish Name": "שלום ראלניצקי",
    "12. Created Date & Time": "2025-07-30",
    "13. Amount": 85,
    "14. Payment Type": "Credit Card",
    "15. Ref #": "Visa-7132",
    "16. Status": "Success",
    "17. Campaign": "הרב מנשה באכנער",
    "18. Reason": "Follow up"
  }
];

// Helper functions to parse the Hebrew calendar data
export function parseHebcalData(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing Hebcal data:', error);
    return null;
  }
}

export function getHebrewMonth(record: DonationRecord): string {
  return record["9. Month and year"];
}

export function getHebrewDate(record: DonationRecord): string {
  return record["6. Full Hebrew Date (e.g., ג' אב תשפ\"ה)"];
}

export function getParshaName(record: DonationRecord): string {
  return record["7. Parsha Name (Hebrew)"];
}

export function getFormattedHebrewDate(record: DonationRecord): string {
  return record["8. Final Hebrew Format (weekday, parsha, date)"];
}

// Generate some additional sample data for demonstration
// Using deterministic seed-based generation to prevent hydration issues
export function generateMoreSampleData(): DonationRecord[] {
  const hebrewMonths = ["אב תשפ״ד", "אלול תשפ״ד", "תשרי תשפ״ה", "חשון תשפ״ה"];
  const parshiot = ["ואתחנן", "עקב", "ראה", "שופטים", "כי תצא"];
  const hebrewNames = ["אשר איינהארן", "יואל דוד קעסטענבוים", "שלום ראלניצקי", "משה כהן", "דוד לוי"];
  const campaigns = ["הרב מנשה באכנער", "קמפיין חירום", "תמיכה שוטפת"];
  const amounts = [1102, 1553, 1010, 262, 796, 128, 116, 122, 1522, 838, 654, 866, 1502, 1137, 1742, 1100, 1061, 1504, 1781, 1276];
  
  const additionalData: DonationRecord[] = [];
  
  for (let i = 0; i < 20; i++) {
    const receiptNum = 10171 + i;
    const amount = amounts[i] || 100 + (i * 50); // Use predetermined amounts
    const monthYear = hebrewMonths[i % hebrewMonths.length];
    const parsha = parshiot[i % parshiot.length];
    const donorName = hebrewNames[i % hebrewNames.length];
    const campaign = campaigns[i % campaigns.length];
    
    additionalData.push({
      "1. Receipt #": receiptNum,
      "2. Payment Date": "2024-08-21",
      "3. Hebcal Converter JSON": "{}",
      "4. Hebcal Shabbat JSON": "{}",
      "5. Hebrew Weekday Letter": "א'",
      "6. Full Hebrew Date (e.g., ג' אב תשפ\"ה)": `י״ז ${monthYear}`,
      "7. Parsha Name (Hebrew)": parsha,
      "8. Final Hebrew Format (weekday, parsha, date)": `א' ${parsha}, י״ז ${monthYear}`,
      "9. Month and year": monthYear,
      "10. Number": 104 + i,
      "11. Donor Jewish Name": donorName,
      "12. Created Date & Time": "2025-07-30",
      "13. Amount": amount,
      "14. Payment Type": "Credit Card",
      "15. Ref #": `Visa-${1000 + i}`, // Use deterministic reference numbers
      "16. Status": "Success",
      "17. Campaign": campaign,
      "18. Reason": "Donation"
    });
  }
  
  return additionalData;
}
