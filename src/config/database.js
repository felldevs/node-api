module.exports = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'sqlnode',
    define: {
        timestamps: true,
        underscored: true,
    }
};

// created_at, updated_at