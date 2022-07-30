export default () => ({
  jwt_secret: process.env.JWT_SECRET,
  database_type: process.env.DATABASE_TYPE || 'postgres',
  db_connection_string: process.env.DATABASE_CONNECTION_URL,
});
