// 工具函数：将本地图片路径转换为在线 URL
// 使用 GitHub 上的开源塔罗牌图片资源

const cardNameMapping = {
  // Major Arcana
  'the_fool': 'fool',
  'the_magician': 'magician',
  'the_high_priestess': 'high-priestess',
  'the_empress': 'empress',
  'the_emperor': 'emperor',
  'the_hierophant': 'hierophant',
  'the_lovers': 'lovers',
  'the_chariot': 'chariot',
  'strength': 'strength',
  'the_hermit': 'hermit',
  'wheel_of_fortune': 'wheel-of-fortune',
  'justice': 'justice',
  'the_hanged_man': 'hanged-man',
  'death': 'death',
  'temperance': 'temperance',
  'the_devil': 'devil',
  'the_tower': 'tower',
  'the_star': 'star',
  'the_moon': 'moon',
  'the_sun': 'sun',
  'judgement': 'judgement',
  'the_world': 'world',
  
  // Minor Arcana - Cups
  'ace_of_cups': 'cups-ace',
  'two_of_cups': 'cups-2',
  'three_of_cups': 'cups-3',
  'four_of_cups': 'cups-4',
  'five_of_cups': 'cups-5',
  'six_of_cups': 'cups-6',
  'seven_of_cups': 'cups-7',
  'eight_of_cups': 'cups-8',
  'nine_of_cups': 'cups-9',
  'ten_of_cups': 'cups-10',
  'page_of_cups': 'cups-page',
  'knight_of_cups': 'cups-knight',
  'queen_of_cups': 'cups-queen',
  'king_of_cups': 'cups-king',
  
  // Minor Arcana - Wands
  'ace_of_wands': 'wands-ace',
  'two_of_wands': 'wands-2',
  'three_of_wands': 'wands-3',
  'four_of_wands': 'wands-4',
  'five_of_wands': 'wands-5',
  'six_of_wands': 'wands-6',
  'seven_of_wands': 'wands-7',
  'eight_of_wands': 'wands-8',
  'nine_of_wands': 'wands-9',
  'ten_of_wands': 'wands-10',
  'page_of_wands': 'wands-page',
  'knight_of_wands': 'wands-knight',
  'queen_of_wands': 'wands-queen',
  'king_of_wands': 'wands-king',
  
  // Minor Arcana - Swords
  'ace_of_swords': 'swords-ace',
  'two_of_swords': 'swords-2',
  'three_of_swords': 'swords-3',
  'four_of_swords': 'swords-4',
  'five_of_swords': 'swords-5',
  'six_of_swords': 'swords-6',
  'seven_of_swords': 'swords-7',
  'eight_of_swords': 'swords-8',
  'nine_of_swords': 'swords-9',
  'ten_of_swords': 'swords-10',
  'page_of_swords': 'swords-page',
  'knight_of_swords': 'swords-knight',
  'queen_of_swords': 'swords-queen',
  'king_of_swords': 'swords-king',
  
  // Minor Arcana - Pentacles
  'ace_of_pentacles': 'pentacles-ace',
  'two_of_pentacles': 'pentacles-2',
  'three_of_pentacles': 'pentacles-3',
  'four_of_pentacles': 'pentacles-4',
  'five_of_pentacles': 'pentacles-5',
  'six_of_pentacles': 'pentacles-6',
  'seven_of_pentacles': 'pentacles-7',
  'eight_of_pentacles': 'pentacles-8',
  'nine_of_pentacles': 'pentacles-9',
  'ten_of_pentacles': 'pentacles-10',
  'page_of_pentacles': 'pentacles-page',
  'knight_of_pentacles': 'pentacles-knight',
  'queen_of_pentacles': 'pentacles-queen',
  'king_of_pentacles': 'pentacles-king',
};

// 使用多个备选图片源，按优先级排序
const IMAGE_SOURCES = [
  'https://raw.githubusercontent.com/ekelen/tarot-api/main/images/rider-waite',
  'https://www.tarot.com/images/cards/rider-waite',
  'https://images.unsplash.com/photo', // 备用占位符
];

export function getTarotImageUrl(imageUrl) {
  // 如果已经是完整的 URL，直接返回
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // 优先使用本地图片（public/assets 目录）
  // 图片应该放在 public/assets 目录下，可以通过 /assets/ 路径访问
  return `/assets/${imageUrl}`;
}
