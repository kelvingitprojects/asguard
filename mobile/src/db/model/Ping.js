import { Model } from '@nozbe/watermelondb'
import { field, date } from '@nozbe/watermelondb/decorators'

export default class Ping extends Model {
  static table = 'pings'

  @field('latitude') latitude
  @field('longitude') longitude
  @date('timestamp') timestamp
  @field('synced') synced
}
