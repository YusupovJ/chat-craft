export const createAnalyser = (stream: MediaStream) => {
  const audioContext = new window.AudioContext();
  const source = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();

  source.connect(analyser);

  analyser.fftSize = 4096;
  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  return { dataArray, analyser };
};
