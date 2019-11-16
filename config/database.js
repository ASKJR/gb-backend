module.exports = {
  username: 'root',
  password: 'root',
  database: 'gb',
  host: 'mysql',
  dialect: 'mysql',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}