
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
    }
]);