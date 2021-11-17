function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}

function blackOrWhite(hex) {
    var rgb = hexToRgb(hex);
    rgb.r = rgb.r / 255.0;
    if (rgb.r <= 0.03928) rgb.r = rgb.r / 12.92;
    else rgb.r = Math.pow((rgb.r + 0.055) / 1.055, 2.4);
    rgb.g = rgb.g / 255.0;
    if (rgb.g <= 0.03928) rgb.g = rgb.g / 12.92;
    else rgb.g = Math.pow((rgb.g + 0.055) / 1.055, 2.4);
    rgb.b = rgb.b / 255.0;
    if (rgb.b <= 0.03928) rgb.b = rgb.b / 12.92;
    else rgb.b = Math.pow((rgb.b + 0.055) / 1.055, 2.4);
    let L = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
    return L > Math.sqrt(1.05 * 0.05) - 0.05 ? '#000000' : '#ffffff';
}

export default blackOrWhite;