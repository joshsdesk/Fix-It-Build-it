import fs from "node:fs";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);
const jobsFolderPath = path.join(process.cwd(), "public", "imgs", "Portfolio", "Jobs");
const blueprintsFolderPath = path.join(process.cwd(), "public", "imgs", "Portfolio", "Blueprints");
const aboutFolderPath = path.join(process.cwd(), "public", "imgs", "Portfolio", "about");
const jobsManifestPath = path.join(process.cwd(), "public", "imgs", "Portfolio", "jobs-manifest.json");
const blueprintsManifestPath = path.join(process.cwd(), "public", "imgs", "Portfolio", "blueprints-manifest.json");
const aboutManifestPath = path.join(process.cwd(), "public", "imgs", "Portfolio", "about-manifest.json");

function readImages(folderPath, publicPrefix) {
    if (!fs.existsSync(folderPath)) {
        return [];
    }

    return fs.readdirSync(folderPath)
        .filter((entry) => !entry.startsWith("."))
        .filter((entry) => IMAGE_EXTENSIONS.has(path.extname(entry).toLowerCase()))
        .sort((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" }))
        .map((entry) => `${publicPrefix}/${entry}`);
}

    const jobsManifest = readImages(jobsFolderPath, "/imgs/Portfolio/Jobs");
    const blueprintsManifest = readImages(blueprintsFolderPath, "/imgs/Portfolio/Blueprints");
    const aboutManifest = readImages(aboutFolderPath, "/imgs/Portfolio/about");

    fs.writeFileSync(jobsManifestPath, `${JSON.stringify(jobsManifest, null, 2)}\n`);
    fs.writeFileSync(blueprintsManifestPath, `${JSON.stringify(blueprintsManifest, null, 2)}\n`);
    fs.writeFileSync(aboutManifestPath, `${JSON.stringify(aboutManifest, null, 2)}\n`);
    console.log(`Wrote ${jobsManifestPath}`);
    console.log(`Wrote ${blueprintsManifestPath}`);
    console.log(`Wrote ${aboutManifestPath}`);