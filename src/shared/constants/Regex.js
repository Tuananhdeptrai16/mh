/*
  #1: element-img
  #2: contribute after
  #3: href path
  #4: character _
  #5: size
  #6: character .
  #7 extension
  #8: character ?
  #9: params
  #10: contribute before
 */
export const IMAGE_REGEX =
  /(<img ([^>]* )?src=["']([^"'_]*\/)([^"'_.]*)(_?)([^"'.]*)(\.?)([^"'?]*)(\??)([^"']*)["']([^>]*)?>)/gi;
export const URL_IMAGE_REGEX =
  /([.|\w|\s|-])*\.(?:jpg|jpeg|png|gif|webp|psd|raw)/i;
export const URL_VIDEO_REGEX = /([.\w\s-])*\.(?:mp4|m4p|m4v|3gp|avi|webm|mov)/i;
export const URL_FILE_REGEX =
  /([.\w\s-])*\.(?:pdf|doc|docx|xsl|xslx|txt|zip|rar)/i;
export const HTML_TAG_REGEX_NOT_VALID = /[^a-zA-Z0-9]/gi;
export const URL_REGEX = /^(https|http)/i;
export const URL_JDBC_REGEX =
  /((http|https):\/\/)(www\.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)/;

export const REGEX_POST_DETAIL = /^\/post\/([a-zA-Z0-9-]*)$/i;
export const REGEX_LIVESTREAM_DETAIL = /^\/livestream\/([a-zA-Z0-9-]*)$/i;
export const URL_REGEX_PARSE = /^(http[s]?:\/\/)?([^#?/]*)([^#?]*)(.*)$/i;
export const REGEX_PROFILE_FACEBOOK =
  /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-.]*)?/i;
export const REGEX_URL_ABSOLUTE = /^(\.\.|\.|\/)/gi;

export const REGEX_HASH_TAG = /[$,:;=?|'<>.^*()%!-"[\]\\/}{~`]/g;

export const NUMBER_REGEX =
  /^\$?-?([1-9]{1}[0-9]{0,2}(,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^-?\$?([1-9]{1}\d{0,2}(,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\(\$?([1-9]{1}\d{0,2}(,{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))\)$/;

export const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const USER_NAME_REGEX = /^[A-Za-z][A-Za-z0-9_.@]{0,}[A-Za-z0-9]$/;

export const DIGIT_REGEX = /^\s*\d+\s*$/;

export const URL_AUDIO_REGEX =
  /(http(s?):)(.)*\.(?:mp3|wma|wav|flac|aac|ogg|aif)/i;
export const PASSWORD_REGEX = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]){6,32}/;
export const IP_REGEX =
  /^((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])|\*)\.){3}(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])|\*)$/;
export const PERMISSION_REGEX = /^[^&|]*$/;
export const PHONE_REGEX = /^((0|84|\+84)\d{9})$/;

export const CCCD_NUMBER_REGREX = /^.{9,12}$/;
export const BRAND_NAME_EXIST_CHARACTER_REGEX = /[a-zA-Z]/;
export const BRAND_NAME_CHARACTER_APPROVE_REGEX = /[a-zA-Z0-9\-\s._]*/;
export const DECIMAL_TYPING = /^-?[\d]*\.?\d{0,2}$/;
export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z\-0-9]+)+\.*[a-zA-Z\-0-9]{0,}){1,}([a-zA-Z])$/;
export const IP_WITH_SUBNET_REGEX =
  /^((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\.){3}(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\/(([1-9]|[1-2][0-9]|3[0-2]))$/;
export const UNIT_HTML_REGEX = /([0-9]*)(px|em|%)/im;
export const YEAR_REGEX = /^\d{4}$/;
export const htmlRegexG =
  /<\/?(div|a|span|h1|h2|h3|h4|h5|h6|li|ul|ol|p|br|b|img|strong|i|em).*?>/gi;

export const JSON_PATTERN =
  /[{\\[]([,:{}[\]0-9.\-+Eaeflnr-u \n\r\t]|".*?")+[}\]]/;

export const POSITIVE_NUMBER = /^[1-9]\d*$/;
export const CHECK_ACCENTED_CHARACTERS = /[\u0080-\uFFFF]/;
export const UPPERCASE_CHARACTERS = /[A-Z]/;
export const TRIM_SPACE = /\s/;
export const SPECIAL_CHARACTERS = /[!@#$%^&*(),.?":{}|<>]/;
export const CHECK_BEGIN_WITH_NUMBER = /^\d.*/;

export const CHECK_SLASH = /^(?!.*\/).+$/;

export const CHECK_CRON =
  /^\s*((((\d+,)+\d+|(\d+(\/|-|#)\d+)|\d+L?|\*(\/\d+)?|L(-\d+)?|\?|[A-Z]{3}(-[A-Z]{3})?) ?){5,7})$|(@(annually|yearly|monthly|weekly|daily|hourly|reboot))|(@every (\d+(ns|us|µs|ms|s|m|h))+)\s*$/;
