import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

// Till system database credentials
const TILL_DB_URL = "libsql://emapro-flash.aws-eu-west-1.turso.io";
const TILL_DB_AUTH_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDg3MzI4MjgsImlkIjoiNDVlNjg2NjQtZTk5NC00NmYyLWE3NjYtN2Y1NjlkM2M2ZjU0IiwicmlkIjoiNmI1NzJlN2ItMzVlNS00NDJlLTg3MzgtZmQ1ZGZjMWM4MjYyIn0.OdhTd-h9N4OFqGGDCdgdp2fmIJ4XyYM2vYUWobZl0wBzWcPM9cVmQpXPNrBZfFQdDWmjw9s0_SLT7-bSfJLbCg";

async function inspectTillData() {
  try {
    console.log("Connecting to till system database...");
    const tillClient = createClient({
      url: TILL_DB_URL,
      authToken: TILL_DB_AUTH_TOKEN,
    });
    
    console.log("Fetching raw data to inspect structure...");
    const result = await tillClient.execute("SELECT * FROM menu_items LIMIT 5");
    
    console.log("Sample data structure:");
    console.log(JSON.stringify(result.rows, null, 2));
    
    console.log("\nColumn names:");
    result.columns.forEach((col, index) => {
      console.log(`${index}: ${col}`);
    });

  } catch (error) {
    console.error("Error inspecting data:", error);
  }
}

inspectTillData();