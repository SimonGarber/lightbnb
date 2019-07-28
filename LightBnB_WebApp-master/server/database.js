
// const properties = require('./json/properties.json');
// const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool ( {
  user: 'vagrant',
  host: 'localhost',
  database: 'lightbnb',
  password: 'password'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
   const getUserWithEmail = function(email) {
     return pool.query(`
     SELECT id,name,email,password FROM users
     WHERE email = $1;
     `, [email])
     .then(res => {
       if (res.rows) {
         return res.rows[0];
   }
   return null;
  });
}
   exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
   const getUserWithId = function(id) {
     return pool.query(`
     SELECT id, name, email, password FROM users
     WHERE id = $1;
     `, [id])
     .then(res => {
       if (res.rows) {
         return res.rows[0];
   }
   return null;
  });
}
   exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const userValues = [...Object.values(user)]
  const addUserQuery =
  `
  INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;
  `;
  return pool.query(addUserQuery, userValues)
  .then(res => {
  if(res.rows) {
    return res.rows
  } else {
    return null
  }
})
.catch(err => {
  console.log(err)
});
}

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
 const getAllReservations = function(guest_id, limit = 10) {
   return pool.query(`
   select reservations.*,properties.*, avg(property_reviews.rating) as average_rating 
from reservations

join properties on reservations.property_id = properties.id
join property_reviews on properties.id = property_reviews.property_id
where end_date < now() and reservations.guest_id = $1
group by reservations.id,properties.id
order by reservations.start_date DESC
LIMIT $2;
`, [guest_id, limit])
.then(res => res.rows);
}
 exports.getAllReservations = getAllReservations;

/// Properties
const queryOption = function (query,option, optionalQueryString) {
  if (option && option !== '%undefined%') {
    query.params.push(`${option}`);
    query.queryString += optionalQueryString;
  }
  if (query.params.length >= 1) {
    query.whereAnd = 'AND';
  }
  return query;
}
/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  let query = {};
  query.params = [];
  query.whereAnd = 'WHERE';
  query.minimumHaving = '';
  query.queryString = `
  select  properties.*, avg(property_reviews.rating) as average_rating 
  from properties
  join property_reviews on property_id = properties.id
  `;


if (options.city) {
  query.params.push(`%${options.city}%`);
  query.queryString += `WHERE city LIKE $${query.params.length}`;
}

query.params.push(limit);
query.queryString += `
GROUP by properties.id
ORDER by cost_per_night
LIMIT $${query.params.length};
`;
console.log(query.queryString, query.params);

  return pool.query(query.queryString, query.params)
  .then(res => res.rows);
  
}
  

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
 const addProperty = function(property) {
   const queryParams = [];
   const queryKeys = [];
   console.log(this);
   for (attribute in property) {
     queryKeys.push(attribute);
     queryParams.push(property[attribute]);
   }
   return pool.query(`
   INSERT INTO properties (${queryKeys[0]}, ${queryKeys[1]}, ${queryKeys[2]}, ${queryKeys[3]}, ${queryKeys[4]}, ${queryKeys[5]}, ${queryKeys[6]}, ${queryKeys[7]}, ${queryKeys[8]}, ${queryKeys[9]}, ${queryKeys[10]}, ${queryKeys[11]}, ${queryKeys[12]}, ${queryKeys[13]})
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
   RETURNING *;
 `, queryParams)
 .then(res => res.rows[0]);

  }


 exports.addProperty = addProperty;
