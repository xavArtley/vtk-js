let globalMTime = 0;

export function currentMTime() {
  return globalMTime;
}

export function nextMTime() {
  return ++globalMTime;
}
