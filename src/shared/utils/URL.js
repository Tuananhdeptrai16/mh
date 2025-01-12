/* eslint-disable no-useless-escape */
const imageExtensions = [
  'gif',
  'ico',
  'jpeg',
  'jpg',
  'raw',
  'ai',
  'svg',
  'sxd',
  'png',
  'rgb',
  'rgba',
];
const videoExtensions = ['mp4', 'flv', 'avi', 'm4v', '3gp', 'mov', 'wmv'];

const isURL = (text) => {
  if (text) {
    try {
      const urlReg =
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,10}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/g;

      const links = text
        .trim()
        .replace(String.fromCharCode(160), '\n')
        .match(urlReg);
      return !!links;
    } catch (e) {
      return false;
    }
  }
  return false;
};

const isImageURL = (url) => {
  if (!url) return false;
  try {
    if (!isURL(url)) return false;
    return imageExtensions.some((ext) => url?.includes(`.${ext}`));
  } catch (e) {
    return false;
  }
};

const isVideoURL = (url) => {
  if (!url) return false;
  try {
    if (!isURL(url)) return false;
    return videoExtensions.some((ext) => url?.includes(`.${ext}`));
  } catch (e) {
    return false;
  }
};

const isYoutubeURL = (url) => {
  if (url) {
    return url.indexOf('youtube.com') !== -1 || url.indexOf('youtu.be') !== -1;
  }
  return false;
};

const isFacebookURL = (url) => {
  console.log('url', url);
  if (url) {
    return url.indexOf('facebook.com') !== -1;
  }
  return false;
};

const isTiktokURL = (url) => {
  if (url) {
    return url.indexOf('tiktok.com') !== -1;
  }
  return false;
};

const isPDFURL = (url) => {
  if (!url) return false;
  try {
    if (!isURL(url)) return false;
    return url.includes('.pdf');
  } catch (e) {
    return false;
  }
};

function isBase64(data) {
  try {
    return /^data:((?:\w+\/(?:(?!;).)+)?)((?:;[\w\W]*?[^;])*),(.+)|^,[a-zA-Z0-9/+]*$/.test(
      data,
    );
  } catch (e) {
    return false;
  }
}

export {
  isBase64,
  isURL,
  isImageURL,
  isYoutubeURL,
  isFacebookURL,
  isVideoURL,
  isTiktokURL,
  isPDFURL,
};
