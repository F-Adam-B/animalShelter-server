const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Queue = require ('./queue')
const {PORT, CLIENT_ORIGIN} = require('./config');
// const {dbConnect} = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();
let cats = [{
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy',
    sex: 'Female',
    age: 1,
    breed: 'Bengal',
    story: 'Thrown on the street'
  },
  {
    imageURL:'http://cdn3-www.cattime.com/assets/uploads/gallery/siberian-cats-and-kittens/siberian-cats-kittens-10.jpg',
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Smelly Cat',
    sex: 'Male',
    age: 2,
    breed: 'Bengal',
    story: 'Dropped out of highscool'
  },
  {
    imageURL:'http://rs113.pbsrc.com/albums/n209/jubu97rn/nastycat_sentbyJeanBrauner.jpg?w=280&h=210&fit=crop',
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Hobbes',
    sex: 'Male',
    age: 3,
    breed: 'Who knows?',
    story: 'His life has been nasty brutish and short'
  }]

  let dogs = [{
    imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus',
    sex: 'Male',
    age: 1,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  },
  {
    imageURL: 'https://vetstreet.brightspotcdn.com/dims4/default/ef88942/2147483647/crop/0x0%2B0%2B0/resize/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2Fec%2Fedb760a8af11e0a0d50050568d634f%2Ffile%2Fnova-scotia-duck-tolling-retriever-5-645mk070411.jpg',
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Uki',
    sex: 'Female',
    age: 2,
    breed: 'Duck Toller',
    story: 'Owner Passed away'
  },
  {
    imageURL: 'http://cdn2-www.dogtime.com/assets/uploads/gallery/mutt-dog-breed-pictures/thumbs/thumbs_face-1.jpg',
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Sharko',
    sex: 'Male',
    age: 3,
    breed: 'Mutt',
    story: 'Mother wasn\'t neutered'
  }]
  


  function seedQueue(array, queue){
    //   console.log(queue, 'queue')
      for(let i = 0; i < array.length; i++){
        queue.enqueue(array[i])
      }
  }


  const dogQueue = new Queue();
  const catQueue = new Queue();

  seedQueue(dogs, dogQueue)
  seedQueue(cats, catQueue);

 


app.use(
    morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
        skip: (req, res) => process.env.NODE_ENV === 'test'
    })
);

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

app.get('/api/cat', (req, res) => {
    //show the cat that is next in line to be adopted
    res.json(cats[0])//return a cat);
});


app.delete('/api/cat', (req, res) => {
// replace shift() with deque()
    res.json(cats.shift())
});

app.get('/api/dog', (req, res) => {
    // dogs[0] will be replace with peek()
    res.json(dogs[0])
});

app.delete('/api/dog', (req, res) => {

    res.json(dogs.shift())
});




function runServer(port = PORT) {
    const server = app
        .listen(port, () => {
            console.info(`App listening on port ${server.address().port}`);
        })
        .on('error', err => {
            console.error('Express failed to start');
            console.error(err);
        });
}

if (require.main === module) {
    // dbConnect();
    runServer();
}

module.exports = {app};
