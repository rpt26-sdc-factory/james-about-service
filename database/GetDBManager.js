function GetDBManager(db) {
  if (!db) {
    try {
      db = process.env.USE_DBS.split(',')[0];
    } catch (e) {
      throw ('No DB for DBManager selected or found in environment variable!');
    }
  }

  try{
    return new (require(`./classes/DBManagers/${db}.js`))();
  } catch (e) {
    console.log(db);
    throw(e);
  }
};

module.exports = GetDBManager;