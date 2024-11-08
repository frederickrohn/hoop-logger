import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connect;

//citation for this code: https://medium.com/@nithishreddy0627/connecting-your-next-js-project-to-mongodb-atlas-using-mongoose-a-step-by-step-guide-2d2552b5d7ca#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjFkYzBmMTcyZThkNmVmMzgyZDZkM2EyMzFmNmMxOTdkZDY4Y2U1ZWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDI4MDUxNDYzODYxNjUxMzA1MDQiLCJoZCI6Im55dS5lZHUiLCJlbWFpbCI6ImZucjIwMDlAbnl1LmVkdSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MzEwMTMzNDksIm5hbWUiOiJGcmVkIFJvaG4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSURHNkhHT3I3V2MzcUd4UVVWdkNBSVp5bjV4ZlJaZlNTa3hNWmFSdnctSngxLVh5TT1zOTYtYyIsImdpdmVuX25hbWUiOiJGcmVkIiwiZmFtaWx5X25hbWUiOiJSb2huIiwiaWF0IjoxNzMxMDEzNjQ5LCJleHAiOjE3MzEwMTcyNDksImp0aSI6ImY4NWM4YTRmZmI0MjQzYTFkNDA0YzMxZmNhZWY1Zjk5NTUzMWY2ODQifQ.BGRO02c-m4XHiONOSco41gJ0OSZzkcUyrcATJ4W0FnBdedCWAt2kI6kG6lDtK7RU8UX6eg5dYQn0PcvYjUoXr1c9yWc-nHgXgO9nf6ggzCysXMEWqZNCignLxNoJAh6TeCEUQnexq4rW15i5gnlvKs2YWhpYussyG0TfarFM2kAx3YXcHy2lwPY8x-pQKPtCjo-vIyKBQlousmKL7eycJpN9VWTOegddkS3Y_e50u6YcHcAFHNUVifZf4eY_Lv-2NEuWRYYwuMrvuFnCr-X_KYwBoTwULLWF45RrM7LPEyPQzSTFDsK2cj5QdtoFRkKaLY0ZNjmTExPxV3HnNw9VGg

//it has the file that is exactly this, helps you connect to the MongoDB database, the only thing I changed was the URI
