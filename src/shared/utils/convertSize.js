export const convertSize = (sizeInBytes) => {
  const KB = 1024;
  const MB = KB * KB;
  const GB = MB * KB;
  const TB = GB * KB;

  if (sizeInBytes < KB) {
    return sizeInBytes + ' Bytes';
  } else if (sizeInBytes < MB) {
    return (sizeInBytes / KB).toFixed(2) + ' KB';
  } else if (sizeInBytes < GB) {
    return (sizeInBytes / MB).toFixed(2) + ' MB';
  } else if (sizeInBytes < TB) {
    return (sizeInBytes / GB).toFixed(2) + ' GB';
  } else {
    return (sizeInBytes / TB).toFixed(2) + ' TB';
  }
};
