export const destinationSquare = (x: number, y: number) => {
  const ySegment = Math.floor(y / 171)
  const xSegment = Math.floor(x / 171)
  const xResult = xSegment + 1

  switch (ySegment) {
    case 0:
      return { y: 'A', x: xResult }
    case 1:
      return { y: 'B', x: xResult }
    default:
      return { y: 'C', x: xResult }
  }
}

export async function loadImage(url: string, elem: HTMLImageElement) {
  return new Promise((resolve, reject) => {
    elem.src = url
    elem.onload = () => resolve(elem)
    elem.onerror = reject
  })
}
