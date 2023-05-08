/**
 * HaGuide dynamic heat map package.
 * @module views/nt/DynamicPsdHeatMap/DynamicPsdHeatMap
 */

import React, { useState, useEffect, useRef } from "react";
import { BinSearch, HEATMAP_COLORS } from "./HeatmapHelper";
import "./DynamicPsdHeatMap.css";

export const SCALER_HEIGHT = 25;

function GetDepthRange(siteDepth) {
  if (0 == siteDepth.length) {
    return null;
  }
  let minIdx = siteDepth.length - 1;
  let maxIdx = 0;
  let minDepth = siteDepth[minIdx];
  let maxDepth = siteDepth[maxIdx];

  for (let idx = 0; idx != siteDepth.length; ++idx) {
    const depth = siteDepth[idx];
    if (minDepth > depth) {
      minDepth = depth;
      minIdx = idx;
    }
    if (maxDepth < depth) {
      maxDepth = depth;
      maxIdx = idx;
    }
  }
  return { minIdx, minDepth, maxIdx, maxDepth };
}

/**
 *
 */
function AnalyzeAffectedRowRange(
  canvasWidth,
  canvasHeight,
  processDepthRange,
  viewPort
) {
  if (
    processDepthRange.upperDepth <= viewPort.depthRange[1] ||
    processDepthRange.lowerDepth >= viewPort.depthRange[0]
  ) {
    return { affectedUpperRow: 0, affectedLowerRow: 0 };
  }

  const toSort = [
    processDepthRange.upperDepth,
    processDepthRange.lowerDepth,
    viewPort.depthRange[0],
    viewPort.depthRange[1],
  ];

  toSort.sort((a, b) => a - b);
  const upperRowMM = toSort[2];
  const lowerRowMM = toSort[1];

  const depthRange = viewPort.depthRange[0] - viewPort.depthRange[1];

  const coeff = canvasHeight / depthRange;

  const affectedUpperRow = parseInt(
    Math.max(0.5 + coeff * (viewPort.depthRange[0] - upperRowMM), 0)
  );

  const affectedLowerRow = parseInt(
    Math.min(0.5 + coeff * (viewPort.depthRange[0] - lowerRowMM), canvasHeight)
  );

  return { affectedUpperRow, affectedLowerRow };
}

/**
 * @param processDepthRange {object} Example: {upperDepth, lowerDepth}
 * @param {object} viewPort - View port data, example: {freqRange: [3,200], depthRange: [10,-1]}
 */
function InterpolatePixelData(
  deposit,
  canvasWidth,
  canvasHeight,
  logarithmic,
  processDepthRange,
  viewPort,
  minMaxVal
) {
  // deposit = {siteDepth: [9.8, 9.0, 8.7,...], stride: 0.3, startFreq: 3, psd: [1,2,3,5,...]}
  if (0 == deposit.siteDepth.length || 0 == deposit.psd.length) {
    return null;
  }
  const { affectedUpperRow, affectedLowerRow } = AnalyzeAffectedRowRange(
    canvasWidth,
    canvasHeight,
    processDepthRange,
    viewPort
  );
  if (affectedUpperRow == affectedLowerRow) {
    return null;
  }

  const { minIdx, minDepth, maxIdx, maxDepth } = GetDepthRange(
    deposit.siteDepth
  );

  const depthRangeLength = viewPort.depthRange[0] - viewPort.depthRange[1];
  const vCoeff = depthRangeLength / canvasHeight;

  const freqRangeWidth = viewPort.freqRange[1] - viewPort.freqRange[0];
  const hCoeff = freqRangeWidth / canvasWidth;

  const interpolatedData = [];
  let minVal = minMaxVal.minVal;
  let maxVal = minMaxVal.maxVal;

  const depth = deposit.siteDepth;
  const pred = (a, b) => {
    return a > b;
  };

  const psdValNumPerRow = deposit.psd.length / deposit.siteDepth.length;

  const hSpan = deposit.stride;

  let logSpan = 1,
    logMin = 1;
  if (logarithmic) {
    logMin = Math.log10(viewPort.freqRange[0]);
    const logMax = Math.log10(viewPort.freqRange[1]);
    logSpan = logMax - logMin;
  }

  const maxFreq =
    deposit.startFreq +
    (deposit.psd.length / deposit.siteDepth.length - 1) * deposit.stride;

  for (let row = affectedUpperRow; row != affectedLowerRow; ++row) {
    const pixelDepth = viewPort.depthRange[0] - row * vCoeff;

    const { lowerBound: yLowerBoundIdx, upperBound: yUpperBoundIdx } =
      BinSearch(depth, pixelDepth, pred);
    if (-1 == yLowerBoundIdx || -1 == yUpperBoundIdx) {
      // No bounds found, so ignore this row of pixels.
      continue;
    }
    const vSpan = Math.abs(depth[yLowerBoundIdx] - depth[yUpperBoundIdx]);
    const upperWeight =
      Math.abs(vSpan - Math.abs(pixelDepth - depth[yUpperBoundIdx])) / vSpan;
    const lowerWeight =
      Math.abs(vSpan - Math.abs(pixelDepth - depth[yLowerBoundIdx])) / vSpan;
    const pixelsRow = [];
    for (let col = 0; col != canvasWidth; ++col) {
      let xFreq = 0;

      if (logarithmic) {
        const ex = (col * logSpan) / canvasWidth + logMin;
        xFreq = Math.pow(10, ex);
      } else {
        xFreq = col * hCoeff + viewPort.freqRange[0];

        if (xFreq <= viewPort.freqRange[0] || xFreq >= viewPort.freqRange[1]) {
          pixelsRow.push(NaN);
          continue;
        }
      }

      const xLowerBoundIdx = parseInt(
        (xFreq - deposit.startFreq) / deposit.stride
      );

      if (xLowerBoundIdx >= deposit.psd.length - 1) {
        continue;
      }
      const xUpperBoundIdx = xLowerBoundIdx + 1;

      const upperLeftVal =
        deposit.psd[yUpperBoundIdx * psdValNumPerRow + xLowerBoundIdx];
      const upperRightVal =
        deposit.psd[yUpperBoundIdx * psdValNumPerRow + xUpperBoundIdx];

      const lowerLeftVal =
        deposit.psd[yLowerBoundIdx * psdValNumPerRow + xLowerBoundIdx];
      const lowerRightVal =
        deposit.psd[yLowerBoundIdx * psdValNumPerRow + xUpperBoundIdx];

      const leftWeight =
        Math.abs(
          hSpan -
            Math.abs(
              xFreq - deposit.startFreq - xLowerBoundIdx * deposit.stride
            )
        ) / hSpan;
      const rightWeight =
        Math.abs(
          hSpan -
            Math.abs(
              xFreq - deposit.startFreq - xUpperBoundIdx * deposit.stride
            )
        ) / hSpan;

      const topVal = leftWeight * upperLeftVal + rightWeight * upperRightVal;
      const bottomVal = leftWeight * lowerLeftVal + rightWeight * lowerRightVal;

      const pixelVal = topVal * upperWeight + bottomVal * lowerWeight;

      if (minVal > pixelVal) {
        minVal = pixelVal;
      }
      if (maxVal < pixelVal) {
        maxVal = pixelVal;
      }

      pixelsRow.push(pixelVal);
    }

    interpolatedData.push(pixelsRow);
  }
  return {
    interpolatedData,
    minVal,
    maxVal,
    affectedUpperRow,
    affectedLowerRow,
  };
}

function ApplyLogMode(freqRange) {
  const LOG_MODE_LOWER = 8;
  const LOG_MODE_UPPER = 35;
  return LOG_MODE_LOWER >= freqRange[0] && LOG_MODE_UPPER <= freqRange[1];
}

function RenderNewSite(
  deposit,
  canvasSize,
  viewPort,
  saturation,
  minMaxValueBundle,
  xDir,
  ctx
) {
  if (1 >= deposit.siteDepth.length) {
    return;
  }

  const lastIdx = deposit.siteDepth.length - 1;

  const logarithmic = ApplyLogMode(viewPort.freqRange);

  const [minMaxVal, setMinMaxVal] = minMaxValueBundle;

  const oldMinMaxVal = { ...minMaxVal };

  const intpDat = InterpolatePixelData(
    deposit,
    canvasSize.width,
    canvasSize.height,
    logarithmic,
    {
      upperDepth: deposit.siteDepth[lastIdx - 1],
      lowerDepth: deposit.siteDepth[lastIdx],
    },
    viewPort,
    minMaxVal
  );

  if (null == intpDat) {
    return;
  }
  const {
    interpolatedData,
    minVal,
    maxVal,
    affectedUpperRow,
    affectedLowerRow,
  } = intpDat;
  if (
    Math.abs(oldMinMaxVal.minVal - minVal) > 1e-6 ||
    Math.abs(oldMinMaxVal.maxVal - maxVal) > 1e-6
  ) {
    setMinMaxVal({ minVal, maxVal });
  }
  if (affectedUpperRow == affectedLowerRow) {
    return;
  }

  RenderPsd(
    interpolatedData,
    minVal,
    maxVal,
    saturation,
    affectedUpperRow,
    affectedLowerRow,
    canvasSize.width,
    canvasSize.height,
    xDir,
    ctx
  );

  // render oscillation boundaries
  RenderOscillationBoundary(canvasSize, viewPort, logarithmic, xDir, ctx);
}

function RefreshWholeSite(
  deposit,
  canvasSize,
  viewPort,
  saturation,
  minMaxValueBundle,
  xDir,
  ctx
) {
  if (0 == deposit.siteDepth.length) {
    return;
  }

  const logarithmic = ApplyLogMode(viewPort.freqRange);

  const [oldMinMaxVal, setMinMaxVal] = minMaxValueBundle;

  const { minIdx, minDepth, maxIdx, maxDepth } = GetDepthRange(
    deposit.siteDepth
  );

  const intpDat = InterpolatePixelData(
    deposit,
    canvasSize.width,
    canvasSize.height,
    logarithmic,
    { upperDepth: maxDepth, lowerDepth: minDepth },
    viewPort,
    INIT_MIN_MAX_VAL
  );

  if (null == intpDat) {
    return;
  }
  const {
    interpolatedData,
    minVal,
    maxVal,
    affectedUpperRow,
    affectedLowerRow,
  } = intpDat;
  if (
    Math.abs(oldMinMaxVal.minVal - intpDat.minVal) > 1e-6 ||
    Math.abs(oldMinMaxVal.maxVal - intpDat.maxVal) > 1e-6
  ) {
    setMinMaxVal({ minVal: intpDat.minVal, maxVal: intpDat.maxVal });
  }

  if (affectedUpperRow == affectedLowerRow) {
    return;
  }

  ctx.fillStyle = "rgb(245,245,245)";
  ctx.fillRect(0, 0, canvasSize.width, canvasSize.height + SCALER_HEIGHT);

  RenderPsd(
    interpolatedData,
    minVal,
    maxVal,
    saturation,
    affectedUpperRow,
    affectedLowerRow,
    canvasSize.width,
    canvasSize.height,
    xDir,
    ctx
  );
  //====================

  // render scaler
  RenderScale(canvasSize, viewPort, logarithmic, xDir, ctx);

  // render oscillation boundaries
  RenderOscillationBoundary(canvasSize, viewPort, logarithmic, xDir, ctx);
}

function RenderOscillationBoundary(
  canvasSize,
  viewPort,
  logarithmic,
  xDir,
  ctx
) {
  // theta: 3-8
  // alpha: 8-13
  // beta: 14-30
  // gamma: 30-

  const boundriesToRender = [
    { startFreq: 4, label: "θ" },
    { startFreq: 8, label: "α" },
    { startFreq: 13, label: "β" },
    { startFreq: 30, label: "γ" },
  ].filter((b) => {
    return (
      viewPort.freqRange[0] < b.startFreq && b.startFreq < viewPort.freqRange[1]
    );
  });
  let logSpan = 1,
    logMin = 1;
  let pxPerMM = 1;
  if (logarithmic) {
    logMin = Math.log10(viewPort.freqRange[0]);
    const logMax = Math.log10(viewPort.freqRange[1]);
    logSpan = logMax - logMin;
  } else {
    pxPerMM =
      canvasSize.width / (viewPort.freqRange[1] - viewPort.freqRange[0]);
  }
  ctx.beginPath();
  ctx.setLineDash([10, 5]);
  ctx.strokeStyle = "rgb(92,92,92)";
  ctx.fillStyle = "rgb(88,100,103)";
  ctx.font = "18px sans-serif";

  for (
    let idx = 0, lastIdx = boundriesToRender.length - 1;
    idx != boundriesToRender.length;
    ++idx
  ) {
    const b = boundriesToRender[idx];
    let x = 0,
      nextX = 0;
    const nextB = boundriesToRender[idx + 1];
    if (logarithmic) {
      x = (canvasSize.width * (Math.log10(b.startFreq) - logMin)) / logSpan;
      if (nextB) {
        nextX =
          (canvasSize.width * (Math.log10(nextB.startFreq) - logMin)) / logSpan;
      }
    } else {
      x = (b.startFreq - viewPort.freqRange[0]) * pxPerMM;
      if (nextB) {
        nextX = (nextB.startFreq - viewPort.freqRange[0]) * pxPerMM;
      }
    }
    if (false == xDir) {
      x = canvasSize.width - x;
      nextX = canvasSize.width - nextX;
    }

    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasSize.height);

    let textX = 0;
    switch (idx) {
      case lastIdx:
        textX = xDir ? (x + canvasSize.width) / 2 : x / 2;
        break;
      default:
        textX = (x + nextX) / 2;
        break;
    }
    ctx.fillText(b.label, textX - 5, 20);
  }
  ctx.stroke();
  ctx.closePath();
}

/**
 * @param {object}  viewPort - Hooked state data. Store view port data, example: {freqRange: [3,200], depthRange: [10,-1]}
 */
function RenderScale(canvasSize, viewPort, logarithmic, xDir, ctx) {
  // X axis
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.strokeStyle = "rgb(192,192,192)";
  ctx.fillStyle = "rgb(80,80,80)";
  ctx.font = "10px sans-serif";

  ctx.moveTo(0, canvasSize.height + 2);
  ctx.lineTo(canvasSize.width, canvasSize.height + 2);
  ctx.stroke();

  const scalerToRender = [];
  if (logarithmic) {
    const WISH_SCALER = [5, 10, 15, 20, 40, 60, 90];
    for (const s of WISH_SCALER) {
      if (viewPort.freqRange[0] < s && s < viewPort.freqRange[1]) {
        scalerToRender.push(s);
      }
    }
  } else {
    // calculate 5 scalers for rendering
    const stride = (viewPort.freqRange[1] - viewPort.freqRange[0]) / 6.0;
    for (let idx = 1; idx != 6; ++idx) {
      scalerToRender.push(idx * stride + viewPort.freqRange[0]);
    }
  }
  let logSpan = 1,
    logMin = 1;
  let pxPerMM = 1;
  if (logarithmic) {
    logMin = Math.log10(viewPort.freqRange[0]);
    const logMax = Math.log10(viewPort.freqRange[1]);
    logSpan = logMax - logMin;
  } else {
    pxPerMM =
      canvasSize.width / (viewPort.freqRange[1] - viewPort.freqRange[0]);
  }

  for (const s of scalerToRender) {
    let x = 0;
    if (logarithmic) {
      x = (canvasSize.width * (Math.log10(s) - logMin)) / logSpan;
    } else {
      x = (s - viewPort.freqRange[0]) * pxPerMM;
    }

    const xForSeg = xDir ? x : canvasSize.width - x;

    ctx.moveTo(xForSeg, canvasSize.height + 2);
    ctx.lineTo(xForSeg, canvasSize.height + 8);

    if (xDir) {
      x -= 5;
    } else {
      x = canvasSize.width - x - 5;
    }

    ctx.fillText(`${parseInt(s)}`, x, canvasSize.height + 18);
  }
  ctx.stroke();
  ctx.closePath();
}

function RenderPsd(
  interpolatedData,
  minVal,
  maxVal,
  saturation,
  affectedUpperRow,
  affectedLowerRow,
  canvasWidth,
  canvasHeight,
  xDir,
  ctx
) {
  const colorsNum = HEATMAP_COLORS.length;
  const lastColorIdx = colorsNum - 1;

  const valSpan = (saturation * maxVal) / 100.0 - minVal;
  for (let row = affectedUpperRow; row != affectedLowerRow; ++row) {
    //const yPos = canvasHeight - row /*- scalerHeight*/ - 1;
    const rowData = interpolatedData[row - affectedUpperRow];
    if (undefined == rowData) {
      continue;
    }
    for (let col = 0; col != canvasWidth; ++col) {
      const val = rowData[col];
      if (isNaN(val)) {
        continue;
      }

      const normalizedVal = (rowData[col] - minVal) / valSpan;
      const colorIdxFloat = normalizedVal * lastColorIdx;
      const colorIdx = Math.min(parseInt(colorIdxFloat + 0.5), lastColorIdx);
      const color = HEATMAP_COLORS[colorsNum - 1 - colorIdx];

      if (undefined == color) {
        continue;
      }

      ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`;

      const x = xDir ? col : canvasWidth - 1 - col;

      ctx.fillRect(x, row, 1, 1);
    }
  }
}

/*
  const [deposit, setDeposit] = new useState({
    siteDepth: [],
    psd: [],
    stride: 0.3,
    startFreq: 3,
    
  });
*/

function SortDepthAndPsd(allSitesData) {
  const siteCount = allSitesData.siteDepth.length;
  const spectrumColumnsCount = parseInt(allSitesData.psd.length / siteCount);

  const siteArray = [];

  //for(let idx in allSitesData.siteDepth)
  for (let idx = 0; idx != allSitesData.siteDepth.length; ++idx) {
    const depth = allSitesData.siteDepth[idx];
    const beginPsdIdx = idx * spectrumColumnsCount;
    const endPsdIdx = beginPsdIdx + spectrumColumnsCount;
    const psd = allSitesData.psd.slice(beginPsdIdx, endPsdIdx);

    siteArray.push({ depth, psd });
  }
  siteArray.sort((x, y) => y.depth - x.depth);

  allSitesData.siteDepth = [];
  allSitesData.psd = [];
  for (const site of siteArray) {
    allSitesData.siteDepth.push(site.depth);
    allSitesData.psd = allSitesData.psd.concat(site.psd);
  }
}

const HeatMap = ({
  canvasSize,
  widgetSize,
  viewPort,
  saturation,
  newSiteData,
  allSitesData,
  minMaxValueBundle,
  xDir,
}) => {
  const canvasRef = new useRef(null);
  const [deposit, setDeposit] = new useState({
    siteDepth: [],
    stride: 0.3,
    startFreq: 3,
    psd: [],
  });
  const [forLogBundle, setForLogBundle] = new useState({
    logMinScale: Math.log10(3),
    logMaxScale: Math.log10(200),
    scales: [],
    scalesInPx: [],
  });
  const minMaxValue = minMaxValueBundle[0];

  const contentCanvasSize = canvasSize
    ? { width: canvasSize.width, height: canvasSize.height - SCALER_HEIGHT }
    : null;

  // handle new site data
  useEffect(() => {
    if (null == newSiteData) {
      return;
    }

    const newDeposit = { ...deposit };
    // newSiteData = {depth: 9.8,stride: 0.3, startFreq: 3, psd: [1,2,3,5,...]}
    // newDeposit = {siteDepth: [9.8, 9.0, 8.7,...], stride: 0.3, startFreq: 3, psd: [1,2,3,5,...]}
    newDeposit.siteDepth.push(newSiteData.depth);
    newDeposit.stride = newSiteData.stride;
    newDeposit.startFreq = newSiteData.startFreq;
    newDeposit.psd.push(...newSiteData.psd);

    if (null != canvasRef && null != canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      RenderNewSite(
        newDeposit,
        contentCanvasSize,
        viewPort,
        saturation,
        minMaxValueBundle,
        xDir,
        ctx
      );
    }
    SortDepthAndPsd(newDeposit);
    setDeposit(newDeposit);
  }, [newSiteData]);

  // handle all sites data
  useEffect(() => {
    if (null == allSitesData) {
      return;
    }
    SortDepthAndPsd(allSitesData);
    setDeposit(allSitesData);
    // when deposit changes, it will render whole site
  }, [allSitesData]);

  // handle change of relevant states
  useEffect(() => {
    if (null == canvasSize || null == viewPort) {
      return;
    }

    if (null != canvasRef && null != canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      RefreshWholeSite(
        deposit,
        contentCanvasSize,
        viewPort,
        saturation,
        minMaxValueBundle,
        xDir,
        ctx
      );
    }
  }, [
    canvasRef,
    widgetSize,
    viewPort,
    minMaxValue,
    forLogBundle,
    saturation,
    deposit,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
    />
  );
};

const INIT_MIN_MAX_VAL = { minVal: 99999, maxVal: -99999 };
const LEGEND_COLOR_BAR_WIDTH = 15;
const LEGEND_NUMBER_COL_WIDTH = 25;

const Legend = ({ minMaxValue, legendSize }) => {
  const canvasRef = new useRef(null);

  useEffect(() => {
    if (
      null == legendSize ||
      null == canvasRef ||
      null == canvasRef.current ||
      INIT_MIN_MAX_VAL.minVal == minMaxValue.minVal ||
      INIT_MIN_MAX_VAL.maxVal == minMaxValue.maxVal
    ) {
      return;
    }

    const ctx = canvasRef.current.getContext("2d");

    ctx.fillStyle = "rgb(245,245,245)";
    ctx.fillRect(0, 0, legendSize.width, legendSize.height);

    const topMargin = 10; // px
    const leftmargin = 5; // px

    const barHeight = parseInt(legendSize.height * 0.2);

    const colorbarRight = leftmargin + LEGEND_COLOR_BAR_WIDTH;

    const ratio = HEATMAP_COLORS.length / (barHeight - topMargin);

    ctx.lineWidth = 1;
    for (let y = topMargin; barHeight != y; ++y) {
      const idx = parseInt((y - topMargin) * ratio);
      const color = HEATMAP_COLORS[idx];

      ctx.beginPath();
      ctx.strokeStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
      ctx.moveTo(leftmargin, y);
      ctx.lineTo(colorbarRight, y);
      ctx.closePath();
      ctx.stroke();
    }
    ctx.font = "8px sans-serif";
    ctx.fillStyle = "rgb(80,80,80)";

    const midY = (topMargin + barHeight + 6) / 2;
    ctx.fillText(
      `${minMaxValue.maxVal.toFixed(1)}`,
      colorbarRight + 5,
      topMargin + 3
    );
    ctx.fillText(
      `${(0.5 * (minMaxValue.maxVal + minMaxValue.minVal)).toFixed(1)}`,
      colorbarRight + 5,
      midY
    );
    ctx.fillText(
      `${minMaxValue.minVal.toFixed(1)}`,
      colorbarRight + 5,
      barHeight + 3
    );
  }, [minMaxValue]);

  return (
    <canvas
      ref={canvasRef}
      width={legendSize.width}
      height={legendSize.height * 0.6}
    />
  );
};

/**
 * Dynamic PSD heat map. Visualize PSD data by either: 1) incremental data(row by row), 2) whole data
 * @method
 * @param {string}  xDirection   - "ltr" means left to right, "rtl" means right to left. If not provided, default is "ltr"
 * @param {boolean} showLegend   - Flag whether showing legend bar.
 * @param {object}  widgetSize   - Hooked state data. Store canvas size in pixel: {width: 200, height: 551}
 * @param {integer} saturation   - Pixel saturation. Percentage of maximum pixel value to saturate pixel.
 * @param {object}  viewPort     - Hooked state data. Store view port data, example: {freqRange: [0,12], depthRange: [10,-1]}
 * @param {object}  newSiteData  - Hooked state data. When new site data comes, outter logic encode data into this parameter.
                                   Example: {depth: 9.8,stride: 0.3, startFreq: 3, psd: [1,2,3,5,...]}
 * @param {object}  allSitesData - Hooked state data. When recovering the whole app, outter logic requests the whole trajectory 
                                   data and set this hook. 
                                   Example: {siteDepth: [9.8, 9.0, 8.7,...], stride: 0.3, startFreq: 3, psd: [1,2,3,5,...]}.
 */
export const DynamicPsdHeatMap = ({
  xDirection,
  showLegend,
  widgetSize,
  saturation,
  viewPort,
  newSiteData,
  allSitesData,
}) => {
  const minMaxValueBundle = useState(INIT_MIN_MAX_VAL);

  const minMaxValue = minMaxValueBundle[0];

  const xDir = xDirection ? "ltr" == xDirection : true;

  const canvasSize =
    showLegend && widgetSize
      ? {
          width:
            widgetSize.width -
            (LEGEND_COLOR_BAR_WIDTH + LEGEND_NUMBER_COL_WIDTH),
          height: widgetSize.height,
        }
      : widgetSize;

  const legendSize =
    showLegend && widgetSize
      ? {
          width: LEGEND_COLOR_BAR_WIDTH + LEGEND_NUMBER_COL_WIDTH,
          height: widgetSize.height,
        }
      : widgetSize;

  return (
    <div className="dynamicPsdHeatMapBox">
      {showLegend && (
        <Legend legendSize={legendSize} minMaxValue={minMaxValue} />
      )}
      <HeatMap
        canvasSize={canvasSize}
        widgetSize={widgetSize}
        saturation={saturation ? saturation : 100}
        viewPort={viewPort}
        newSiteData={newSiteData}
        allSitesData={allSitesData}
        minMaxValueBundle={minMaxValueBundle}
        xDir={xDir}
      />
    </div>
  );
};
