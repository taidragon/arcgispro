/**
 * @Description:
 * @author
 * @date
*/
/* 转换经纬度为度分秒 */
export const cacuLonLat = a => {
  if (a === undefined || a === null) {
    return undefined
  } else {
    let degree = parseInt(a)
    let min = parseInt((a - degree) * 60)
    let sec = ((a - degree) * 3600 - min * 60).toFixed(2)

    let min00 = '00' + min
    min = min00.substring(min00.length - 2, min00.length)

    return degree + '°' + min + '′' + sec + '″'
  }
}

/* 转换度分秒为经纬度 */
export const cacuDMS = a => {
  if (a === undefined || a === null) {
    return undefined
  } else {
    let du = a.split('°')[0]
    let fen = a.split('°')[1].split('′')[0]
    let miao = a.split('°')[1].split('′')[1].split('″')[0]

    return Math.abs(du) + (Math.abs(fen) / 60 + Math.abs(miao) / 3600)
  }
}
