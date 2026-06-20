const pool = require('../config/db');
const { publicUserFields, tableUserFields } = require('../constants/userFields');

const createUserSql = `
  INSERT INTO users (name, email, password_hash, last_login_at, last_activity_at)
  VALUES ($1, $2, $3, NOW(), NOW())
  RETURNING ${publicUserFields}
`;

const normalizeEmail = (email) => email.trim().toLowerCase();
const queryMany = async (sql, params = []) => (await pool.query(sql, params)).rows;
const queryOne = async (sql, params = []) => (await queryMany(sql, params))[0];

const findByEmail = (email) => queryOne(
  'SELECT * FROM users WHERE LOWER(email) = $1',
  [normalizeEmail(email)]
);

const findById = (id) => queryOne(
  `SELECT ${publicUserFields} FROM users WHERE id = $1`,
  [id]
);

const findAllPublic = () => queryMany(
  `SELECT ${tableUserFields} FROM users ORDER BY id ASC`
);

const create = ({ name, email, passwordHash }) => queryOne(
  createUserSql,
  [name, normalizeEmail(email), passwordHash]
);

const updateLastLogin = (id) => queryOne(
  `
    UPDATE users
    SET last_login_at = NOW(), last_activity_at = NOW()
    WHERE id = $1
    RETURNING ${publicUserFields}
  `,
  [id]
);

const updateLastActivity = (id) => pool.query(
  'UPDATE users SET last_activity_at = NOW() WHERE id = $1',
  [id]
);

const updateBlockStatus = (ids, isBlocked) => queryMany(
  `
    UPDATE users
    SET is_blocked = $1
    WHERE id = ANY($2::int[]) AND is_blocked = $3
    RETURNING id
  `,
  [isBlocked, ids, !isBlocked]
);

const blockMany = (ids) => updateBlockStatus(ids, true);
const unblockMany = (ids) => updateBlockStatus(ids, false);

const deleteMany = (ids) => queryMany(
  'DELETE FROM users WHERE id = ANY($1::int[]) RETURNING id',
  [ids]
);

const deleteUnverified = () => queryMany(
  "DELETE FROM users WHERE status = 'unverified' RETURNING id"
);

const confirmEmail = (id) => queryOne(
  `
    UPDATE users
    SET status = 'active', last_activity_at = NOW()
    WHERE id = $1
    RETURNING ${publicUserFields}
  `,
  [id]
);

module.exports = {
  findByEmail,
  findById,
  findAllPublic,
  create,
  updateLastLogin,
  updateLastActivity,
  blockMany,
  unblockMany,
  deleteMany,
  deleteUnverified,
  confirmEmail,
};
