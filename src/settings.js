const messages = {
  success: { message: `OK` },
  fillInData: { message: `Please fill in input data` },
  notFound: { message: `error 404, resource not found`},
  idNotFound: (id) => ({ message: `Record with id ${id} was not found` }),
};

exports.messages = messages; 
