/**
 * jest setup file to mock canvas context for Chart.js to prevent errors in tests
 */

const createCanvasMock = () => {
  const methods = [
    'getContext',
    'getBoundingClientRect',
    'addEventListener',
    'removeEventListener',
    'dispatchEvent',
    'toDataURL',
    'getContext',
  ];

  const canvasMock = {
    getContext: () => ({
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      getImageData: jest.fn(() => ({ data: [] })),
      putImageData: jest.fn(),
      createImageData: jest.fn(),
      setTransform: jest.fn(),
      drawImage: jest.fn(),
      save: jest.fn(),
      fillText: jest.fn(),
      restore: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      closePath: jest.fn(),
      stroke: jest.fn(),
      translate: jest.fn(),
      scale: jest.fn(),
      rotate: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      measureText: jest.fn(() => ({ width: 0 })),
      transform: jest.fn(),
      rect: jest.fn(),
      clip: jest.fn(),
    }),
    getBoundingClientRect: () => ({
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
    }),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    toDataURL: jest.fn(),
  };

  return canvasMock;
};

Object.defineProperty(window.HTMLCanvasElement.prototype, 'getContext', {
  value: () => createCanvasMock().getContext(),
});
