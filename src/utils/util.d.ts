export interface Position {
  /**
   * position in pixel.
   */
  top: number
  /**
   * position in pixel.
   */
  left: number
  /**
   * if true the position is relative to the inner window size, if false the position is relative to itself.
   */
  absolute: boolean
  /**
   * height in pixel.
   */
  height: number
}
export interface Point {
  /**
   * left position.
   */
  left: number
  /**
   * top position.
   */
  top: number
}
export interface Options {
  /**
   * Enables debug Mode.
   */
  debug?: boolean
  /**
   * usesSelection End Instead of selection Start.
   */
  useSelectionEnd?: boolean
  /**
   * if true the left position gets caped if left >= element Width.
   */
  checkWidthOverflow?: boolean
}