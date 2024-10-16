export const create = styles => styles;

// Like StyleSheet.compose, but concatenates shared keys' values into arrays.
export const compose = (style1, style2) => {
  const res = { ...style1 };
  if (!style1) {
    return style2;
  }
  if (!style2) {
    return style1;
  }
  for (const [k, v] of Object.entries(style2)) {
    let resV = res[k];
    if (resV === undefined) {
      res[k] = v;
    } else if (Array.isArray(resV) && Array.isArray(v)) {
      res[k] = resV.concat(v);
    } else if (Array.isArray(resV)) {
      res[k] = resV.concat([v]);
    } else if (Array.isArray(v)) {
      res[k] = [resV].concat(v);
    } else {
      res[k] = [resV, v];
    }
  }
  return res;
};

export const getWidthValue = (v, width, isValid) => {
  let resV;
  // If there is an array of values, choose the last one with the largest minWidth
  // which fits in the current screen width
  if (Array.isArray(v)) {
    let maxMinWidth = 0;
    v.forEach(innerV => {
      const minWidth = innerV?.minWidth ?? 0;
      const value = innerV?.value ?? innerV;
      if (
        (!isValid || isValid(value)) &&
        minWidth <= width &&
        minWidth >= maxMinWidth
      ) {
        resV = value;
        maxMinWidth = minWidth;
      }
    });
    // Otherwise, check if the value fits in the current screen width
  } else {
    const minWidth = v?.minWidth ?? 0;
    const value = v?.value ?? v;
    if ((!isValid || isValid(value)) && minWidth <= width) {
      resV = value;
    }
  }

  return resV;
};

// Given a window width, convert a the style to a StyleSheet style, using values from
// the highest and most recent minWidth for each style key, which fits within the minWidth.
//
// Also filters to output specific style keys based on the 'styleKeys' argument. Returns all if undefined
export const applyWidth = (style, width, styleKeys) => {
  const res = {};
  if (!style) {
    return {};
  }
  for (const [k, v] of Object.entries(style)) {
    if (Array.isArray(styleKeys) && !styleKeys.includes(k)) {
      continue;
    }
    res[k] = getWidthValue(
      v,
      width,
      value =>
        value == null ||
        (value !== '' && ['string', 'number'].includes(typeof value))
    );
  }
  return res;
};
