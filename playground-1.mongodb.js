
//// DATE VALIDATION FAILED

db.createCollection("users", {
    validator: {
      $and: [{
          birthday: {
              $lte: new Date()
          }
      },
  
    {$jsonSchema: 
    {
          bsonType: "object",
          required: ['firstName', 'lastName', 'email', 'birthday'],
          properties: {
              firstName: {
                  bsonType: "string"
              },
              lastName: {
                  bsonType: "string"
              },
              email: {
                  bsonType: "string"
              },
              birthday: {
                  bsonType: "date"
              },
              address: {
                  bsonType: "object",
                  required: ['city', 'street'],
                  properties: {
                      city: {
                          bsonType: "string"
                      },
                      street: {
                          bsonType: "string"
                      }
                  }
              }
          }
    }
    }
      ]
    }
  })
  
  
  db.createCollection("users", {
    validator: {
     $jsonSchema: 
    {
          bsonType: "object",
          required: ['firstName', 'lastName', 'email', 'birthday'],
          properties: {
              firstName: {
                  bsonType: "string"
              },
              lastName: {
                  bsonType: "string"
              },
              email: {
                  bsonType: "string"
              },
              birthday: {
                  bsonType: "date"
              },
              address: {
                  bsonType: "object",
                  required: ['city', 'street'],
                  properties: {
                      city: {
                          bsonType: "string"
                      },
                      street: {
                          bsonType: "string"
                      }
                  }
              }
          }
    }
    }
  })
  
  
  /*
  Створити колекцію автомобілів, описавши всі поля в схемі валідації:
  
  +1. Brand - string
  +2. Model - string
  +3. Engine: {
      +volume - double
      +fuelType - string
  }
  4. Capacity - int
  5. Weight - double
  6. Length - double
  7. Vip - boolean
  
  
  */