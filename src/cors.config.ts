// cors.config.ts

export const prodOrigins = ['https://anketa.letotermy.ru'];

const devOrigins = [
  'http://localhost:5137',
  'http://localhost:3000',
  'https://termy-leto.vercel.app',
  'http://termy.honc.ru',
  'https://termy.honc.ru',
];

const allowedOrigins =
  process.env.NODE_ENV === 'production' ? prodOrigins : devOrigins;

export const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept',
    };
  } else {
    corsOptions = { origin: false }; // запретить другие источники
  }
  callback(null, corsOptions);
};
