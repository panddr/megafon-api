// import r from 'rethinkdb';
// import rethinkdbdash from 'rethinkdbdash';
// let r = rethinkdbdash();

const r = require('rethinkdbdash')(config.get('rethinkdb'));

import config from 'config';
import xss from 'xss';
import slug from 'limax';

function connect() {
  return r.connect(config.get('rethinkdb'));
}

export function liveUpdates(io) {
  console.log('Setting up listener...');
  r
    .table('state')
    .changes().run((err, cursor) => {
      console.log('Listening for changes...');
      cursor.each((err, change) => {
        console.log('Change detected', change);
        io.emit('event-change', change);
      });
    });

  // connect()
  // .then(conn => {
  //   r
  //   .table('quizes')
  //   .changes().run(conn, (err, cursor) => {
  //     console.log('Listening for changes...');
  //     cursor.each((err, change) => {
  //       console.log('Change detected', change);
  //       io.emit('event-change', change);
  //     });
  //   });
  // });
}

export function getEvents() {
  return r
    .table('quizes')
    .orderBy(r.desc('created')).run();

  // return connect()
  // .then(conn => {
  //   return r
  //   .table('quizes')
  //   .orderBy(r.desc('created')).run(conn)
  //   .then(cursor => cursor.toArray());
  // });
}

// export function uploadImage(images) {
//   return connect()
//   .then(conn => {
//     return r
//     .table('quizes')
//     .get(id).update(event).run(conn)
//     .then(() => event);
//   });
// }


export function loadState() {
  return r
    .table('state')
    .getAll(0, {index: 'slug'}).run()
}


export function initState() {
  const quizState = {
    isAnswering: false,
    isHelping: false,
    questions: [],
    slug: 0
  }

  return r.table("state").delete().run()
  .then(() => {
    return r
      .table('state')
      .insert(quizState).run()
  })
  .then(() => {
    return r
      .table('state')
      .getAll(0, {index: 'slug'}).run()
  })
}

export function startAnswering(quizState) {
  return r
    .table('state')
    .getAll(0, {index: 'slug'}).update(quizState).run()
    .then(() => quizState);
}

export function startHelping(quizState) {
  return r
    .table('state')
    .getAll(0, {index: 'slug'}).update(quizState).run()
    .then(() => quizState);
}


export function addEvent(event) {
  event.created = new Date();
  event.description = xss(event.description);
  event.slug = slug(event.title);

  return r
    .table('quizes')
    .insert(event).run()
    .then(response => {
      return Object.assign({}, event, {id: response.generated_keys[0]});
    });

  // return connect()
  // .then(conn => {
  //   event.created = new Date();
  //   event.description = xss(event.description);
  //   event.slug = slug(event.title);
  //   return r
  //   .table('quizes')
  //   .insert(event).run(conn)
  //   .then(response => {
  //     return Object.assign({}, event, {id: response.generated_keys[0]});
  //   });
  // });
}

export function editEvent(id, event) {
  event.updated = new Date();
  event.description = xss(event.description);
  event.slug = slug(event.title);
  return r
    .table('quizes')
    .get(id).update(event).run()
    .then(() => event);

  // return connect()
  // .then(conn => {
  //   return r
  //   .table('quizes')
  //   .get(id).update(event).run(conn)
  //   .then(() => event);
  // });
}

export function deleteEvent(id) {
  return r
    .table('quizes')
    .get(id).delete().run()
    .then(() => ({id: id, deleted: true}));

  // return connect()
  // .then(conn => {
  //   return r
  //   .table('quizes')
  //   .get(id).delete().run(conn)
  //   .then(() => ({id: id, deleted: true}));
  // });
}

export function getEvent(slug) {
  return r
    .table('quizes')
    .getAll(slug, {index: 'slug'}).run()

  // return connect()
  // .then(conn => {
  //   return r
  //   .table('quizes')
  //   .getAll(slug, {index: 'slug'}).run(conn)
  //   .then(cursor => cursor.toArray());
  // });
}
