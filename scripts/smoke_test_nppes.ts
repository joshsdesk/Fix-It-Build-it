/**
 * Smoke test for CMS NPPES API
 * Run this manually with: pnpm dlx tsx scripts/smoke_test_nppes.ts
 */

async function main() {
    console.log("Starting smoke test for CMS NPPES API...");
    
    // Test case: Soar Health Inc
    const query = "Soar Health";
    console.log(`Querying for Organization Name: ${query}`);
    
    const nppesUrl = new URL("https://npiregistry.cms.hhs.gov/api/?version=2.1");
    nppesUrl.searchParams.set("organization_name", query);
    
    try {
        const response = await fetch(nppesUrl.toString());
        console.log(`HTTP Status: ${response.status}`);
        
        if (!response.ok) {
            console.error("Error: Failed to fetch from NPPES API.");
            process.exit(1);
        }
        
        const data = await response.json() as any;
        
        if (data.result_count === 0 || !data.results || data.results.length === 0) {
            console.log("Result: Not Found.");
        } else {
            const record = data.results[0];
            console.log("Result: Found");
            
            const orgName = record.basic.organization_name || `${record.basic.first_name} ${record.basic.last_name}`.trim();
            console.log(`Provider Name: ${orgName}`);
            console.log(`Status: ${record.basic.status}`);
            console.log(`NPI: ${record.number}`);
            
            if (record.basic.status === "A") {
                console.log("Verification Status: VERIFIED");
            } else {
                console.log("Verification Status: UNVERIFIED");
            }
        }
    } catch (e) {
        console.error("Error connecting to NPPES API:", e);
        process.exit(1);
    }
}

main().catch(console.error);

export {};
