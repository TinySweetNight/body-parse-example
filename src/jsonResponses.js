// Note this object is purely in memory
// When node shuts down this will be cleared.
// Same when your heroku app shuts down from inactivity
// We will be working with databases in the next few weeks.
const users = {};

const respondJSON = (request, response, status, object) => {
  const content = JSON.stringify(object);

  response.writeHead(status, { 
    'Content-Type': 'application/json', 
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });

  if(request.method !== 'HEAD') {
    response.write(JSON.stringify(object));
  }

  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};

const addUser = (request, response) => {

  const responseJSON = {
    message: "Name and age are both required"
  }
  
  const {name, age} = request.body; 

  if(!name || !age) {
    responseJSON.id = "Missing Params";
    return respondJSON(request, response, 400, responseJSON);
  }

  let statusCode = 204;
   console.log(name, age);


   if(!users[name]){
    statusCode = 201;
    uses[name] = {
      users:name
    }
   }

   users[name].age = age;

   //created a user
   if(statusCode === 201) {
    respondJSON.message = "User Successfully Created!";
    return respondJSON(request, response, statusCode, responseJSON);
   }


   //return 204
   return respondJSON(request, response, statusCode, {});

};

module.exports = {
  getUsers,
  addUser,
};
