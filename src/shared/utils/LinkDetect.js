/* eslint-disable */
const isUrl = (text) => {
  if (text) {
    try {
      const urlReg =
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,10}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

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
const isUrlEmbed = (url) => {
  const exp = '/embed.html';

  if (!url || !isUrl(url)) {
    return false;
  }

  return url?.includes(exp);
};
const getURLEmbed = (urlStr = '') => {
  try {
    const url = new URL(urlStr);
    const searchParams = url.searchParams;
    return decodeURIComponent(searchParams.get('url'));
  } catch (e) {
    console.log(e);
  }
  return false;
};

const generateFacebookUrlFromId = (id) => {
  return `https://www.facebook.com/facebook/videos/${id}`;
};
export const getFacebookUrl = (url) => {
  const regExpValidFacebook = /facebook\.com\/facebook\/videos\/([0-9]*)/;
  if (regExpValidFacebook.test(url)) {
    return url;
  }
  const regExpVideo =
    /(?:https?:\/\/)?(?:www.|web.|m.)?(facebook|fb).(com|watch)\/(?:video.php\?v=\d+|(\S+)|p\?v=\d+|\?v=\d+)|\S+\/videos\/((\S+)\/(\d+)|(\d+))\/?/;
  if (regExpVideo.test(url)) {
    const videoId = new URL(url).searchParams.get('v');
    if (videoId) {
      return generateFacebookUrlFromId(videoId);
    }
    const regExpFacebookVideo =
      /^(https?:\/\/www.facebook.com\/.*?\/videos\/([0-9]*))/;
    const match = url.match(regExpFacebookVideo);
    if (match) {
      const id = match?.[2];
      if (!id) {
        return url;
      }
      return generateFacebookUrlFromId(id);
    }
  }
  const videoId = new URL(url).searchParams.get('video_id');
  if (!videoId) {
    return false;
  }
  return generateFacebookUrlFromId(videoId);
};

export const youtubeUrlDetect = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11
    ? `https://youtube.com/embed/${match[7]}?showinfo=0`
    : false;
};

export const facebookUrlDetect = (url) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  try {
    let urlCheck = decodeURIComponent(url);

    if (isUrlEmbed(url)) {
      urlCheck = getURLEmbed(urlCheck);
    }

    const urlVideo = getFacebookUrl(urlCheck);
    if (urlVideo) {
      return urlVideo;
    }
    return false;
  } catch (e) {
    return false;
  }
};
export const checkUrlInDomain = (
  url,
  hostNameCheck = window.location.hostname,
) => {
  try {
    const urlObject = new URL(url);
    const hostName = urlObject.hostname;

    return (
      hostName.lastIndexOf(hostNameCheck) !== -1 &&
      hostName.lastIndexOf(hostNameCheck) ===
        hostName.length - hostNameCheck.length
    );
  } catch (e) {
    return true;
  }
};

export const genUrlDetector = (url, { userId = '' } = {}) => {
  try {
    if (checkUrlInDomain(url)) {
      return url;
    }

    const origin = window.location.origin;
    const urlDefault = `${origin}/page-not-found`;
    return `https://login.noron.vn/url-detector?url=${encodeURIComponent(
      url,
    )}&default_url=${encodeURIComponent(urlDefault)}${
      userId ? `&user_id=${userId}` : ''
    }`;
  } catch (e) {
    return url;
  }
};
