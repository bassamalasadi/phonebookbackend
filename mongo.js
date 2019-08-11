const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://bassam:${password}@phonebook-konjk.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    
  name: String,
  number: String,
  
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  
  name: process.argv[3],
  number: process.argv[4],
})
 
if (process.argv.length < 5) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
            mongoose.connection.close()
        })
    })
} else {
    person.save().then(response => {
        console.log(` ${response.name} add to phonebook ${response.number} .`);
        mongoose.connection.close();
    })
}
