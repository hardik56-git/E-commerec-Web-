import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'hardik-001',
    nameEn: 'Kyoto Silk Kimono Trench Coat',
    nameJa: '京都絹 伝統織着物トレンチコート',
    category: 'apparel',
    priceJpy: 185000,
    rating: 4.9,
    reviewsCount: 28,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    descriptionEn: 'Hand-woven raw silk trench coat crafted in historic Nishijin, Kyoto. Features subtle jacquard dragon motifs and a relaxed contemporary silhouette.',
    descriptionJa: '京都西陣で手織りされた生絹のトレンチコート。控えめなジャカード龍文様と現代的なリラックスシルエットが特徴です。',
    detailsEn: [
      '100% Nishijin Raw Silk',
      'Hand-finished horn buttons',
      'Water-repellent organic silk coating',
      'Crafted in Kyoto, Japan'
    ],
    detailsJa: [
      '100% 西陣手織り生絹',
      '手仕上げの本水牛ボタン',
      '撥水加工オーガニックシルクコーティング',
      '京都・日本にて制作'
    ],
    inStock: true,
    isNew: true,
    isFeatured: true,
    materialEn: 'Nishijin Raw Silk',
    materialJa: '西陣手織り生絹',
    originEn: 'Kyoto, Japan',
    originJa: '京都府京都市'
  },
  {
    id: 'hardik-002',
    nameEn: 'Ginza Artisan Chronograph 40mm',
    nameJa: '銀座 職人手巻クロノグラフ 40mm',
    category: 'timepieces',
    priceJpy: 420000,
    rating: 5.0,
    reviewsCount: 14,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop',
    descriptionEn: 'Precision hand-wound mechanical chronograph with a hand-lacquered Urushi copper dial and sapphire crystal case back.',
    descriptionJa: '本漆塗りの銅文字盤とサファイアクリスタル裏蓋を備えた精密手巻きメカニカルクロノグラフ。',
    detailsEn: [
      'Automatic Caliber HK-802 (72-hour reserve)',
      'Hand-applied Japanese Urushi Lacquer Dial',
      'Saddle-stitched Tochigi leather strap',
      '50m Water Resistance'
    ],
    detailsJa: [
      '自動巻き キャリバー HK-802（72時間パワーリザーブ）',
      '本手塗り和漆ダイヤル',
      '栃木レザー製鞍縫いストラップ',
      '50m日常強化防水'
    ],
    inStock: true,
    isNew: true,
    isFeatured: true,
    materialEn: '316L Stainless Steel & Urushi',
    materialJa: '316Lステンレススチール & 本漆',
    originEn: 'Tokyo Ginza, Japan',
    originJa: '東京都中央区銀座'
  },
  {
    id: 'hardik-003',
    nameEn: 'Tochigi Saddle Leather Executive Tote',
    nameJa: '栃木サドルレザー エグゼクティブ トート',
    category: 'leather',
    priceJpy: 128000,
    rating: 4.8,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop',
    descriptionEn: 'Full-grain vegetable-tanned Tochigi leather tote bag. Develops a rich deep patina with years of burnished usage.',
    descriptionJa: 'フルグレインベジタブルタンニン鞣しの栃木レザートートバッグ。年月を重ねるごとに味わい深いエイジングを楽しめます。',
    detailsEn: [
      '100% Genuine Tochigi Tanner Leather',
      'Fits up to 16-inch MacBook Pro',
      'Solid brushed brass hardware',
      'Suede interior lining'
    ],
    detailsJa: [
      '100% 栃木レザー社製植物タンニン鞣し革',
      '16インチMacBook Pro収納可能',
      'ソリッドブラス（真鍮）金具',
      'スエードインナーライニング'
    ],
    inStock: true,
    isNew: false,
    isFeatured: true,
    materialEn: 'Tochigi Vegetable Leather',
    materialJa: '栃木レザー（植物タンニン鞣し革）',
    originEn: 'Tochigi, Japan',
    originJa: '栃木県栃木市'
  },
  {
    id: 'hardik-004',
    nameEn: 'Kanazawa 24K Gold Leaf Ceremony Tea Set',
    nameJa: '金沢 24K金箔 抹茶茶器一式',
    category: 'ceremony',
    priceJpy: 98000,
    rating: 4.9,
    reviewsCount: 19,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1000&auto=format&fit=crop',
    descriptionEn: 'Authentic ceremonial tea set adorned with genuine 24-karat gold leaf gilding from Kanazawa, accompanied by a bamboo whisk.',
    descriptionJa: '加賀金沢の本24K金箔を施した漆黒の茶器揃え。特製竹茶筅と茶杓が付属した至高の逸品。',
    detailsEn: [
      'Hand-blown heat-resistant ceramic',
      '24K Pure Gold Leaf gilding from Kanazawa',
      'Includes Takayama bamboo whisk (Chasen)',
      'Paulownia wooden display box'
    ],
    detailsJa: [
      '手吹き耐熱磁器器',
      '金沢産 24K純金箔手貼り仕上げ',
      '奈良高山産 竹茶筅・茶杓付属',
      '高級桐箱入り'
    ],
    inStock: true,
    isNew: false,
    isFeatured: true,
    materialEn: 'Black Ceramic & 24K Gold Leaf',
    materialJa: '黒磁器 & 24金純金箔',
    originEn: 'Kanazawa, Ishikawa',
    originJa: '石川県金沢市'
  },
  {
    id: 'hardik-005',
    nameEn: 'Asakura Minimalist Solid Oak Dining Chair',
    nameJa: '朝倉 無垢オーク材 ミニマルチェア',
    category: 'interior',
    priceJpy: 78000,
    rating: 4.7,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1000&auto=format&fit=crop',
    descriptionEn: 'Sculptural dining chair constructed using traditional mortise-and-tenon Japanese joinery without nails or screws.',
    descriptionJa: '釘や螺子を一切使用せず、日本の伝統的な木組技術「蟻組」で組み上げられた美しい無垢オーク材チェア。',
    detailsEn: [
      '100% Japanese Hokkaido White Oak',
      'Natural organic oil wax coat',
      'Ergonomic curved backrest',
      'Lifetime structural warranty'
    ],
    detailsJa: [
      '100% 北海道産ナラ無垢材',
      '天然オーガニックオイルワックス仕上げ',
      '人間工学に基づいた曲線背もたれ',
      '構造永久保証'
    ],
    inStock: true,
    isNew: true,
    isFeatured: false,
    materialEn: 'Hokkaido White Oak',
    materialJa: '北海道産ナラ無垢材',
    originEn: 'Asahikawa, Hokkaido',
    originJa: '北海道旭川市'
  },
  {
    id: 'hardik-006',
    nameEn: 'Mino Ware Hand-Carved Ceramic Pitcher',
    nameJa: '美濃焼 手彫りセラミックピッチャー',
    category: 'interior',
    priceJpy: 34000,
    rating: 4.8,
    reviewsCount: 16,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1000&auto=format&fit=crop',
    descriptionEn: 'Hand-carved water pitcher fired in ancient Mino kilns. Features matte tactile texture and flawless balance.',
    descriptionJa: '美濃の老舗窯元で焼成された手削りの水差し。マットで温かみのある手触りと洗練されたフォルム。',
    detailsEn: [
      'High-fired stoneware clay',
      'Matte natural mineral glaze',
      'Capacity: 1200ml',
      'Dishwasher safe'
    ],
    detailsJa: [
      '高温焼成 陶器',
      'マット天然鉱物釉薬',
      '容量：1200ml',
      '食洗機対応'
    ],
    inStock: true,
    isNew: false,
    isFeatured: false,
    materialEn: 'Mino Clay & Mineral Glaze',
    materialJa: '美濃土 & 天然鉱物釉',
    originEn: 'Gifu Mino, Japan',
    originJa: '岐阜県美濃市'
  },
  {
    id: 'hardik-007',
    nameEn: 'Sensu Bamboo & Silk Hand Fan (Black Ink)',
    nameJa: '墨黒 伝統竹＆京絹 扇子',
    category: 'ceremony',
    priceJpy: 26000,
    rating: 4.9,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1000&auto=format&fit=crop',
    descriptionEn: 'Traditional folding hand fan with aged Kyoto smoked bamboo ribs and sumi-e ink hand-painted silk.',
    descriptionJa: '京都の燻製煤竹の骨組と、手描き墨絵の京絹を用いた伝統的な最高級扇子。',
    detailsEn: [
      '45-rib smoked Kyoto bamboo',
      'Hand-painted Sumi ink on pure silk',
      'Includes handcrafted silk pouch',
      'Scented with natural sandalwood'
    ],
    detailsJa: [
      '45本骨 京都産燻製煤竹',
      '純絹上への手描き墨絵',
      '手縫い絹製ケース付属',
      '天然白檀（サンダルウッド）芳香仕上げ'
    ],
    inStock: true,
    isNew: false,
    isFeatured: false,
    materialEn: 'Kyoto Bamboo & Silk',
    materialJa: '京都産煤竹 & 純絹',
    originEn: 'Kyoto, Japan',
    originJa: '京都府京都市'
  },
  {
    id: 'hardik-008',
    nameEn: 'Yamanashi Obsidian Fountain Pen 18K',
    nameJa: '山梨 黒曜石 万年筆 18K金ペン先',
    category: 'leather',
    priceJpy: 165000,
    rating: 5.0,
    reviewsCount: 11,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1000&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1585336261026-8f5786372960?q=80&w=1000&auto=format&fit=crop',
    descriptionEn: 'Fountain pen crafted from natural polished Mt. Fuji obsidian stone with a custom engraved 18K solid gold nib.',
    descriptionJa: '富士山麓の天然黒曜石を手作業で研磨した軸筒に、18金手彫りペン先を配したプレミアム万年筆。',
    detailsEn: [
      'Natural polished Obsidian stone barrel',
      '18K Solid Gold medium nib',
      'Piston fill mechanism',
      'Handmade paulownia wood presentation box'
    ],
    detailsJa: [
      '天然磨き黒曜石ボディ',
      '18金純金製中字ペン先',
      'ピストン吸入式構造',
      '職人仕上げ桐箱入り'
    ],
    inStock: true,
    isNew: true,
    isFeatured: true,
    materialEn: 'Obsidian Stone & 18K Gold',
    materialJa: '天然黒曜石 & 18K純金',
    originEn: 'Yamanashi, Japan',
    originJa: '山梨県甲府市'
  }
];
