/**
 * HaGuide PSD heat map helper function package.
 * @module widgets/charts/areaCharts/heatmap/HeatmapHelper
 */

/** 1mm = 27 pixel. */
export const MM_IN_PIXELS_SCALE = 27;

export const HEATMAP_COLORS = [
  [92, 14, 10],
  [117, 9, 9],
  [133, 2, 7],
  [145, 0, 5],
  [150, 0, 2],
  [148, 2, 2],
  [148, 4, 3],
  [150, 6, 5],
  [152, 6, 6],
  [159, 5, 7],
  [164, 3, 8],
  [175, 4, 13],
  [178, 2, 15],
  [180, 2, 14],
  [183, 3, 15],
  [185, 3, 15],
  [189, 3, 14],
  [193, 3, 13],
  [196, 2, 13],
  [199, 2, 12],
  [203, 2, 12],
  [206, 0, 10],
  [210, 0, 11],
  [212, 1, 10],
  [216, 0, 11],
  [218, 1, 10],
  [219, 2, 10],
  [220, 6, 8],
  [222, 6, 7],
  [227, 7, 7],
  [232, 8, 9],
  [237, 9, 10],
  [241, 8, 11],
  [246, 7, 10],
  [247, 7, 8],
  [250, 8, 7],
  [250, 8, 7],
  [249, 10, 7],
  [250, 11, 6],
  [251, 14, 6],
  [251, 19, 9],
  [252, 21, 11],
  [248, 24, 12],
  [243, 32, 13],
  [241, 37, 13],
  [240, 39, 13],
  [242, 41, 13],
  [243, 46, 14],
  [246, 52, 16],
  [244, 55, 13],
  [242, 56, 9],
  [238, 57, 4],
  [240, 64, 5],
  [242, 68, 7],
  [240, 68, 2],
  [240, 71, 2],
  [243, 76, 5],
  [243, 80, 5],
  [240, 79, 1],
  [242, 85, 4],
  [248, 93, 10],
  [244, 92, 6],
  [250, 101, 11],
  [250, 103, 10],
  [244, 101, 5],
  [248, 109, 8],
  [243, 108, 3],
  [250, 120, 10],
  [248, 123, 7],
  [248, 125, 6],
  [245, 127, 3],
  [245, 130, 3],
  [245, 134, 3],
  [247, 138, 7],
  [250, 142, 8],
  [251, 145, 9],
  [251, 145, 9],
  [251, 148, 9],
  [254, 153, 11],
  [254, 155, 10],
  [251, 157, 9],
  [250, 161, 9],
  [250, 165, 10],
  [249, 171, 11],
  [247, 174, 9],
  [248, 177, 9],
  [247, 181, 9],
  [248, 185, 10],
  [249, 189, 13],
  [249, 192, 14],
  [249, 194, 15],
  [251, 203, 19],
  [251, 207, 20],
  [251, 210, 22],
  [252, 213, 22],
  [254, 218, 22],
  [255, 222, 23],
  [254, 226, 21],
  [251, 226, 19],
  [247, 226, 13],
  [246, 230, 12],
  [248, 236, 12],
  [248, 241, 13],
  [249, 245, 14],
  [250, 248, 15],
  [252, 252, 16],
  [253, 253, 15],
  [252, 253, 11],
  [249, 253, 10],
  [248, 253, 13],
  [245, 252, 14],
  [240, 252, 18],
  [236, 252, 23],
  [232, 253, 28],
  [227, 253, 34],
  [222, 253, 38],
  [218, 253, 45],
  [213, 255, 51],
  [208, 255, 55],
  [205, 255, 59],
  [203, 254, 61],
  [202, 254, 65],
  [199, 254, 65],
  [197, 254, 64],
  [195, 254, 66],
  [193, 253, 69],
  [188, 251, 72],
  [184, 250, 78],
  [181, 250, 82],
  [175, 250, 89],
  [172, 249, 95],
  [167, 250, 100],
  [162, 250, 104],
  [159, 251, 108],
  [157, 251, 111],
  [153, 251, 112],
  [151, 252, 112],
  [149, 251, 113],
  [146, 252, 118],
  [142, 251, 126],
  [137, 250, 132],
  [132, 251, 133],
  [127, 252, 134],
  [121, 254, 139],
  [117, 255, 143],
  [113, 255, 147],
  [108, 253, 150],
  [107, 253, 155],
  [103, 252, 160],
  [99, 251, 164],
  [94, 252, 167],
  [88, 254, 172],
  [83, 255, 174],
  [78, 255, 175],
  [74, 255, 176],
  [77, 254, 182],
  [74, 253, 185],
  [73, 253, 188],
  [69, 253, 189],
  [65, 253, 192],
  [61, 253, 196],
  [57, 254, 201],
  [52, 254, 206],
  [46, 253, 209],
  [43, 253, 214],
  [38, 253, 219],
  [34, 253, 223],
  [30, 252, 227],
  [28, 252, 228],
  [25, 253, 230],
  [24, 251, 234],
  [22, 247, 241],
  [21, 245, 247],
  [18, 243, 249],
  [16, 243, 252],
  [13, 243, 255],
  [12, 244, 255],
  [11, 242, 255],
  [10, 241, 255],
  [7, 239, 253],
  [9, 236, 252],
  [11, 234, 252],
  [10, 229, 251],
  [9, 222, 252],
  [9, 219, 254],
  [11, 217, 255],
  [14, 215, 255],
  [12, 211, 253],
  [11, 208, 250],
  [12, 207, 251],
  [14, 206, 253],
  [12, 202, 250],
  [10, 196, 247],
  [8, 192, 246],
  [10, 189, 247],
  [11, 185, 246],
  [10, 179, 244],
  [10, 175, 243],
  [12, 173, 245],
  [13, 171, 245],
  [11, 167, 242],
  [10, 163, 239],
  [9, 162, 242],
  [7, 156, 246],
  [9, 156, 251],
  [2, 146, 243],
  [7, 149, 247],
  [9, 148, 249],
  [3, 138, 245],
  [7, 137, 247],
  [4, 129, 245],
  [7, 127, 247],
  [11, 127, 250],
  [3, 115, 243],
  [8, 115, 247],
  [10, 112, 248],
  [6, 106, 244],
  [10, 110, 248],
  [5, 102, 241],
  [2, 99, 238],
  [1, 98, 237],
  [0, 95, 234],
  [0, 91, 233],
  [0, 87, 232],
  [0, 83, 232],
  [0, 81, 234],
  [0, 78, 235],
  [0, 78, 238],
  [2, 75, 240],
  [4, 72, 241],
  [2, 68, 242],
  [1, 64, 240],
  [0, 60, 237],
  [0, 56, 236],
  [2, 52, 237],
  [6, 38, 235],
  [10, 33, 235],
  [7, 30, 234],
  [6, 26, 235],
  [6, 23, 237],
  [5, 19, 238],
  [6, 16, 238],
  [5, 12, 238],
  [7, 10, 239],
  [6, 7, 239],
  [6, 4, 237],
  [6, 3, 234],
  [9, 3, 235],
  [10, 2, 233],
  [9, 2, 230],
  [8, 1, 229],
  [8, 3, 228],
  [6, 4, 227],
  [5, 4, 220],
  [7, 4, 217],
  [6, 4, 211],
  [7, 4, 207],
  [6, 4, 202],
  [7, 4, 199],
  [9, 3, 199],
  [10, 3, 197],
  [9, 2, 193],
  [11, 3, 187],
  [10, 3, 181],
  [10, 3, 177],
  [10, 4, 172],
  [9, 3, 171],
  [7, 1, 173],
  [7, 1, 173],
  [7, 2, 167],
  [7, 2, 164],
  [5, 3, 166],
  [5, 2, 167],
  [7, 1, 169],
  [7, 2, 164],
  [4, 0, 147],
  [12, 10, 133],
];

/**
 * Implementation of binary search algorithm.
 *
 * @param {array}    arrayDat - Array to be searched.
 * @param {float}    val      - Value to search.
 * @param {function} pred     - Predicate function for searching.
 *                              This function defines elements order.
 *
 * @return Recursive call until get the pair of lower and upper bound index.
 *         Pack the index pair in object with field names "lowerBound", "upperBound".
 */
export function BinSearch(arrayDat, val, pred) {
  const count = arrayDat.length;
  if (0 == count) {
    return { lowerBound: -1, upperBound: -1 };
  }
  if (pred(val, arrayDat[0])) {
    return { lowerBound: -1, upperBound: 0 };
  }
  if (false == pred(val, arrayDat[count - 1])) {
    return { lowerBound: count - 1, upperBound: -1 };
  }
  const binSearchFunc = (arrayDat, val, beg, end) => {
    if (beg == end) {
      return { lowerBound: beg, upperBound: beg + 1 };
    }
    const idx = parseInt((beg + end) / 2);
    if (idx == beg) {
      return { lowerBound: beg, upperBound: end };
    }
    if (pred(val, arrayDat[idx])) {
      return binSearchFunc(arrayDat, val, beg, idx);
    } else {
      return binSearchFunc(arrayDat, val, idx, end);
    }
  };
  return binSearchFunc(arrayDat, val, 0, count);
}

/**
 * Helper method preparing PSD data returned from server to be ready to visualize it on a canvas.
 * The method loop over each pixel in the PSD canvas, and for each pixel:
 *  1. Find coordinate (x, y) for the point, where x is in the frequency domain axis, y is in depth axis.
 *  2. Find the upper bound and lower bound of x in frequency.
 *  3. Find the upper bound and lower bound of y in depth.
 *  4. With these two pairs of bounds, we can get 4 corner value for interpolation.
 *  5. Apply the bilinear interpolation, then get the right color(in hue) to render.
 *  6. Using interpolated values and min max values among them, build the mapping that [min, max] -> [blue_hue, red_hue]
 *     and applying the mapping to every pixel. Then render all the pixel
 * @method
 *
 * @param {object}  data            - Raw data of HaGuide PSD.
 * @param {integer} canvasWidth     - Canvas width.
 * @param {integer} canvasHeight    - Canvas height.
 * @param {array}   scalerForRender - X scaler number to render array.
 *
 * @return Object with interpolated data and minimum/maximum value among them.
 */
export const prepareHeatmapData = (
  data,
  canvasWidth,
  canvasHeight,
  scalerForRender,
  oscillationBoundaries
) => {
  const spectrumStride = data.spectrumStride;
  const spectrumColumnsCount = data.psd.siteSpectrum[0].length;
  const scaleRange =
    data.siteDepthArray[0] -
    data.siteDepthArray[data.siteDepthArray.length - 1];

  const depthCoefficient = scaleRange / canvasHeight;
  const interpolatedData = [];
  let min = 1e10;
  let max = -1e10;

  //----------------------------------------------------------
  // for logarithm scale
  const minScale = data.spectrum_start_freq;
  const maxScale = minScale + (spectrumColumnsCount - 1) * spectrumStride;

  const logMinScale = Math.log10(minScale);
  const logMaxScale = Math.log10(maxScale);

  const logSpan = logMaxScale - logMinScale;

  let scalerForRenderInPx = [];
  for (let i = 0; i != scalerForRender.length; ++i) {
    const logVal = Math.log10(scalerForRender[i]);
    scalerForRenderInPx.push((canvasWidth * (logVal - logMinScale)) / logSpan);
  }
  let boundariesForRenderInPx = [];
  for (let i = 0; i != oscillationBoundaries.length; ++i) {
    const logVal = Math.log10(oscillationBoundaries[i]);
    boundariesForRenderInPx.push(
      (canvasWidth * (logVal - logMinScale)) / logSpan
    );
  }
  //----------------------------------------------------------*/

  // Prepare the depth values.
  const depth = data.psd.siteDepth;

  const pred = (a, b) => {
    return a > b;
  };

  for (let row = 0; row < canvasHeight; row++) {
    const pixelDepth =
      data.siteDepthArray[data.siteDepthArray.length - 1] +
      row * depthCoefficient;

    const searchDepthResult = BinSearch(depth, pixelDepth, pred);
    const yLowerBoundIdx = searchDepthResult.lowerBound;
    const yUpperBoundIdx = searchDepthResult.upperBound;

    if (yLowerBoundIdx === -1 || yUpperBoundIdx === -1) {
      // No bounds found, so ignore this row of pixels.
      continue;
    }

    const vSpan = Math.abs(depth[yLowerBoundIdx] - depth[yUpperBoundIdx]);

    // Find the upper and lower bounds for y (depth)
    const upperWeight =
      (vSpan - Math.abs(pixelDepth - depth[yUpperBoundIdx])) / vSpan;
    const lowerWeight =
      (vSpan - Math.abs(pixelDepth - depth[yLowerBoundIdx])) / vSpan;

    let pixelsRow = [];
    for (let col = 0; col !== canvasWidth; ++col) {
      //----------------------------------------------------------
      // for logarithm scale
      const ex = (col * logSpan) / canvasWidth + logMinScale;
      const xFreq = Math.pow(10, ex);
      //----------------------------------------------------------*/

      //----------------------------------------------------------
      // for linear scale
      //const xFreq = col * (spectrumColumnsCount - 1) * spectrumStride / canvasWidth;
      //----------------------------------------------------------
      const xLowerBoundIdx = parseInt(
        (xFreq - data.spectrum_start_freq) / spectrumStride
      );

      if (xLowerBoundIdx >= spectrumColumnsCount - 1) {
        continue;
      }
      const xUpperBoundIdx = xLowerBoundIdx + 1;

      const upperLeftVal =
        data.psd.siteSpectrum[yUpperBoundIdx][xLowerBoundIdx];
      const upperRightVal =
        data.psd.siteSpectrum[yUpperBoundIdx][xUpperBoundIdx];

      const lowerLeftVal =
        data.psd.siteSpectrum[yLowerBoundIdx][xLowerBoundIdx];
      const lowerRightVal =
        data.psd.siteSpectrum[yLowerBoundIdx][xUpperBoundIdx];

      const hSpan = spectrumStride;

      const leftWeight =
        (hSpan - Math.abs(xFreq - xLowerBoundIdx * spectrumStride)) / hSpan;
      const rightWeight =
        (hSpan - Math.abs(xFreq - xUpperBoundIdx * spectrumStride)) / hSpan;

      const topVal = leftWeight * upperLeftVal + rightWeight * upperRightVal;
      const bottomVal = leftWeight * lowerLeftVal + rightWeight * lowerRightVal;

      const pixelVal = topVal * upperWeight + bottomVal * lowerWeight;

      if (min > pixelVal) {
        min = pixelVal;
      }
      if (max < pixelVal) {
        max = pixelVal;
      }
      pixelsRow.push(pixelVal);
    }
    interpolatedData.push(pixelsRow);
  }
  return {
    interpolatedData: interpolatedData,
    min: min,
    max: max,
    scalerForRenderInPx: scalerForRenderInPx,
    boundariesForRenderInPx: boundariesForRenderInPx,
  };
};
