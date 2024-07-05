export default class {
  static toString(period) {
    const formattedMonth = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ][period.month - 1]
    const formattedPeriod = `${formattedMonth} - ${period.year}`

    return formattedPeriod
  }

  static toISODate(period) {
    const date = new Date(Date.UTC(period.year, period.month - 1, 1, 0, 0, 0, 0))
    const isoDate = date.toISOString()

    return isoDate
  }

  static getCurrent() {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()
    const currentPeriod = {
      month: currentMonth,
      year: currentYear
    }

    return currentPeriod
  }

  static getNext(period) {
    const possibleNextMonth = period.month + 1
    const nextMonth = possibleNextMonth <= 12 ? possibleNextMonth : possibleNextMonth % 12
    const nextYear = possibleNextMonth <= 12 ? period.year : period.year + 1

    const nextPeriod = {
      month: nextMonth,
      year: nextYear
    }

    return nextPeriod
  }

  static getPrevious(period) {
    const possiblePreviousMonth = period.month - 1
    const previousMonth = possiblePreviousMonth >= 1 ? possiblePreviousMonth : 12 + possiblePreviousMonth
    const previousYear = possiblePreviousMonth >= 1 ? period.year : period.year - 1

    const previousPeriod = {
      month: previousMonth,
      year: previousYear
    }

    return previousPeriod
  }
}
