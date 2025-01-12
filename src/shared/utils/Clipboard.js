// NOTE: SOMETHING IS MAGIC HERE....

export const copyStringToClipboard = (string) => {
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    // save current contentEditable/readOnly status
    let el = document.createElement('textarea');
    el.value = string;
    el.setAttribute('readonly', '');
    document.body.appendChild(el);

    let editable = el.contentEditable;
    let readOnly = el.readOnly;

    // convert to editable with readonly to stop iOS keyboard opening
    el.contentEditable = true;
    el.readOnly = true;

    // create a selectable range
    let range = document.createRange();
    range.selectNodeContents(el);

    // select the range
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    el.setSelectionRange(0, 999999);

    // restore contentEditable/readOnly to original state
    el.contentEditable = editable;
    el.readOnly = readOnly;
    document.execCommand('copy');
    document.body.removeChild(el);
  } else {
    // Create new element
    let element = document.createElement('textarea');
    // Set value (string to be copied)
    element.value = string;
    // Set non-editable to avoid focus and move outside of view
    element.setAttribute('readonly', 'false');
    element.setAttribute('contenteditable', 'true');
    element.style = { display: 'none' };
    document.body.appendChild(element);
    // Select text inside element
    element.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(element);
  }
};
