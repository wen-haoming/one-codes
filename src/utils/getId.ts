export const getId = () => Math.floor(Math.random() * 100000).toString(16);


export const getAttributeNode = (
  ele: HTMLElement | null,
  attribute: string,
): HTMLElement | null => {
  if (!ele) return null;
  while (
    ele!.getAttribute &&
    !ele!.getAttribute(attribute) &&
    ele !== document.body
  ) {
    // eslint-disable-next-line no-param-reassign
    ele = ele!.parentNode as any;
  }
  if (ele === document.body) {
    return null;
  }
  return ele;
};
