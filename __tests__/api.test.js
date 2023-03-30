const request = require('supertest');
const express = require('express');
const server = 'http://localhost:5001';

describe('/api API Calls', () => {

  describe('/getsongs', () => {

    test('responds with 200 status and json content type', async () => {
      const response = await request(server).get('/api/getsongs/1');
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.statusCode).toBe(200);
    });

    test('responds with an array', async () => {
      const response = await request(server).get('/api/getsongs/1');
      expect(Array.isArray(response.body)).toBeTruthy();
    });

    test('responds to invalid request with 400 status and error message in body', async () => {
      const response = await request(server).get('/api/getsongs/b');
      expect(response.statusCode).toBe(400);
    })

    test('responds with an array of objects with the expected format', async () => {
      const response = await request(server).get('/api/getsongs/2');
      console.log(response.body)
      expect(response.body[0]).toHaveProperty('track_id');
      expect(response.body[0]).toHaveProperty('track_name');
      expect(response.body[0]).toHaveProperty('artist_name');
      expect(typeof response.body[0].track_id).toBe('number');
      expect(typeof response.body[0].track_name).toBe('string');
      expect(typeof response.body[0].artist_name).toBe('string');
    });
  });

  describe('/getlyrics', () => {
    test('responds with 200 status and json content type', async () => {
      const response = await request(server).get('/api/getlyrics/86009286');
      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.statusCode).toBe(200);
    });

    test('responds with a string', async () => {
      const response = await request(server).get('/api/getlyrics/86009286');
      expect(typeof response.body).toBe('string');
    });

    test('responds to invalid request with 400 status and error message in body', async () => {
      const response = await request(server).get('/api/getlyrics/song');
      expect(response.statusCode).toBe(400);
    });

  });



});  