// Moonlighter Item Special Info & Usages (Potions, Enchantments, Boss Drops, Lore, and Commercial Treasures)

export const SPECIAL_INFO = {
  // === MATERIALES DE POCIONES / ALQUIMIA (EL SOMBRERO DE MADERA) ===
  'Gelatina Nutritiva': {
    type: 'potion',
    badge: 'Material Alquímico',
    icon: '🧪',
    title: 'Ingrediente para Pociones de Salud',
    description: 'Se usa en la tienda de la Bruja (El Sombrero de Madera) como ingrediente principal para elaborar Pociones de Salud I y Pociones de Salud II.',
    potions: ['Poción de salud I', 'Poción de salud II'],
  },
  'Gelatina Venenosa': {
    type: 'potion',
    badge: 'Material Alquímico',
    icon: '🧪',
    title: 'Ingrediente para Pociones de Salud',
    description: 'Se usa en el Sombrero de Madera para elaborar Pociones de Salud III y Pociones de Salud IV.',
    potions: ['Poción de salud III', 'Poción de salud IV'],
  },
  'Gelatina Flamígera': {
    type: 'potion',
    badge: 'Material Alquímico',
    icon: '🧪',
    title: 'Ingrediente para Pociones de Salud',
    description: 'Se usa en el Sombrero de Madera para elaborar Pociones de Salud V y Pociones de Salud VI.',
    potions: ['Poción de salud V', 'Poción de salud VI'],
  },
  'Gelatina Eléctrica': {
    type: 'potion',
    badge: 'Material Alquímico',
    icon: '🧪',
    title: 'Ingrediente para Pociones de Salud',
    description: 'Se usa en el Sombrero de Madera para elaborar Pociones de Salud VII, Pociones de Salud VIII e Hiper Pociones.',
    potions: ['Poción de salud VII', 'Poción de salud VIII', 'Hiper Poción'],
  },
  'Esfera de Agua': {
    type: 'potion',
    badge: 'Alquimia & Forja',
    icon: '🧪',
    title: 'Pociones Guía y Mapa del Gólem',
    description: 'Además de usarse para fabricar armaduras de tela, se emplea en el Sombrero de Madera para preparar Poción Guía del Gólem y Poción Mapa del Gólem.',
    potions: ['Poción Guía del Gólem', 'Poción Mapa del Gólem'],
  },
  'Fluido de Vida': {
    type: 'potion',
    badge: 'Material Alquímico',
    icon: '🧪',
    title: 'Pociones Guía y Mapa del Bosque',
    description: 'Líquido vital extraído del Bosque que la Bruja utiliza para destilar Poción Guía del Bosque y Poción Mapa del Bosque.',
    potions: ['Poción Guía del Bosque', 'Poción Mapa del Bosque'],
  },
  'Líquido inflamable': {
    type: 'potion',
    badge: 'Material Alquímico',
    icon: '🧪',
    title: 'Pociones Guía y Mapa del Desierto',
    description: 'Líquido altamente combustible del Desierto empleado para preparar Poción Guía del Desierto y Poción Mapa del Desierto.',
    potions: ['Poción Guía del Desierto', 'Poción Mapa del Desierto'],
  },
  'Botella de Argón': {
    type: 'potion',
    badge: 'Material Alquímico',
    icon: '🧪',
    title: 'Pociones Guía y Mapa Tecnológica',
    description: 'Gas noble comprimido de la Mazmorra Tecnológica requerido para preparar Poción Guía Tecnológica y Poción Mapa Tecnológica.',
    potions: ['Poción Guía del Tecnológica', 'Poción Mapa del Tecnológica'],
  },

  // === MATERIALES DE ENCANTAMIENTO (LA BRUJA ERIS) ===
  'Cristal de Poder': {
    type: 'enchantment',
    badge: 'Encantamiento',
    icon: '✨',
    title: 'Material Esencial de Encantamiento',
    description: '¡El componente primordial de la Bruja Eris! Se utiliza para ENCANTAR cualquier arma o armadura de las 4 mazmorras principales, aumentando de forma permanente su daño de ataque o defensa.',
  },
  'Cristal de Poder Lumínico': {
    type: 'enchantment',
    badge: 'Encantamiento Dimensional',
    icon: '✨',
    title: 'Encantamiento de Equipo DLC',
    description: 'Cristal de alta energía dimensional utilizado para realizar encantamientos de nivel superior en armas compuestas y armaduras del DLC Between Dimensions.',
  },

  // === DROPS EXCLUSIVOS DE JEFES FINALES (BOSS RELICS) ===
  'Cristal del Rey de los Golems': {
    type: 'boss',
    badge: '👑 Drop de Jefe Único',
    icon: '👑',
    title: 'Reliquia del Rey Gólem',
    description: 'Botín exclusivo obtenido únicamente al vencer al Rey Gólem (Jefe de la Mazmorra Gólem, Piso 3). Es un trofeo histórico irrepetible y un tesoro de altísimo precio en la tienda.',
  },
  'Semillas de Carnivorous Mutae': {
    type: 'boss',
    badge: '👑 Drop de Jefe Único',
    icon: '👑',
    title: 'Reliquia de Carnivorous Mutae',
    description: 'Botín exclusivo obtenido únicamente al derrotar a Carnivorous Mutae (Jefe de la Mazmorra Forestal, Piso 3). Tesoro botánico de inmenso valor comercial.',
  },
  'Gran Núcleo de Levitación': {
    type: 'boss',
    badge: '👑 Drop de Jefe Único',
    icon: '👑',
    title: 'Reliquia de Naja',
    description: 'Botín exclusivo obtenido tras vencer a la serpiente mecánica Naja (Jefe de la Mazmorra Desértica, Piso 3). Núcleo gravitacional legendario con un precio colosal en tienda.',
  },
  'Bola de Metal Reciclado': {
    type: 'boss',
    badge: '👑 Drop de Jefe Único',
    icon: '👑',
    title: 'Reliquia del Guardián Tecnológico',
    description: 'Botín exclusivo obtenido tras vencer al jefe de la Mazmorra Tecnológica (Piso 3). Artefacto tecnológico de máxima rareza.',
  },

  // === RELIQUIAS Y COLECCIONABLES DIMENSIONALES (DLC) ===
  'Volumen Antiguo Sagrado': {
    type: 'lore',
    badge: '🏛️ Reliquia Sagrada',
    icon: '📜',
    title: 'Tomo Sagrado Interdimensional',
    description: 'Reliquia arcana rescatada de dimensiones paralelas. No tiene receta de forja — es un objeto de colección de altísimo valor para vender en tienda.',
  },
  'Estatua Gólem': {
    type: 'lore',
    badge: '🏛️ Coleccionable Esculpido',
    icon: '🗿',
    title: 'Estatua Antigua de Gólem',
    description: 'Escultura ceremonial antigua de gran valor artístico e histórico. Objeto de colección para vender a coleccionistas por un alto precio.',
  },
  'Figura tallada del Bosque': {
    type: 'lore',
    badge: '🏛️ Coleccionable Esculpido',
    icon: '🪵',
    title: 'Talla Sagrada Forestal',
    description: 'Figura de madera tallada por antiguos moradores del bosque. Objeto coleccionable de alto valor comercial.',
  },
  'Ídolo Desértico de Lava': {
    type: 'lore',
    badge: '🏛️ Ídolo Sagrado',
    icon: '🔥',
    title: 'Ídolo de Lava Petrificada',
    description: 'Ídolo esculpido en roca volcánica y lava fría. Tesoro sagrado del desierto de gran cotización comercial.',
  },

  // === ARMAS ROTAS ===
  'Porra Rota': { type: 'broken', badge: 'Arma Rota', icon: '⚔️', description: 'Arma deteriorada encontrada en mazmorras. No se puede forjar ni reparar — véndela en tu tienda para obtener beneficio.' },
  'Mazo Roto': { type: 'broken', badge: 'Arma Rota', icon: '⚔️', description: 'Arma deteriorada encontrada en mazmorras. No se puede forjar ni reparar — véndela en tu tienda para obtener beneficio.' },
  'Honda Rota': { type: 'broken', badge: 'Arma Rota', icon: '⚔️', description: 'Arma deteriorada encontrada en mazmorras. No se puede forjar ni reparar — véndela en tu tienda para obtener beneficio.' },
  'Katana Rota': { type: 'broken', badge: 'Arma Rota', icon: '⚔️', description: 'Espada oriental rota recogida en mazmorras. Véndela a coleccionistas o aventureros en tu mostrador.' },
  'Estoque Roto': { type: 'broken', badge: 'Arma Rota', icon: '⚔️', description: 'Estoque dañado sin filo. Objeto comercial directo para vender a buen precio.' },
  'Ballesta Rota': { type: 'broken', badge: 'Arma Rota', icon: '⚔️', description: 'Mecanismo de ballesta estropeado. Véndelo en tu tienda para conseguir buen dinero.' },
  'Lucero Roto': { type: 'broken', badge: 'Arma Rota', icon: '⚔️', description: 'Maza de pinchos rota encontrada en incursiones. No se usa en forja — puro valor de venta.' },
  'Daga Rota': { type: 'broken', badge: 'Arma Rota', icon: '⚔️', description: 'Daga rota de alta calidad. Gran valor comercial para la tienda de Will.' },
  'Latigo Roto': { type: 'broken', badge: 'Arma Rota', icon: '⚔️', description: 'Látigo desgastado de gran rareza. Véndelo a clientes en la tienda al precio óptimo.' },
};

// Auto-detector for lore, books, notes, and jottings
export function getLoreInfo(itemName) {
  if (
    itemName.startsWith('Historia') ||
    itemName.startsWith('Apuntes') ||
    itemName.startsWith('Notas') ||
    itemName.startsWith('Diseño') ||
    itemName.startsWith('Tomo') ||
    itemName.includes('Anotaciones')
  ) {
    return {
      type: 'lore',
      badge: '📜 Lore & Historia',
      icon: '📜',
      title: 'Documento Histórico / Coleccionable',
      description: 'Documento histórico y notas de investigación del mundo de Moonlighter. No se utiliza en recetas de forja ni alquimia — puedes conservarlo como coleccionable o venderlo a coleccionistas a precio óptimo.',
    };
  }
  return null;
}

// Helper to determine complete usage profile for any item
export function getItemUsageProfile(item, usedIn, isEquip) {
  // 1. Check explicit special info (Potions, Enchantment, Boss, Relics, Broken Weapons)
  if (SPECIAL_INFO[item.es]) {
    return {
      hasCrafting: usedIn && usedIn.length > 0,
      craftingList: usedIn || [],
      special: SPECIAL_INFO[item.es],
    };
  }

  // 2. Check Lore / History books
  const lore = getLoreInfo(item.es);
  if (lore) {
    return {
      hasCrafting: false,
      craftingList: [],
      special: lore,
    };
  }

  // 3. Equipment (ready to use / sell)
  if (isEquip) {
    return {
      hasCrafting: false,
      craftingList: [],
      special: {
        type: 'equip',
        badge: '⚔️ Equipo Listo',
        icon: '🛡️',
        title: 'Equipo Equipable',
        description: 'Arma o armadura lista para equipar en tus incursiones a las mazmorras o vender en el mostrador a otros héroes y aventureros.',
      },
    };
  }

  // 4. Crafting materials (weapons / armor)
  if (usedIn && usedIn.length > 0) {
    return {
      hasCrafting: true,
      craftingList: usedIn,
      special: {
        type: 'crafting',
        badge: '🔨 Material de Forja',
        icon: '🔨',
        title: 'Se usa para forjar equipo',
        description: 'Material necesario para que Vulcano (la Forja) fabrique armas y armaduras:',
      },
    };
  }

  // 5. Potions themselves
  if (item.cat === 'Cultura Mercader' && (item.es.includes('Poción') || item.es.includes('Pocion'))) {
    return {
      hasCrafting: false,
      craftingList: [],
      special: {
        type: 'consumable',
        badge: '🧪 Consumible',
        icon: '🧪',
        title: 'Poción Alquímica',
        description: 'Brebaje alquímico consumible para recuperar vida o explorar mazmorras. Puedes llevarlo en tu inventario o venderlo a buen precio a los aventureros del pueblo.',
      },
    };
  }

  // 6. Pure commercial treasures / sell-only items
  return {
    hasCrafting: false,
    craftingList: [],
    special: {
      type: 'sell_only',
      badge: '💰 Tesoro Comercial',
      icon: '💎',
      title: 'Objeto de Venta Directa',
      description: '¡100% seguro para vender! No se requiere para fabricar equipo en la Forja ni preparar pociones en el Sombrero de Madera. Su propósito principal es venderlo en tu tienda al precio óptimo.',
    },
  };
}
