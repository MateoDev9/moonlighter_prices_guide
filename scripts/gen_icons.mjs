// Scrape item images directly from Moonlighter wiki pages HTML
// This reads the actual wiki article and extracts the item infobox image
import { writeFileSync } from 'fs';

const OUTPUT_FILE = 'src/data/iconUrls.js';

// Map of item English names to their wiki page URL slugs
// Format: [displayName, wikiSlug]
const ITEMS = [
  // Cultura Mercader
  ["Rich Jelly", "Rich_Jelly"],
  ["Venom Jelly", "Venom_Jelly"],
  ["Fire Jelly", "Fire_Jelly"],
  ["Electric Jelly", "Electric_Jelly"],
  ["Power Crystal", "Power_Crystal"],
  ["HP Potion I", "HP_Potion_I"],
  ["HP Potion II", "HP_Potion_II"],
  ["HP Potion III", "HP_Potion_III"],
  ["HP Potion IV", "HP_Potion_IV"],
  ["HP Potion V", "HP_Potion_V"],
  ["Health Potion VI", "Health_Potion_VI"],
  ["Health Potion VII", "Health_Potion_VII"],
  ["Health Potion VIII", "Health_Potion_VIII"],
  ["Hyper Potion", "Hyper_Potion"],
  ["Guidance Golem Potion", "Guidance_Golem_Potion"],
  ["Guidance Forest Potion", "Guidance_Forest_Potion"],
  ["Guidance Desert Potion", "Guidance_Desert_Potion"],
  ["Guidance Tech Potion", "Guidance_Tech_Potion"],
  ["Reveal Golem Potion", "Reveal_Golem_Potion"],
  ["Reveal Forest Potion", "Reveal_Forest_Potion"],
  ["Reveal Desert Potion", "Reveal_Desert_Potion"],
  ["Reveal Tech Potion", "Reveal_Tech_Potion"],
  ["Broken Club", "Broken_Club"],
  ["Broken Mace", "Broken_Mace"],
  ["Broken Sling", "Broken_Sling"],
  ["Broken Katana", "Broken_Katana"],
  ["Broken Rapier", "Broken_Rapier"],
  ["Broken Crossbow", "Broken_Crossbow"],
  ["Broken Morningstar", "Broken_Morningstar"],
  ["Broken Dagger", "Broken_Dagger"],
  ["Broken Whip", "Broken_Whip"],
  // Golem
  ["Vine", "Vine"],
  ["Teethstone", "Teethstone"],
  ["Root", "Root"],
  ["Whetstone", "Whetstone"],
  ["Iron Bar", "Iron_Bar"],
  ["Crystal Rock", "Crystal_Rock"],
  ["Water Sphere", "Water_Sphere"],
  ["Golem Core", "Golem_Core"],
  ["Glass Lenses", "Glass_Lenses"],
  ["Crystallized Energy", "Crystallized_Energy"],
  ["Ancient Pot", "Ancient_Pot"],
  ["Foundry Rests", "Foundry_Rests"],
  ["Broken Sword", "Broken_Sword"],
  ["White Stone", "White_Stone"],
  ["Water Lamp", "Water_Lamp"],
  ["Fabric", "Fabric"],
  ["Hardened Steel", "Hardened_Steel"],
  ["Gold Runes", "Gold_Runes"],
  ["Golem Volume", "Golem_Volume"],
  ["Old Golem Minion Design", "Old_Golem_Minion_Design"],
  ["Golem Chisel", "Golem_Chisel"],
  ["Rune Tool", "Rune_Tool"],
  ["Golem Designs I", "Golem_Designs_I"],
  ["Golem Designs II", "Golem_Designs_II"],
  ["Golem Designs III", "Golem_Designs_III"],
  ["Golem King Energy Crystal", "Golem_King_Energy_Crystal"],
  ["Golem King Jottings", "Golem_King_Jottings"],
  ["Golem History I", "Golem_History_I"],
  ["Golem History II", "Golem_History_II"],
  ["Golem History III", "Golem_History_III"],
  // Forest
  ["Venomous Spores", "Venomous_Spores"],
  ["Plant Flesh", "Plant_Flesh"],
  ["Magic Mushroom", "Magic_Mushroom"],
  ["Petals", "Petals"],
  ["Magic Wood", "Magic_Wood"],
  ["Blade Leaves", "Blade_Leaves"],
  ["Life Fluid", "Life_Fluid"],
  ["Strong Leaves", "Strong_Leaves"],
  ["Pure Acid", "Pure_Acid"],
  ["Essence of Light", "Essence_of_Light"],
  ["Straw", "Straw"],
  ["Preserved Root", "Preserved_Root"],
  ["Modified Seeds", "Modified_Seeds"],
  ["Fertilizer", "Fertilizer"],
  ["Fertile Soil", "Fertile_Soil"],
  ["Ancient Wood", "Ancient_Wood"],
  ["Fluid Vessel", "Fluid_Vessel"],
  ["Nutrient Water", "Nutrient_Water"],
  ["Forest Fruits", "Forest_Fruits"],
  ["Speed Dust", "Speed_Dust"],
  ["Old Bulb", "Old_Bulb"],
  ["Botany Jottings I", "Botany_Jottings_I"],
  ["Botany Jottings II", "Botany_Jottings_II"],
  ["Botany Jottings III", "Botany_Jottings_III"],
  ["Forest History I", "Forest_History_I"],
  ["Forest History II", "Forest_History_II"],
  ["Forest History III", "Forest_History_III"],
  ["Carnivorous Mutae Seeds", "Carnivorous_Mutae_Seeds"],
  ["Carnivorous Mutae Jottings", "Carnivorous_Mutae_Jottings"],
  // Desert
  ["Volcanic Stone", "Volcanic_Stone"],
  ["Magnetic Core", "Magnetic_Core"],
  ["Flammable Dust", "Flammable_Dust"],
  ["Desert Rope", "Desert_Rope"],
  ["Diamagnetic Sand", "Diamagnetic_Sand"],
  ["Magnetite", "Magnetite"],
  ["Fireproof Cloth", "Fireproof_Cloth"],
  ["Fire Gem", "Fire_Gem"],
  ["Insulating Dust", "Insulating_Dust"],
  ["Desert Steel Sheet", "Desert_Steel_Sheet"],
  ["Chilled Lava", "Chilled_Lava"],
  ["Desert Stone", "Desert_Stone"],
  ["Cloth Dye", "Cloth_Dye"],
  ["Fluid Conductor", "Fluid_Conductor"],
  ["Resistant Glass", "Resistant_Glass"],
  ["Inflammable Liquid", "Inflammable_Liquid"],
  ["Soldering Iron", "Soldering_Iron"],
  ["Magnetic Tool", "Magnetic_Tool"],
  ["Desert Steel Ingot", "Desert_Steel_Ingot"],
  ["Thermo-Magnetic Engine", "Thermo-Magnetic_Engine"],
  ["Naja Jottings", "Naja_Jottings"],
  ["High Levitation Core", "High_Levitation_Core"],
  ["Desert History I", "Desert_History_I"],
  ["Desert History II", "Desert_History_II"],
  ["Desert History III", "Desert_History_III"],
  // Tech
  ["Crystal Shards", "Crystal_Shards"],
  ["Conductor Metal", "Conductor_Metal"],
  ["Mercury", "Mercury"],
  ["Gold Strands", "Gold_Strands"],
  ["Plastic Film", "Plastic_Film"],
  ["Wires", "Wires"],
  ["Broken Battery", "Broken_Battery"],
  ["Welding Rods", "Welding_Rods"],
  ["Energy Capacitor", "Energy_Capacitor"],
  ["Tesla Coil Engine", "Tesla_Coil_Engine"],
  ["Treated Wood", "Treated_Wood"],
  ["Wolfram Rock", "Wolfram_Rock"],
  ["Vacuum Tube", "Vacuum_Tube"],
  ["Copper Reel", "Copper_Reel"],
  ["Tungsten Reel", "Tungsten_Reel"],
  ["Triple Cell Battery", "Triple_Cell_Battery"],
  ["Welding Gun", "Welding_Gun"],
  ["Argon Bottle", "Argon_Bottle"],
  ["Power Supply", "Power_Supply"],
  ["AC Adapter", "AC_Adapter"],
  ["Flux Energy Jottings", "Flux_Energy_Jottings"],
  ["Tech History I", "Tech_History_I"],
  ["Tech History II", "Tech_History_II"],
  ["Tech History III", "Tech_History_III"],
  // Interdimensional
  ["Toxic Liquid", "Toxic_Liquid"],
  ["Monster Skull", "Monster_Skull"],
  ["Bone Fragment", "Bone_Fragment"],
  ["Small Spectral Flame", "Small_Spectral_Flame"],
  ["Plastic Board", "Plastic_Board"],
  ["Heavy Metal Plates", "Heavy_Metal_Plates"],
  ["Carbon Fiber Plate", "Carbon_Fiber_Plate"],
  ["Dimensional Resistant Metal", "Dimensional_Resistant_Metal"],
  ["Bomb Detonator", "Bomb_Detonator"],
  ["Bone Fossil", "Bone_Fossil"],
  ["Dimensional Res. Mineral Ore", "Dimensional_Res._Mineral_Ore"],
  ["Dimensional Garbage", "Dimensional_Garbage"],
  ["Dimensional Fungus", "Dimensional_Fungus"],
  ["Coins", "Coins"],
  ["Jewels", "Jewels"],
  ["Dimensional Resistant Glass", "Dimensional_Resistant_Glass"],
  ["Ancient Sacred Volume", "Ancient_Sacred_Volume"],
  ["Tech Recycled Metal Ball", "Tech_Recycled_Metal_Ball"],
  ["Golem Statue", "Golem_Statue"],
  ["Carved Forest Figure", "Carved_Forest_Figure"],
  ["Desert Lava Idol", "Desert_Lava_Idol"],
  // DLC
  ["Dimensional Suit Fabric", "Dimensional_Suit_Fabric"],
  ["Ghost in a Bottle", "Ghost_in_a_Bottle"],
  ["Gold Feather", "Gold_Feather"],
  ["Light Power Crystal", "Light_Power_Crystal"],
  ["Obsidian Rock", "Obsidian_Rock"],
  ["Plasma Charge", "Plasma_Charge"],
  ["Poison Treated Crystal", "Poison_Treated_Crystal"],
  ["Shock Absorb Material", "Shock_Absorb_Material"],
  ["Tech Explosive", "Tech_Explosive"],
  // Weapons
  ["Broom", "Broom"],
  ["Training Short Sword", "Training_Short_Sword"],
  ["Soldier Short Sword", "Soldier_Short_Sword"],
  ["Knight Short Sword", "Knight_Short_Sword"],
  ["Commander Short Sword", "Commander_Short_Sword"],
  ["King Short Sword", "King_Short_Sword"],
  ["Training Big Sword", "Training_Big_Sword"],
  ["Buster Big Sword", "Buster_Big_Sword"],
  ["Wild Big Sword", "Wild_Big_Sword"],
  ["Vulcan Big Sword", "Vulcan_Big_Sword"],
  ["Fusion Big Sword", "Fusion_Big_Sword"],
  ["Training Spear", "Training_Spear"],
  ["Warrior Spear", "Warrior_Spear"],
  ["Wood's Spear", "Wood's_Spear"],
  ["Monkey Spear", "Monkey_Spear"],
  ["Fighter Spear", "Fighter_Spear"],
  ["Training Gloves", "Training_Gloves"],
  ["Fighter Gloves", "Fighter_Gloves"],
  ["Forest Spirit Gloves", "Forest_Spirit_Gloves"],
  ["Captain Gloves", "Captain_Gloves"],
  ["Star Platinum Gloves", "Star_Platinum_Gloves"],
  ["Training Bow", "Training_Bow"],
  ["Hunter Bow", "Hunter_Bow"],
  ["Natural Bow", "Natural_Bow"],
  ["Soldier Bow", "Soldier_Bow"],
  ["Exeter Bow", "Exeter_Bow"],
  ["Rusty Short Sword", "Rusty_Short_Sword"],
  ["Venom Short Sword", "Venom_Short_Sword"],
  ["Reborn Short Sword", "Reborn_Short_Sword"],
  ["Vampire Short Sword", "Vampire_Short_Sword"],
  ["Rock Big Sword", "Rock_Big_Sword"],
  ["Toxic Big Sword", "Toxic_Big_Sword"],
  ["Blaze Big Sword", "Blaze_Big_Sword"],
  ["Storm Big Sword", "Storm_Big_Sword"],
  ["Golem Drill Spear", "Golem_Drill_Spear"],
  ["Venom Sting Spear", "Venom_Sting_Spear"],
  ["Hell Spear", "Hell_Spear"],
  ["Lightning Rod Spear", "Lightning_Rod_Spear"],
  ["Rough Gloves", "Rough_Gloves"],
  ["Venom Twins Gloves", "Venom_Twins_Gloves"],
  ["Flame Gloves", "Flame_Gloves"],
  ["Thunder Gloves", "Thunder_Gloves"],
  ["Catapult Bow", "Catapult_Bow"],
  ["Poison Bow", "Poison_Bow"],
  ["Flamethrower Bow", "Flamethrower_Bow"],
  ["Lightning Bow", "Lightning_Bow"],
  // Armor
  ["Fabric Bandana", "Fabric_Bandana"],
  ["Fabric Bandana II", "Fabric_Bandana_II"],
  ["Fabric Bandana III", "Fabric_Bandana_III"],
  ["Fabric Bandana IV", "Fabric_Bandana_IV"],
  ["Fabric Chestplate", "Fabric_Chestplate"],
  ["Fabric Chestplate II", "Fabric_Chestplate_II"],
  ["Fabric Chestplate III", "Fabric_Chestplate_III"],
  ["Fabric Chestplate IV", "Fabric_Chestplate_IV"],
  ["Fabric Boots", "Fabric_Boots"],
  ["Fabric Boots II", "Fabric_Boots_II"],
  ["Fabric Boots III", "Fabric_Boots_III"],
  ["Fabric Boots IV", "Fabric_Boots_IV"],
  ["Iron Helmet", "Iron_Helmet"],
  ["Iron Helmet II", "Iron_Helmet_II"],
  ["Iron Helmet III", "Iron_Helmet_III"],
  ["Iron Helmet IV", "Iron_Helmet_IV"],
  ["Iron Chestplate", "Iron_Chestplate"],
  ["Iron Chestplate II", "Iron_Chestplate_II"],
  ["Iron Chestplate III", "Iron_Chestplate_III"],
  ["Iron Chestplate IV", "Iron_Chestplate_IV"],
  ["Iron Boots", "Iron_Boots"],
  ["Iron Boots II", "Iron_Boots_II"],
  ["Iron Boots III", "Iron_Boots_III"],
  ["Iron Boots IV", "Iron_Boots_IV"],
  ["Steel Helmet", "Steel_Helmet"],
  ["Steel Helmet II", "Steel_Helmet_II"],
  ["Steel Helmet III", "Steel_Helmet_III"],
  ["Steel Helmet IV", "Steel_Helmet_IV"],
  ["Steel Chestplate", "Steel_Chestplate"],
  ["Steel Chestplate II", "Steel_Chestplate_II"],
  ["Steel Chestplate III", "Steel_Chestplate_III"],
  ["Steel Chestplate IV", "Steel_Chestplate_IV"],
  ["Steel Boots", "Steel_Boots"],
  ["Steel Boots II", "Steel_Boots_II"],
  ["Steel Boots III", "Steel_Boots_III"],
  ["Steel Boots IV", "Steel_Boots_IV"],
];

async function fetchWikiImageUrl(slug) {
  // Use the MediaWiki API to get images on the page
  const apiUrl = `https://moonlighter.fandom.com/api.php?action=query&titles=${encodeURIComponent(slug)}&prop=images&format=json&origin=*`;
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const pages = data.query?.pages;
    if (!pages) return '';
    const page = Object.values(pages)[0];
    const images = page?.images;
    if (!images || images.length === 0) return '';
    
    // Try to find the item's own image (usually first image matching item name)
    const slug_clean = slug.replace(/_/g, ' ');
    const itemImg = images.find(img => 
      img.title.toLowerCase().includes(slug_clean.toLowerCase().split(' ')[0].toLowerCase()) &&
      img.title.toLowerCase().endsWith('.png')
    ) || images.find(img => img.title.toLowerCase().endsWith('.png') && !img.title.toLowerCase().includes('icon'));
    
    if (!itemImg) return '';
    
    // Now fetch the actual URL for this image file
    const fileTitle = itemImg.title;
    const imgApiUrl = `https://moonlighter.fandom.com/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&format=json&origin=*`;
    const imgRes = await fetch(imgApiUrl);
    const imgData = await imgRes.json();
    const imgPages = imgData.query?.pages;
    if (!imgPages) return '';
    const imgPage = Object.values(imgPages)[0];
    const imageinfo = imgPage?.imageinfo?.[0];
    return imageinfo?.url || '';
  } catch (e) {
    return '';
  }
}

// Better approach: use the Fandom API to get item card images
async function fetchItemImage(displayName, slug) {
  // Try direct image URL using the wiki's standard naming convention
  // Moonlighter wiki stores item images as "ItemName.png"
  const imgApiUrl = `https://moonlighter.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(slug + '.png')}&prop=imageinfo&iiprop=url&format=json&origin=*`;
  try {
    const res = await fetch(imgApiUrl);
    const data = await res.json();
    const pages = data.query?.pages;
    if (!pages) return '';
    const page = Object.values(pages)[0];
    // page ID -1 means file doesn't exist
    if (page.missing !== undefined) return '';
    const imageinfo = page?.imageinfo?.[0];
    return imageinfo?.url || '';
  } catch (e) {
    return '';
  }
}

async function main() {
  const results = {};
  const BATCH = 8;
  let found = 0;
  
  console.error(`Fetching images for ${ITEMS.length} items...`);
  
  for (let i = 0; i < ITEMS.length; i += BATCH) {
    const batch = ITEMS.slice(i, i + BATCH);
    const promises = batch.map(([name, slug]) => 
      fetchItemImage(name, slug).then(url => ({ name, url }))
    );
    const resolved = await Promise.all(promises);
    for (const { name, url } of resolved) {
      results[name] = url || '';
      if (url) found++;
    }
    console.error(`  ${Math.min(i + BATCH, ITEMS.length)}/${ITEMS.length} done (${found} found)`);
    await new Promise(r => setTimeout(r, 150));
  }

  const content = [
    '// Auto-generated from Moonlighter Fandom wiki',
    '// Generated: ' + new Date().toISOString(),
    `// Found ${found}/${ITEMS.length} icons`,
    'export const ICON_URLS = ' + JSON.stringify(results, null, 2) + ';',
  ].join('\n');
  
  writeFileSync(OUTPUT_FILE, content, 'utf8');
  console.error(`✅ Done! ${found}/${ITEMS.length} icons found. Written to ${OUTPUT_FILE}`);
}

main();
