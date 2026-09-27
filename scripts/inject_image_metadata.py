import os
import piexif
from PIL import Image
from iptcinfo3 import IPTCInfo
import logging

# Suppress iptcinfo3 warnings
logger = logging.getLogger('iptcinfo')
logger.setLevel(logging.ERROR)

IMAGE_DIR = "../public/imgs/"

# Arvada, CO Geotag Coordinates
LAT_DEG, LAT_MIN, LAT_SEC = (39, 48, 10) # 39.8028° N
LON_DEG, LON_MIN, LON_SEC = (105, 5, 15) # 105.0875° W

KEYWORDS_STR = "ASD Friendly Design; Special Needs Home Remodeling; Adaptive Housing Solutions; Developmental Disability Home Modifications; Safe Spaces For Autism; Autism Meltdown Room; Sensory Meltdown Safe Space; Wandering Prevention; Anti Elopement Window Locks; Safety Door Hardware Autism; Custom Safety Beds Autism; Padded Walls Home; Motor Skills Playroom; In Home Therapy Gym; Occupational Therapy Room Home; Compression Swing Installation; Therapy Swing Ceiling Mount; Heavy Duty Swing Hanger; Compression Nook; Crash Pad Corner; Sensory Crash Pad Space; Under Cushion Squeeze Space; Tactile Seeking Design; Auditory Hypersensitivity Reduction; Visual Stimming Space; Proprioceptive Seeking; Vestibular Input Gym; Sensory Integration Therapy Room; Deep Touch Pressure Space; Non Strobe Lighting; Flicker Free LED; Soft Glow Lighting; Weighted Blanket Nook; Impact Resistant Drywall; Acoustic Drywall Installation; Sound Dampening Walls; Anti Slip Sensory Flooring; Padded Play Flooring; Nontoxic Play Space; Sensory Architecture; Adaptive Physical Environment; Adaptive Home Renovation; Special Needs Contractor; Neurodivergent Contractor Colorado; Accessible Carpentry; Neurodiverse Space Planning; Executive Dysfunction Design; ADHD Spatial Design; Calming Visual Environment; Low Contrast Interior Design"

def convert_to_deg_min_sec(value):
    return ((int(value[0]), 1), (int(value[1]), 1), (int(value[2] * 100), 100))

def inject_metadata(image_path):
    try:
        # Phase 1: EXIF Metadata (piexif) - Used for Windows and GeoTags
        img = Image.open(image_path)
        exif_dict = get_exif_dict()
        exif_bytes = piexif.dump(exif_dict)
        img.save(image_path, exif=exif_bytes)
        
        # Phase 2: IPTC Metadata (iptcinfo3) - Used for Linux (Nautilus, Dolphin) & Mac
        if image_path.lower().endswith(('.jpg', '.jpeg')):
            info = IPTCInfo(image_path, force=True)
            keywords_list = [k.strip() for k in KEYWORDS_STR.split(";")]
            info["keywords"] = [k.encode("utf-8") for k in keywords_list]
            info.save()
            
            # Cleanup iptcinfo3 backup file
            if os.path.exists(image_path + "~"):
                os.remove(image_path + "~")
                
        print(f"✅ Universal Tags Injected (EXIF + IPTC): {image_path}")
    except Exception as e:
        print(f"❌ Failed to process {image_path}: {e}")

def get_exif_dict():
    # Build EXIF dictionary
    zeroth_ifd = {
        piexif.ImageIFD.Make: "Fix-It Build-It Colorado, LLC".encode('utf-8'),
        piexif.ImageIFD.Model: "Sensory Carpentry Studio Engine".encode('utf-8'),
        piexif.ImageIFD.ImageDescription: f"Specialized non-structural EAA home adaptation for neurodivergent homes in Colorado. Keywords: {KEYWORDS_STR}".encode('utf-8'),
        piexif.ImageIFD.Software: "FIBI Asset Pipeline v1.0".encode('utf-8'),
        piexif.ImageIFD.Copyright: "© 2026 FIX-IT BUILD-IT COLORADO, LLC".encode('utf-8'),
        # XPKeywords writes directly to Windows "Tags" property
        piexif.ImageIFD.XPKeywords: tuple(KEYWORDS_STR.encode("utf-16le") + b"\x00\x00")
    }
    
    gps_ifd = {
        piexif.GPSIFD.GPSLatitudeRef: 'N',
        piexif.GPSIFD.GPSLatitude: convert_to_deg_min_sec((LAT_DEG, LAT_MIN, LAT_SEC)),
        piexif.GPSIFD.GPSLongitudeRef: 'W',
        piexif.GPSIFD.GPSLongitude: convert_to_deg_min_sec((LON_DEG, LON_MIN, LON_SEC)),
    }
    
    return {"0th": zeroth_ifd, "GPS": gps_ifd}

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    target_dir = os.path.join(script_dir, IMAGE_DIR)
    for root, dirs, files in os.walk(target_dir):
        for filename in files:
            if filename.lower().endswith(('.jpg', '.jpeg', '.webp', '.png')):
                inject_metadata(os.path.join(root, filename))
