class DBManager {
  constructor(db) {
    this.database = db;

    switch(this.database) {
      case 'mongo':
      default:
        //Mongo interaction Code goes here
        break;
      case 'postgres':
        //Postgres interaction code goes here
        break;
      case 'cassandra':
        //Cassandra interaction code goes here
        break;
    }

  }

  insertCourse() {
    switch(this.database) {
      case 'mongo':
      default:
        //Mongo interaction Code goes here
        break;
      case 'postgres':
        //Postgres interaction code goes here
        break;
      case 'cassandra':
        //Cassandra interaction code goes here
        break;
    }
  };
  getCourse() {
    switch(this.database) {
      case 'mongo':
      default:
        //Mongo interaction Code goes here
        break;
      case 'postgres':
        //Postgres interaction code goes here
        break;
      case 'cassandra':
        //Cassandra interaction code goes here
        break;
    }
  };
  updateCourse() {
    switch(this.database) {
      case 'mongo':
      default:
        //Mongo interaction Code goes here
        break;
      case 'postgres':
        //Postgres interaction code goes here
        break;
      case 'cassandra':
        //Cassandra interaction code goes here
        break;
    }
  };
  deleteCourse() {
    switch(this.database) {
      case 'mongo':
      default:
        //Mongo interaction Code goes here
        break;
      case 'postgres':
        //Postgres interaction code goes here
        break;
      case 'cassandra':
        //Cassandra interaction code goes here
        break;
    }
  };
}