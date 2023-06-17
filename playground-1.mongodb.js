
db.createCollection('products', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'price', 'manufacturerId'],
            properties: {
                name: {
                    bsonType: 'string',
                },
                price: {
                    bsonType: 'double'
                },
                manufacturerId: {
                    bsonType: 'objectId'
                },
                amount: {
                    bsonType: 'int'
                },
                expiredDate: {
                    bsonType: 'date'
                }
            }
        }
    }
});

db.createCollection('manufacturers', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name'],
            properties: {
                name: {
                    bsonType: 'string'
                },
                address: {
                    bsonType: 'object',
                    required: ['country', 'city'],
                   properties: {
                     country: {
                        bsonType: 'string'
                    },
                    city: {
                        bsonType: 'string'
                    }
                   }
                }
            }
        }
    }
})

db.manufacturers.insertOne({
    name: "Molokombinat",
    address: {
        country: 'Ukraine',
        city: 'Ternopil'
    }
});

db.products.insertOne({
    name: 'Bread',
    price: 20.5,
    manufacturerId: new ObjectId('648dbffb62e79a130f697ae9')
});

db.products.insertMany([{
    name: 'Bulka',
    price: 10.2,
    manufacturerId: new ObjectId('648dbffb62e79a130f697ae9')
},{
    name: 'Butter',
    price: 50.5,
    manufacturerId: new ObjectId('648dbffb62e79a130f697ae9')
}]);


 
db.manufacturers.insertOne({
    name: 'smtn'
});
/*----- drop manufacturer ----*/


db.products.insertOne({
    name: 'Something',
    price: 100.10,
    manufacturerId: new ObjectId('648dbffb62e79a130f697ae9')
});


db.products.aggregate([
    {
        /**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: Optional pipeline to run on the foreign collection.
         * let: Optional variables to use in the pipeline field stages.
         */
        $lookup: {
          from: 'manufacturers',
          localField: 'manufacturerId',
          foreignField: '_id',
          as: 'manufacturer'
        }
    }, {
        /**
         * path: Path to the array field.
         */
        $unwind: {
          path: '$manufacturer',
        }
    }, {
        /**
         * Provide the field name to exclude.
         * To exclude multiple fields, pass the field names in an array.
         */
        $unset: 'manufacturerId'
    },  {
        /**
         * _id: The id of the group.
         */
        $group: {
          _id: "$manufacturer.name",
          countPosition: {
           $count: {}
           ///$sum: 1 - alternative
          }
        }
    } 
]);

/*Знайти всі продукти, відступи 2 і видай п'ять.Пагінація */
db.products.find({}).skip(2).limit(5);

/*

Практика:
Створити колекцію студентів і колекцію груп +
Студент має ім'я, посилання на групу.
Група містить ім'я, ім'я викладача.

Заінсертити по 3-4 людини в кожну групу (груп хоча би 2).+
1. Вивести студентів з інформацією про групу.+
2. Порахувати кількість студентів в кожній групі. +

*/


db.createCollection('groups', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'professor_surname'],
            properties: {
                name: {
                    bsonType: 'string',
                },
                professor_surname: {
                    bsonType: 'string',
                },
                speciality: {
                    bsonType: 'string'
                }
        }
    }
}
});

db.createCollection('students', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name', 'last_name', 'groupId'],
            properties: {
                name: {
                    bsonType: 'string',
                },
                last_name: {
                    bsonType: 'string',
                },
                groupId: {
                    bsonType: 'objectId'
                }
            }
        }
    }
});

db.groups.drop();
db.groups.insertMany([{
    name: 'Math',
    professor_surname: 'Moriarty',
    speciality: 'Dynamics of machines'
},{
    name: 'Economics',
    professor_surname: 'Mona',
    speciality: 'Economics and Management'
}]);



db.students.insertMany([{
    name: 'Albert',
    last_name: 'Moriarty',
    groupId: new ObjectId('648dd7efec616554afcdf59e')
}, {
    name: 'Louis',
    last_name: 'Moriarty',
    groupId: new ObjectId('648dd7efec616554afcdf59e')
},{
    name: 'Sebastian',
    last_name: 'Moran',
    groupId: new ObjectId('648dd7efec616554afcdf59e')
},{
    name: 'Oz',
    last_name: 'Fishl',
    groupId: new ObjectId('648dd7efec616554afcdf59f')
},{
    name: 'Bennet',
    last_name: 'Lose',
    groupId: new ObjectId('648dd7efec616554afcdf59f')
},
{
    name: 'Keya',
    last_name: 'Alberich',
    groupId: new ObjectId('648dd7efec616554afcdf59f')
}]);

db.students.aggregate([
    {
        $lookup: {
          from: 'groups',
          localField: 'groupId',
          foreignField: '_id',
          as: 'group'
        }
    },  {
        $unwind: {
          path: '$group',
        }
    }, {
        $group: {
          _id: "$group.name",
          countPosition: {
           $count: {}
          }
        }
    } 
]);