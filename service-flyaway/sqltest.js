const { Connection, Request } = require("tedious");

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "User", // update me
      password: "Password1", // update me
    },
    type: "default",
  },
  server: "test-node-dev.database.windows.net", // update me
  options: {
    database: "dev-flyaway-db", //update me
    encrypt: true,
  },
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    queryDatabase();
  }
});

connection.connect();

function queryDatabase() {
  console.log("Reading rows from the Table...");

  // Read all rows from table
  const request = new Request(
    `SELECT * FROM [dbo].[AIRPORTS]`,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    }
  );

  request.on("row", (columns) => {
    console.log("(");
    columns.forEach((column) => {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
    console.log(")");
  });

  connection.execSql(request);
}
