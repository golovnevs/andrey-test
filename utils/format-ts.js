import { DateTime } from 'luxon'

export default ts => DateTime.fromMillis(ts).toFormat('dd.MM.yyyy HH:mm:ss')
