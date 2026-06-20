const displayStatus = "CASE WHEN is_blocked = TRUE THEN 'blocked' ELSE status END";

const joinFields = (fields) => fields.join(',\n  ');

const publicUserFields = joinFields([
  'id',
  'name',
  'email',
  'status',
  'is_blocked',
  `${displayStatus} AS display_status`,
]);

const tableUserFields = joinFields([
  'id',
  'name',
  'email',
  'status AS verification_status',
  'is_blocked',
  `${displayStatus} AS status`,
  'last_login_at AS last_login_time',
  'last_activity_at AS last_activity_time',
  'created_at AS registration_time',
]);

module.exports = { publicUserFields, tableUserFields };
