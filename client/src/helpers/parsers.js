/**
 *
 * all avilable subject types
 * 1 - lecture
 * 2 - practice
 *
 * @param {number} type
 */
const parseSubjectTypes = (type) => {
  const numbericalType = typeof type === 'string' ? Number(type) : type;

  switch (numbericalType) {
    case 1:
      return 'app.words.lecture';
    case 2:
      return 'app.words.practice';
    default: return false;
  }
};

/**
 * all avilable week types
 * 1 - odd
 * 2 - even
 *
 * @param {number} type
 */
const parseWeekTypes = (type) => {
  const numbericalType = typeof type === 'string' ? Number(type) : type;

  switch (numbericalType) {
    case 1:
      return 'app.words.odd';
    case 2:
      return 'app.words.even';
    default: return false;
  }
};

const parsers = {
  parseSubjectTypes,
  parseWeekTypes,
};

export default parsers;
