/**
 * Smoke test for Colorado SOS API (Socrata Open Data)
 * Run this manually with: pnpm dlx tsx scripts/smoke_test_sos.ts
 */

async function main() {
    console.log("Starting smoke test for Colorado SOS API...");
    
    // Test case: Soar Health Inc
    const query = "Soar Health Inc";
    console.log(`Querying for: ${query}`);
    
    const sosUrl = new URL("https://data.colorado.gov/resource/4ykn-tg5h.json");
    
    const cleanedQuery = query.replace(/[,.]/g, "").trim();
    const escapedQuery = cleanedQuery.replace(/'/g, "''");
    sosUrl.searchParams.set("$where", `starts_with(upper(entityname), upper('${escapedQuery}'))`);
    sosUrl.searchParams.set("$limit", "1");
    
    try {
        const response = await fetch(sosUrl.toString());
        console.log(`HTTP Status: ${response.status}`);
        
        if (!response.ok) {
            console.error("Error: Failed to fetch from Colorado SOS API.");
            process.exit(1);
        }
        
        const data = await response.json() as any[];
        
        if (data.length === 0) {
            console.log("Result: Not Found.");
        } else {
            const record = data[0];
            console.log("Result: Found");
            console.log(`Legal Name: ${record.entityname}`);
            console.log(`Status: ${record.entitystatus}`);
            console.log(`ID: ${record.entityid}`);
            
            if (record.entitystatus === "Good Standing") {
                console.log("Verification Status: VERIFIED");
            } else {
                console.log("Verification Status: UNVERIFIED");
            }
        }
    } catch (e) {
        console.error("Error connecting to Colorado SOS API:", e);
        process.exit(1);
    }
}

main().catch(console.error);

export {};
