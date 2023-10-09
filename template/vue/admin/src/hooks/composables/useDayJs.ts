import dayjs from 'dayjs'

type IDateType = string | number | Date | dayjs.Dayjs | null | undefined
export function useDayJs() {
  /**
   * 返回两个给定日期之间的随机日期。
   * @param {IDateType} from - 起始日期。
   * @param {IDateType} to - 结束日期。
   * @returns {dayjs.Dayjs} - 表示随机日期的Day.js对象。
   */
  const between = (from: IDateType, to: IDateType) => {
    const fromMilli = dayjs(from).valueOf()
    const max = dayjs(to).valueOf() - fromMilli
    const dateOffset = Math.floor(Math.random() * max + 1)
    const newDate = dayjs(fromMilli + dateOffset)
    return dayjs(newDate)
  }
  /**
   * 返回距离给定 `refDate` 日期 `days` 天的随机日期。
   * @param {IDateType} [days=1] - 要添加到参考日期的天数。
   * @param {IDateType} [refDate=now] - 参考日期。
   * @returns {dayjs.Dayjs} - 表示随机日期的Day.js对象。
   */
  const soon = (days = 1, refDate = dayjs()) => {
    const ref = dayjs(refDate)
    const to = ref.add(days, 'day')
    return between(ref, to)
  }
  /**
   * 返回距离给定 `refDate` 日期 `days` 天之前的随机日期。
   * @param {IDateType} [days=1] - 要从参考日期减去的天数。
   * @param {IDateType} [refDate=now] - 参考日期。
   * @returns {dayjs.Dayjs} - 表示随机日期的Day.js对象。
   */
  const recent = (days = 1, refDate = dayjs()) => {
    const ref = dayjs(refDate)
    const from = ref.subtract(days, 'day')
    return between(from, ref)
  }
  /**
   * 返回给定 `refDate` 日期之后 `years` 年的随机日期。
   * @param {IDateType} [years=1] - 要添加到参考日期的年数。
   * @param {IDateType} [refDate=now] - 参考日期。
   * @returns {dayjs.Dayjs} - 表示随机日期的Day.js对象。
   */
  const future = (years = 1, refDate = dayjs()) => {
    const ref = dayjs(refDate)
    const to = ref.add(years, 'year')
    return between(ref, to)
  }
  /**
   * 返回给定 `refDate` 日期之前 `years` 年的随机日期。
   * @param {IDateType} [years=1] - 要从参考日期减去的年数。
   * @param {IDateType} [refDate=now] - 参考日期。
   * @returns {Object} - 表示随机日期的Day.js对象。
   */
  const past = (years = 1, refDate = dayjs()) => {
    const ref = dayjs(refDate)
    const from = ref.subtract(years, 'year')
    return between(from, ref)
  }

  return {
    between,
    soon,
    recent,
    future,
    past,
  }
}
